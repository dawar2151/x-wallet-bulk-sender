'use client';

import { ABI_ERC20 } from "@/app/abis/ERC20";
import {
    useAccount, useBalance, useReadContracts, type BaseError,
    useWaitForTransactionReceipt,
    useWriteContract,
    useReadContract
} from "wagmi";
import { BulkSenderStateContext } from "@/app/providers";
import { useContext, useState } from "react";
import { Address, parseEther } from "viem";
import CheckContractType from "@/app/utils/getTokenType";
import { BULK_SENDER_ABI } from "@/app/abis/BULKSENDER";
import { NetworksConfig } from "@/app/config/bulkSender";
export function useVipHelper() {
    const { address, chainId } = useAccount()
    const { data: hash,
        error: buyVipError,
        isPending: isBuyingVip,
        writeContract
    } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        })
    const { bulkSenderState } = useContext(BulkSenderStateContext);
    const contractType = CheckContractType();

    const result = useBalance({
        address: address,
        unit: 'ether',
    });

    const contractConfig = {
        abi: BULK_SENDER_ABI,
        address: NetworksConfig[chainId as number]?.bulkSenderAddress
    }
    const {data} = useReadContract({
        ...contractConfig,
        functionName: 'VIPFee'
    })
    const buyVip = async () => {
        if (!bulkSenderState.tokenAddress) {
            console.error('Token address is required')
            return;
        }
        const amount = parseEther(bulkSenderState.totalAmount?.toString() || '0');
        await writeContract({
            abi: BULK_SENDER_ABI,
            address: bulkSenderState.tokenAddress,
            functionName: 'registerVIP',
            args: [],
            value: data as bigint,
        });
    }
    return { buyVip,vipFee: data, buyVipError, isBuyingVip, isLoading: isConfirming, isSuccess: isConfirmed }
}