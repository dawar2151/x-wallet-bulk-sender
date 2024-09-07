'use client';
import { Radio } from "@material-tailwind/react";
import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { simulateContract } from '@wagmi/core'

import { useContext, useEffect } from "react";
import { BulkSenderStateContext } from "../providers";
import { useAccount, useBalance, useReadContracts, useWriteContract, usePrepareTransactionRequest} from "wagmi";
import { ABI_ERC20 } from "../abis/ERC20";
import { encodeFunctionData, formatEther, Hex, parseEther, parseGwei } from "viem";
import { BULK_SENDER_ABI } from "../abis/BULKSENDER";
import { BulkSenders } from "../config/bulkSender";
import DiscreteSliderLabel from "./GasFee";
import { config } from "@/lib/config";
import { useEstimateGas } from 'wagmi'
export function Forward() {
    const {address, chainId} = useAccount();
    const { writeContract,  isSuccess,data:dataWrite, error: dataWriteError } = useWriteContract();
    const {bulkSenderState} = useContext(BulkSenderStateContext);
    const nativeTokenBalance = useBalance({
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
    console.log(dataWriteError?.message);
    const transfer = async () => {
        if (!bulkSenderState.tokenAddress) {
            console.error('Token address is required')
            return;
        }
        console.log(bulkSenderState.receivers?.map(a=> a.address))
        const amount = parseEther(bulkSenderState.totalAmount?.toString() || '0');
        await writeContract({
                abi: BULK_SENDER_ABI,
                address: BulkSenders[chainId as number],
                functionName: 'bulkTransferERC20',
                args: [
                    bulkSenderState.tokenAddress,
                    bulkSenderState.receivers?.map(a=> a.address),
                    bulkSenderState.receivers?.map(a=> parseEther(a.amount)),
                ],
                value: parseEther('0.01')
                //gasPrice: parseGwei(bulkSenderState.currentGasPrice?.toString() || '0'),
            });
    }
    const dataHex = encodeFunctionData({
        abi: BULK_SENDER_ABI,
        functionName: 'bulkTransferERC20',
        args: [
            bulkSenderState.tokenAddress,
            bulkSenderState.receivers?.map(a=> a.address),
            bulkSenderState.receivers?.map(a=> parseEther(a.amount)),
        ]
      })
    const result = useEstimateGas({
        data: dataHex?.toString() as Hex, 
        to: BulkSenders[chainId as number] ,
        value: parseEther('0.01'),
      })
      useEffect(() => {
        console.log(result);
     }, [bulkSenderState.currentGasPrice]);

  
    return (
        <div>
            <div className="m-8">
                <DiscreteSliderLabel />
            </div>
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
                            {(Number(result.data) * bulkSenderState?.currentGasPrice)/1000000000} ETH
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
            <button
                onClick={()=>transfer()}
                className="rounded-md bg-indigo-600 px-10 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Processes Transfer
            </button>
            </div>
        </div>
    )
}