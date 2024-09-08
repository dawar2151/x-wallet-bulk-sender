'use client';

import { ABI_ERC20 } from "@/app/abis/ERC20";
import { useAccount, useBalance, useReadContracts,  type BaseError,
    useWaitForTransactionReceipt, 
    useWriteContract  } from "wagmi";
import { BulkSenderStateContext } from "@/app/providers";
import { useContext, useState } from "react";
import { parseEther } from "viem";
import { BulkSenders } from "@/app/config/bulkSender";
import { ApproveType } from "@/app/types/BulkSenderState";
export function useApproveHelper() {
    const {address, chainId} = useAccount()
    const { data: hash,
        error,
        isPending, 
        writeContract 
     } = useWriteContract();

     const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ 
      hash, 
    }) 
    const { bulkSenderState } = useContext(BulkSenderStateContext);


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
        }]
    })
    const [allowance, balanceOf, symbol] = data || []

    const erc20Approve = async () => {
        if (!bulkSenderState.tokenAddress) {
            console.error('Token address is required')
            return;
        }
        const amount = parseEther(bulkSenderState.totalAmount?.toString() || '0');
        await writeContract( {
                abi: ABI_ERC20,
                address: bulkSenderState.tokenAddress,
                functionName: 'approve',
                args: [
                    BulkSenders[chainId as number],// TODO: fix type
                    bulkSenderState.approveType == ApproveType.Custom ? amount: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
                ]
            });
    }
    return {erc20Approve, isConfirming, isConfirmed, hash, isPending, allowance, balanceOf, symbol, result}
}