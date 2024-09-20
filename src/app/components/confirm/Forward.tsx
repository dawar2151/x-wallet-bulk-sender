'use client';
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { useContext } from "react";
import { BulkSenderStateContext } from "@/app/providers";
import { useAccount, useBalance } from "wagmi";
import { encodeFunctionData, formatEther, Hex, parseEther } from "viem";
import { BULK_SENDER_ABI } from "@/app/abis/BULKSENDER";
import { NetworksConfig } from "@/app/config/bulkSender";
import DiscreteSliderLabel from "@/components/confirm/GasFee";
import { useEstimateGas } from 'wagmi';
import { useApproveHelper } from "@/components/approve/useApproveHelper";
import { XCard } from "@/app/utils/XCard";

export function Forward() {
    const { address, chainId } = useAccount();
    const { balanceOf, symbol } = useApproveHelper();
    const { bulkSenderState, isDarkMode } = useContext(BulkSenderStateContext);
    const nativeTokenBalance = useBalance({
        address: address,
        unit: 'ether',
    });

    let result;
    const dataHex = encodeFunctionData({
        abi: BULK_SENDER_ABI,
        functionName: 'bulkTransferERC20',
        args: [
            bulkSenderState.tokenAddress,
            bulkSenderState.receivers?.map(a => a.address),
            bulkSenderState.receivers?.map(a => parseEther(a.amount)),
        ]
    });
    result = useEstimateGas({
        data: dataHex?.toString() as Hex,
        to: NetworksConfig[chainId as number].bulkSenderAddress,
        value: parseEther('0'),
    });

    return (
        <div className={`m-3 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <DiscreteSliderLabel />
            <div className="grid grid-cols-2 gap-2 justify-items-stretch">
                <XCard  caption={`${bulkSenderState?.receivers?.length || '0'} Addresses`} description="Total number of addresses" />
                <XCard caption={`${bulkSenderState?.totalAmount || '0'} ${bulkSenderState?.tokenSymbol}`} description="Total number of tokens to be sent." />
                <XCard caption="1" description="Total number of transactions needed" />
                <XCard caption={`${balanceOf?.result ? formatEther(BigInt(balanceOf?.result), 'wei') : '0'} ${symbol?.result}`} description="Your token balance." />
                <XCard caption={`${(Number(result?.data) * bulkSenderState?.currentGasPrice) / 1000000000} ETH`} description="Approximate cost of operation" />
                <XCard caption={`${nativeTokenBalance.data?.formatted || '0' } ${nativeTokenBalance.data?.symbol}`} description="Your Native token balance." />
            </div>
        </div>
    );
}
