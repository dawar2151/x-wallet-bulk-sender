'use client';

import { ABI_ERC20 } from "@/app/abis/ERC20";
import {
    useAccount, useBalance, useReadContracts, type BaseError,
    useWaitForTransactionReceipt,
    useWriteContract
} from "wagmi";
import { BulkSenderStateContext } from "@/app/providers";
import { useContext, useEffect, useState } from "react";
import { Address, formatEther, formatUnits, parseEther } from "viem";
import { NetworksConfig } from "@/app/config/bulkSender";
import { ApproveType, ContractType } from "@/app/types/BulkSenderState";
import CheckContractType from "@/app/utils/getTokenType";
import { ABI_ERC721 } from "@/app/abis/ERC721";
import { ABI_ERC1155 } from "@/app/abis/ERC1155";
import { useEthersProvider } from "@/app/utils/useEthersProvider";
import { ethers } from "ethers";
export function useApproveHelper() {
    const { address, chainId } = useAccount()
    const provider = useEthersProvider();
    const tokenType = CheckContractType();

    const {
        error: approveError,
        data: hash,
        isSuccess,
        isPending,
        writeContractAsync
    } = useWriteContract();
    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        })
    const { bulkSenderState } = useContext(BulkSenderStateContext);
    const contractType = CheckContractType();
    const nativeTokenBalance = useBalance({
        address: address,
        unit: 'ether',
    });

    const getABi = () => {
        if (contractType == ContractType.ERC20) {
            return ABI_ERC20;
        } else if (contractType == ContractType.ERC721) {
            return ABI_ERC721;
        } else if (contractType == ContractType.ERC1155) {
            return ABI_ERC1155;
        }
    }
    const getAllowanceMethodName = () => {
        if (contractType == ContractType.ERC20) {
            return 'allowance';
        } else if (contractType == ContractType.ERC721) {
            return 'isApprovedForAll';
        } else if (contractType == ContractType.ERC1155) {
            return 'isApprovedForAll';
        }
    }
    const contractConfig = {
        abi: getABi(),
        address: bulkSenderState.tokenAddress,
    }
    const {
        data,
        isLoading: isReadLoading,
    } = useReadContracts({
        contracts: [{
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
        },
        {
            functionName: getAllowanceMethodName(),
            ...contractConfig,
            args: [address, NetworksConfig[chainId as number]?.bulkSenderAddress],
        }]
    })
    const getTokenBalance = () => {
        if(tokenType === ContractType.ERC20) {
        return balanceOf?.result ? formatUnits(BigInt(balanceOf?.result.toString()), decimals?.result as number) : '0';
        }else if(tokenType === ContractType.ERC721) {
        return balanceOf?.result;
        }else if(tokenType === ContractType.ERC1155){
        return 'ERC1155 tokens balances';
        }else if(tokenType === ContractType.Native) {
        return formatEther(BigInt(balanceOf?.result?.toString() ?? '0'));
        }else
        return '0';
    }
    const [balanceOf, symbol, decimals, allowance] = data || []
    const isAllowed = (allowance && (allowance?.result as number) >= parseEther(bulkSenderState.totalAmount?.toString() || '0')) || allowance?.result == true;
    const erc20Approve = async () => {
        if (!bulkSenderState.tokenAddress) {
            console.error('Token address is required')
            return;
        }
        if(!NetworksConfig[chainId as number]){
            console.error('Network not supported')
            return;
        }
        const amount = parseEther(bulkSenderState.totalAmount?.toString() || '0');
        const res = await writeContractAsync({
            abi: ABI_ERC20,
            address: bulkSenderState.tokenAddress,
            functionName: 'approve',
            args: [
                NetworksConfig[chainId as number]?.bulkSenderAddress,// TODO: fix type
                bulkSenderState.approveType == ApproveType.Custom ? amount : '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
            ]
        });
    }
    const erc721Approve = async () => {
        if (!bulkSenderState.tokenAddress) {
            console.error('Token address is required')
            return;
        }
        await writeContractAsync({
            abi: ABI_ERC721,
            address: bulkSenderState.tokenAddress,
            functionName: 'setApprovalForAll',
            args: [
                NetworksConfig[chainId as number]?.bulkSenderAddress,// TODO: fix type
                true,
            ]
        });
    }
    const erc1155Approve = async () => {
        if (!bulkSenderState.tokenAddress) {
            console.error('Token address is required')
            return;
        }
        await writeContractAsync({
            abi: ABI_ERC1155,
            address: bulkSenderState.tokenAddress,
            functionName: 'setApprovalForAll',
            args: [
                NetworksConfig[chainId as number]?.bulkSenderAddress,// TODO: fix type
                true,
            ]
        });
    }
    const approve = async () => {
        if(isPending || isConfirming){
            return;
        }
        if (!bulkSenderState.tokenAddress) {
            console.error('Token address is required')
            return;
        }
        if (contractType == ContractType.ERC20) {
            await erc20Approve();
        } else if (contractType == ContractType.ERC721) {
            await erc721Approve();
        } else if (contractType == ContractType.ERC1155) {
            await erc1155Approve();
        }
    }
    return { approve,getTokenBalance, approveError,isSuccess, isAllowed, isConfirming, isConfirmed, hash, isPending, decimals, allowance, balanceOf, symbol, nativeTokenBalance, isReadLoading }
}