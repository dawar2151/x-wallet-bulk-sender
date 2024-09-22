'use client';
import { ABI_ERC20 } from "@/app/abis/ERC20";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { BulkSenderStateContext } from "@/app/providers";
import { useContext, useState } from "react";
import { formatEther, formatUnits, parseEther } from "viem";
import { NetworksConfig } from "@/app/config/bulkSender";
import { ApproveType, ContractType, STEPS } from "@/app/types/BulkSenderState";
import { BULK_SENDER_ABI } from "@/app/abis/BULKSENDER";
import CheckContractType from "@/app/utils/getTokenType";
import { useApproveHelper } from "../approve/useApproveHelper";
import { useVipHelper } from "../vip/useVipHelper";
export function useTransferHelper() {
    const { address, chainId } = useAccount()
    const { isVIP, vipFee } = useVipHelper();
    const tokenType = CheckContractType();
    const { data: hash,
        error: transferError,
        isPending: isTransferPending,
        isSuccess: isTransferSuccess,
        writeContractAsync
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
        console.log('receivers', bulkSenderState.receivers);
        await writeContractAsync({
            abi: BULK_SENDER_ABI,
            address: NetworksConfig[chainId as number]?.bulkSenderAddress,
            functionName: getTransferTokenFunctionName(),
            args: getTransferTokenArgs(),
            value: !isVIP ? vipFee as bigint : BigInt('0')
            //gasPrice: parseGwei(bulkSenderState.currentGasPrice?.toString() || '0'),
        });
    }
    const getTransferTokenArgs = () => {
        console.log(tokenType)
        switch (tokenType) {
            case ContractType.ERC20:
                return [
                    bulkSenderState.tokenAddress,
                    bulkSenderState.receivers?.map(a => a.address),
                    bulkSenderState.receivers?.map(a => parseEther(a.amount)),
                ]
            case ContractType.Native:
                return [
                    bulkSenderState.tokenAddress,
                    bulkSenderState.receivers?.map(a => a.address),
                    bulkSenderState.receivers?.map(a => parseEther(a.amount)),
                ]
            case ContractType.ERC721:
                return [
                    bulkSenderState.tokenAddress,
                    bulkSenderState.receivers?.map(a => a.address),
                    bulkSenderState.receivers?.map(a => BigInt(a.amount as string)),
                ]
            case ContractType.ERC1155:
                return [
                    bulkSenderState.tokenAddress,
                    bulkSenderState.receivers?.map(a => a.address),
                    bulkSenderState.receivers?.map(a => BigInt(a.tokenId as string)),
                    bulkSenderState.receivers?.map(a => BigInt(a.amount as string)),
                ]
            default:
                return [];
        }
    }
    const getTransferTokenFunctionName = () => {
        switch (tokenType) {
            case ContractType.ERC20:
                return "bulkTransferERC20";
            case ContractType.ERC721:
                return "bulkTransferERC721";
            case ContractType.ERC1155:
                return "bulkTransferERC1155";
            case ContractType.Native:
                return "bulkTransfer";
            default:
                return '';
                break;
        }
    }
    const erc721Transfer = async () => {
        if (!bulkSenderState.tokenAddress) {
            console.error('Token address is required')
            return;
        }
        console.log('receivers', bulkSenderState.receivers);
        await writeContractAsync({
            abi: BULK_SENDER_ABI,
            address: NetworksConfig[chainId as number]?.bulkSenderAddress,
            functionName: getTransferTokenFunctionName(),
            args: getTransferTokenArgs(),
            value: !isVIP ? vipFee as bigint : BigInt('0')
            //gasPrice: parseGwei(bulkSenderState.currentGasPrice?.toString() || '0'),
        });
    }
    const erc1155Transfer = async () => {
        if (!bulkSenderState.tokenAddress) {
            console.error('Token address is required')
            return;
        }
        await writeContractAsync({
            abi: BULK_SENDER_ABI,
            address: NetworksConfig[chainId as number]?.bulkSenderAddress,
            functionName: getTransferTokenFunctionName(),
            args: getTransferTokenArgs(),
            value: !isVIP ? vipFee as bigint : BigInt('0')
            //gasPrice: parseGwei(bulkSenderState.currentGasPrice?.toString() || '0'),
        });
    }
    const transfer = async () => {

        if (!bulkSenderState.tokenAddress) {
            console.error('Token address is required')
            return;
        }
        if(tokenType == ContractType.Unknown){
            console.error('Token type is unknown')
            return;
        }
        if (contractType == ContractType.ERC20) {
            await erc20Transfer();
        } else if (contractType == ContractType.ERC721) {
            await erc721Transfer();
        } else if (contractType == ContractType.ERC1155) {
            await erc1155Transfer();
        }
    }
    return { transfer, getTransferTokenArgs, getTransferTokenFunctionName, hash, isTransferConfirming, isTransferSuccess, isTransferConfirmed, isTransferPending, transferError }
}