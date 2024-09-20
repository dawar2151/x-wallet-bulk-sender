'use client';

import { Card, CardBody, Typography, Radio } from "@material-tailwind/react";
import { useContext } from "react";
import { BulkSenderStateContext } from "@/app/providers";
import { useApproveHelper } from "@/app/components/approve/useApproveHelper"; // Adjust path if needed
import { formatEther, formatUnits } from "viem";
import { ApproveType } from "@/app/types/BulkSenderState";
import { XCard } from "@/app/utils/XCard";

export const Summary = () => {
    const { setBulkSenderState, bulkSenderState, theme, isDarkMode } = useContext(BulkSenderStateContext);
    const { allowance, balanceOf, symbol, nativeTokenBalance, decimals } = useApproveHelper();

    const setApproveType = (type) => {
        setBulkSenderState({
            ...bulkSenderState,
            approveType: type
        });
    };

    return (
        <div>
            <div className="grid grid-cols-2 gap-2 justify-items-stretch">
                <XCard caption={`${formatUnits(allowance?.result?.toString() ?? '0', decimals?.result)} ${symbol?.result}`} description="Your current bulksender allowance." />
                <XCard caption={bulkSenderState.totalAmount+' '+symbol?.result} description="Total number of tokens to be sent." />
                <XCard caption= {balanceOf?.result ? formatEther(BigInt(balanceOf?.result), 'wei') : '0'} description={`Your ${symbol?.result} balance.`} />
                <XCard caption={nativeTokenBalance?.data?.formatted.toString()} description="Your Native token balance." />
            </div>
            <div className="text-center underline-offset-1 my-5">Amount to approve</div>
            <div className="text-center gap-10" onChange={(e) => setApproveType(e.target.value)}>
                <Radio name="type" value={ApproveType.Custom} label="Exact Amount to be sent" />
                <Radio name="type" value={ApproveType.Unlimited} label="Unlimited amount" defaultChecked />
            </div>
        </div>
    );
};
