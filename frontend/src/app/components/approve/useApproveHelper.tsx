'use client';

import { ABI_ERC20 } from "@/app/abis/ERC20";
import {
    useAccount, useBalance, useReadContracts, type BaseError,
    useWaitForTransactionReceipt,
    useWriteContract
} from "wagmi";
import { BulkSenderStateContext } from "@/app/providers";
import { useContext, useEffect, useState } from "react";
import { Address, parseEther } from "viem";
import { BulkSenders } from "@/app/config/bulkSender";
import { ApproveType, ContractType } from "@/app/types/BulkSenderState";
import CheckContractType from "@/app/utils/getTokenType";
import { ABI_ERC721 } from "@/app/abis/ERC721";
import { ABI_ERC1155 } from "@/app/abis/ERC1155";
import { useEthersProvider } from "@/app/utils/useEthersProvider";
import { ethers } from "ethers";
export function useApproveHelper() {
    const { address, chainId } = useAccount()
    const provider = useEthersProvider();

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
    console.log('hashs', hash)
    const result = useBalance({
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
    // useEffect(() => {
    //     async function fetchData() {
    //         if (!bulkSenderState.tokenAddress || !address) {
    //             console.error('Token address is required')
    //             return;
    //         }
    //         const p = new ethers.BrowserProvider(window.ethereum)
    //         const contract = new ethers.Contract(bulkSenderState.tokenAddress, ABI_ERC20, provider);
    //         console.log('contract', provider)
    //         const a = await contract.allowance(ethers.getAddress(address), ethers.getAddress(BulkSenders[chainId as number]));
    //         console.log('fd', a.toString(), bulkSenderState.tokenAddress)
    //     }
    //     fetchData();
    // }, [address, bulkSenderState.tokenAddress, chainId, provider]);
    const contractConfig = {
        abi: getABi(),
        address: bulkSenderState.tokenAddress,
    }
    const {
        data,
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
            functionName: 'allowance',
            ...contractConfig,
            args: [address, BulkSenders[chainId as number]],
        }]
    })
    console.log('data', address, bulkSenderState.tokenAddress, data)
    const [balanceOf, symbol, decimals, allowance] = data || []
    console.log('hsh', allowance)
    const isAllowed = (allowance && (allowance?.result as number) >= parseEther(bulkSenderState.totalAmount?.toString() || '0')) || allowance?.result == true;
    console.log('isAllowed', isAllowed)
    const erc20Approve = async () => {
        if (!bulkSenderState.tokenAddress) {
            console.error('Token address is required')
            return;
        }
        const amount = parseEther(bulkSenderState.totalAmount?.toString() || '0');
        const res = await writeContractAsync({
            abi: ABI_ERC20,
            address: bulkSenderState.tokenAddress,
            functionName: 'approve',
            args: [
                BulkSenders[chainId as number],// TODO: fix type
                bulkSenderState.approveType == ApproveType.Custom ? amount : '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
            ]
        });
        console.log('hash', res)
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
                BulkSenders[chainId as number],// TODO: fix type
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
                BulkSenders[chainId as number],// TODO: fix type
                true,
            ]
        });
    }
    const approve = async () => {
        console.log('approve', bulkSenderState.tokenAddress)
        console.log('approveType', bulkSenderState.approveType)
        console.log('totalAmount', isPending, isConfirming, isConfirmed, bulkSenderState.totalAmount)
        if(isPending || isConfirming){
            return;
        }
        if (!bulkSenderState.tokenAddress) {
            console.error('Token address is required')
            return;
        }
        console.log('approveType', contractType)
        if (contractType == ContractType.ERC20) {
            await erc20Approve();
        } else if (contractType == ContractType.ERC721) {
            await erc721Approve();
        } else if (contractType == ContractType.ERC1155) {
            await erc1155Approve();
        }
    }
    return { approve, approveError,isSuccess, isAllowed, isConfirming, isConfirmed, hash, isPending, decimals, allowance, balanceOf, symbol, result }
}