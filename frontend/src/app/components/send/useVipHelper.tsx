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
import { BulkSenders } from "@/app/config/bulkSender";
import { ApproveType, ContractType } from "@/app/types/BulkSenderState";
import CheckContractType from "@/app/utils/getTokenType";
import { ABI_ERC721 } from "@/app/abis/ERC721";
import { ABI_ERC1155 } from "@/app/abis/ERC1155";
import { BULK_SENDER_ABI } from "@/app/abis/BULKSENDER";
export function useVipHelper() {
    const { address, chainId } = useAccount()
    const { data: hash,
        error: buyVipError,
        isPending: isBuyingVip,
        writeContractAsync
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
        address: BulkSenders[chainId as number]
    }
    const {data} = useReadContract({
        ...contractConfig,
        functionName: 'VIPFee'
    })
    const {data: isVip} = useReadContract({
        ...contractConfig,
        functionName: 'isVIP',
        args: [address]
    })
    const buyVip = async () => {
        console.log('buying vip', data);
        await writeContractAsync({
            abi: BULK_SENDER_ABI,
            address: BulkSenders[chainId as number],
            functionName: 'registerVIP',
            args: [],
            value: data as bigint,
        });
    }
    return { buyVip,vipFee: data, buyVipError, isBuyingVip, isLoading: isConfirming, isSuccess: isConfirmed, isVIP: isVip }
}