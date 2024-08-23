'use client';
import { Radio } from "@material-tailwind/react";
import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { useContext } from "react";
import { BulkSenderStateContext } from "../providers";
import { useAccount, useBalance, useReadContracts } from "wagmi";
import { ABI_ERC20 } from "../abis/ERC20";
import { formatEther } from "viem";
export function Forward() {
    const account = useAccount();
    const {bulkSenderState} = useContext(BulkSenderStateContext);
    const nativeTokenBalance = useBalance({
        address: account?.address,
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
            args: [account?.address, bulkSenderState.tokenAddress],
        }, {
            functionName: 'balanceOf',
            ...contractConfig,
            args: [account?.address],
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

    return (
        <div>
            <span>Summary</span>
            <div className="grid grid-cols-2 gap-2 justify-items-center">
                <Card className="mt-6 w-96">
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {bulkSenderState?.receivers?.length || '0'} Addresses
                        </Typography>
                        <Typography>
                        Total number of addresses
                        </Typography>
                    </CardBody>
                </Card>
                <Card className="mt-6 w-96">
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {bulkSenderState?.totalAmount || '0'} {bulkSenderState?.tokenSymbol}
                        </Typography>
                        <Typography>
                        Total number of tokens to be sent.
                        </Typography>
                    </CardBody>
                </Card>
                <Card className="mt-6 w-96">
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            1
                        </Typography>
                        <Typography>
                        Total number of transactions needed
                        </Typography>
                    </CardBody>
                </Card>
                <Card className="mt-6 w-96">
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                        {balanceOf?.result?formatEther(BigInt(balanceOf?.result), 'wei'):'0'} {symbol?.result}
                        </Typography>
                        <Typography>
                            Your token balance.
                        </Typography>
                    </CardBody>
                </Card>
                <Card className="mt-6 w-96">
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {balanceOf?.result} {symbol?.result}
                        </Typography>
                        <Typography>
                        Approximate cost of operation 
                        </Typography>
                    </CardBody>
                </Card>
                <Card className="mt-6 w-96">
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                           {nativeTokenBalance.data?.formatted || '0'} {nativeTokenBalance.data?.symbol}
                        </Typography>
                        <Typography>
                        Your SEPETH balance
                        </Typography>
                    </CardBody>
                </Card>
            </div>
            <div className="text-right my-10">
            <a
                href="#"
                className="rounded-md bg-indigo-600 px-10 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Processes Transfer
            </a>
            </div>
        </div>
    )
}