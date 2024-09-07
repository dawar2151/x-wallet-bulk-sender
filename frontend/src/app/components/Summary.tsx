'use client';
import { Radio } from "@material-tailwind/react";
import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { ABI_ERC20 } from "../abis/ERC20";
import { useAccount, useBalance, useReadContracts, useWriteContract } from "wagmi";
import { BulkSenderStateContext } from "../providers";
import { useContext, useState } from "react";
import { formatEther, formatUnits, parseEther } from "viem";
import { config } from "@/lib/config";
import { BulkSenders } from "../config/bulkSender";
import { STEPS } from "../types/BulkSenderState";
export function Summary() {
    const {address, chainId} = useAccount()
    const { writeContract,  isSuccess,data:dataWrite } = useWriteContract();
    const [approveType, setApproveType] = useState<string>('unlimited');

    const { setBulkSenderState, bulkSenderState } = useContext(BulkSenderStateContext);
    const result = useBalance({
        address: address,
        unit: 'ether',
    });


    const contractConfig = {
        abi: ABI_ERC20,
        address: bulkSenderState.tokenAddress,
    }
    const {
        data,
        error,
        isPending
    } = useReadContracts({
        contracts: [{
            functionName: 'allowance',
            ...contractConfig,
            args: [address, bulkSenderState.tokenAddress],
        }, {
            functionName: 'balanceOf',
            ...contractConfig,
            args: [address],
        }, {
            functionName: 'symbol',
            ...contractConfig,
        },
        {
            functionName: 'decimals',
            ...contractConfig,
        }]
    })
    const [allowance, balanceOf, symbol,decimals] = data || []
    console.log('Approved', dataWrite);
    if(isSuccess && !isPending){
        setBulkSenderState({
            ...bulkSenderState,
            currentStep: STEPS.TRANSFER
        })
    }

    const approve = async () => {
        if (!bulkSenderState.tokenAddress) {
            console.error('Token address is required')
            return;
        }
        const amount = parseEther(bulkSenderState.totalAmount?.toString() || '0');
        console.log('Amount', amount);
        await writeContract( {
                abi: ABI_ERC20,
                address: bulkSenderState.tokenAddress,
                functionName: 'approve',
                args: [
                    BulkSenders[chainId as number],// TODO: fix type
                    approveType == "exact" ? amount: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
                ]
            });
    }
    return (
        <div>
            <span>Summary</span>
            <div className="grid grid-cols-2 gap-2 justify-items-center">
                <Card className="mt-6 w-96">
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {`${allowance?.result} ${symbol?.result}`}
                        </Typography>
                        <Typography>
                            Your current bulksender allowance.
                        </Typography>
                    </CardBody>
                </Card>
                <Card className="mt-6 w-96">
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {bulkSenderState.totalAmount} {symbol?.result}
                        </Typography>
                        <Typography>
                            Total number of tokens to be sent.
                        </Typography>
                    </CardBody>
                </Card>
                <Card className="mt-6 w-96">
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {balanceOf?.result?formatEther(BigInt(balanceOf?.result), 'wei'):'0'} {symbol?.result}
                        </Typography>
                        <Typography>
                            your {`${symbol?.result}`} Balance
                        </Typography>
                    </CardBody>
                </Card>
                <Card className="mt-6 w-96">
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {result.data?.formatted.toString()} ETH
                        </Typography>
                        <Typography>
                        Your Native token balance
                        </Typography>
                    </CardBody>
                </Card>
            </div>
            <div className="text-center underline-offset-1 my-5">Amount to approve</div>
            <div className="text-center gap-10" onChange={(e)=>setApproveType(e.target.value)}>
                <Radio name="type" value="exact" label="Exact Amount to be sent" />
                <Radio name="type" value="unlimited" label="Unlimited amount" defaultChecked />
            </div>
            <div className="text-right my-2">
                <button
                    onClick={() => approve()}
                    className="rounded-md bg-indigo-600 px-10 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Approve
                </button>
            </div>
        </div>
    )
}