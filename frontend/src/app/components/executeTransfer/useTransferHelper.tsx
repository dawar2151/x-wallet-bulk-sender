'use client';
import { Radio } from "@material-tailwind/react";
import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { ABI_ERC20 } from "@/app/abis/ERC20";
import { useAccount, useWaitForTransactionReceipt, useWriteContract  } from "wagmi";
import { BulkSenderStateContext } from "@/app/providers";
import { useContext, useState } from "react";
import { formatEther, formatUnits, parseEther } from "viem";
import { config } from "@/lib/config";
import { BulkSenders } from "@/app/config/bulkSender";
import { ApproveType, ContractType, STEPS } from "@/app/types/BulkSenderState";
import { BULK_SENDER_ABI } from "@/app/abis/BULKSENDER";
import CheckContractType from "@/app/utils/getTokenType";
export function useTransferHelper() {
    const {address, chainId} = useAccount()
    const { data: hash,
        error: transferError,
        isPending: isTransferPending, 
        writeContract 
     } = useWriteContract();

     const { isLoading: isTransferConfirming, isSuccess: isTransferConfirmed } = 
    useWaitForTransactionReceipt({ 
      hash, 
    }) 
    const { bulkSenderState } = useContext(BulkSenderStateContext);
    const contractType = CheckContractType();

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
    const erc721Transfer = async () => {
        if (!bulkSenderState.tokenAddress) {
            console.error('Token address is required')
            return;
        }
        await writeContract({
                abi: BULK_SENDER_ABI,
                address: BulkSenders[chainId as number],
                functionName: 'bulkTransferERC721',
                args: [
                    bulkSenderState.tokenAddress,
                    bulkSenderState.receivers?.map(a=> a.address),
                    bulkSenderState.receivers?.map(a=> BigInt(a.tokenId as string)),
                ],
                value: parseEther('0.01')
                //gasPrice: parseGwei(bulkSenderState.currentGasPrice?.toString() || '0'),
            });
    }
    const erc1155Transfer = async () => {
        if (!bulkSenderState.tokenAddress) {
            console.error('Token address is required')
            return;
        }
        await writeContract({
                abi: BULK_SENDER_ABI,
                address: BulkSenders[chainId as number],
                functionName: 'bulkTransferERC1155',
                args: [
                    bulkSenderState.tokenAddress,
                    bulkSenderState.receivers?.map(a=> a.address),
                    bulkSenderState.receivers?.map(a=> BigInt(a.tokenId as string)),
                    bulkSenderState.receivers?.map(a=> BigInt(a.amount as string)),
                ],
                value: parseEther('0.01')
                //gasPrice: parseGwei(bulkSenderState.currentGasPrice?.toString() || '0'),
            });
    }
    const transfer = async () => {
        console.log('transfer', contractType)

        if (!bulkSenderState.tokenAddress) {
            console.error('Token address is required')
            return;
        }
        console.log('transfer', contractType)
        if (contractType == ContractType.ERC20) {
            await erc20Transfer();
        } else if (contractType == ContractType.ERC721) {
            await erc721Transfer();
        } else if (contractType == ContractType.ERC1155) {
            await erc1155Transfer();
        }
    }
    return {transfer, isTransferConfirming, isTransferConfirmed, isTransferPending, transferError}
}