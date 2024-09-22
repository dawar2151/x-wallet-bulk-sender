'use client';
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { useContext } from "react";
import { BulkSenderStateContext } from "@/app/providers";
import { useAccount, useBalance } from "wagmi";
import { encodeFunctionData, formatEther, formatUnits, Hex, parseEther } from "viem";
import { BULK_SENDER_ABI } from "@/app/abis/BULKSENDER";
import { NetworksConfig } from "@/app/config/bulkSender";
import DiscreteSliderLabel from "@/components/confirm/GasFee";
import { useEstimateGas } from 'wagmi';
import { useApproveHelper } from "@/components/approve/useApproveHelper";
import { XCard } from "@/app/utils/XCard";
import { useTransferHelper } from "./useTransferHelper";
import CheckContractType from "@/app/utils/getTokenType";
import { ContractType } from "@/app/types/BulkSenderState";

export function Forward() {
    const { address, chainId } = useAccount();
    const { getTokenBalance } = useApproveHelper();
    const { getTransferTokenFunctionName, getTransferTokenArgs } = useTransferHelper()
    const tokenType = CheckContractType();
    const { bulkSenderState, isDarkMode } = useContext(BulkSenderStateContext);
    const nativeTokenBalance = useBalance({
        address: address,
        unit: 'ether',
    });
    const getHexData = () => {
        if (tokenType == ContractType.Unknown) {
            return "0x";
        }
        const dataHex = encodeFunctionData({
            abi: BULK_SENDER_ABI,
            functionName: getTransferTokenFunctionName(),
            args: getTransferTokenArgs()
        });
        return dataHex;
    }  
        let result = useEstimateGas({
            data: getHexData()?.toString() as Hex,
            to: NetworksConfig[chainId as number]?.bulkSenderAddress,
            value: parseEther('0'),
        });
    console.log(result);
    return (
        <div className={`m-3 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <DiscreteSliderLabel />
            <div className="grid grid-cols-2 gap-2 justify-items-stretch">
                <XCard caption={`${bulkSenderState?.receivers?.length || '0'} Addresses`} description="Total number of addresses" />
                <XCard caption={`${bulkSenderState?.totalAmount || '0'}`} description="Total number of tokens to be sent." />
                <XCard caption="1" description="Total number of transactions needed" />
                <XCard caption={(getTokenBalance() as number).toString()} description="Your token balance." />
                <XCard caption={`${(Number(result?.data) * (bulkSenderState?.currentGasPrice ?? 0)) / 1000000000} ETH`} description="Approximate cost of operation" />
                <XCard caption={`${nativeTokenBalance.data?.formatted || '0'} ${nativeTokenBalance.data?.symbol}`} description="Your Native token balance." />
            </div>
        </div>
    );
}
