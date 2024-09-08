'use client';
import { Radio } from "@material-tailwind/react";
import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { ABI_ERC20 } from "@/app/abis/ERC20";
import { useAccount, useBalance, useReadContracts,  type BaseError,
    useWaitForTransactionReceipt, 
    useWriteContract  } from "wagmi";
import { BulkSenderStateContext } from "@/app/providers";
import { useContext, useState } from "react";
import { formatEther, formatUnits, parseEther } from "viem";
import { config } from "@/lib/config";
import { BulkSenders } from "@/app/config/bulkSender";
import { ApproveType, STEPS } from "@/app/types/BulkSenderState";
import { BULK_SENDER_ABI } from "@/app/abis/BULKSENDER";
export function useTransferHelper() {
    const {address, chainId} = useAccount()
    const { data: hash,
        error,
        isPending: isTransferPending, 
        writeContract 
     } = useWriteContract();

     const { isLoading: isTransferConfirming, isSuccess: isTransferConfirmed } = 
    useWaitForTransactionReceipt({ 
      hash, 
    }) 
    const { bulkSenderState } = useContext(BulkSenderStateContext);

    const erc20Transfer = async () => {
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
    return {erc20Transfer, isTransferConfirming, isTransferConfirmed, isTransferPending}
}