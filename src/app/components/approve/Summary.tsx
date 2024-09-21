'use client';

import { Card, CardBody, Typography, Radio } from "@material-tailwind/react";
import { use, useContext } from "react";
import { BulkSenderStateContext } from "@/app/providers";
import { useApproveHelper } from "@/app/components/approve/useApproveHelper"; // Adjust path if needed
import { formatEther, formatUnits } from "viem";
import { ApproveType, ContractType } from "@/app/types/BulkSenderState";
import { XCard } from "@/app/utils/XCard";
import CheckContractType from "@/app/utils/getTokenType";

export const Summary = () => {
    const { setBulkSenderState, bulkSenderState, theme, isDarkMode } = useContext(BulkSenderStateContext);
    const { allowance, balanceOf, decimals, symbol, nativeTokenBalance,getTokenBalance, isAllowed } = useApproveHelper();
    const tokenType = CheckContractType();
    const setApproveType = (type) => {
        setBulkSenderState({
            ...bulkSenderState,
            approveType: type
        });
    };
    const allowadeDescription = tokenType === ContractType.ERC20 ? formatUnits(BigInt(allowance?.result?.toString() as string ?? '0'), decimals?.result) + ' ' + symbol?.result + 'allowed to spend your tokens' : '';

    return (
        <div>
            <div className="grid grid-cols-2 gap-2 justify-items-stretch">
                <XCard caption={`IsAllowed: ${isAllowed}`} description={allowadeDescription} />
                <XCard caption={bulkSenderState.totalAmount + ' ' + symbol?.result} description="Total number of tokens to be sent." />
                <XCard caption={(getTokenBalance() as number).toString()} description={`Your ${symbol?.result} balance.`} />
                <XCard caption={nativeTokenBalance?.data?.formatted?.toString() ?? '0'} description="Your Native token balance." />
            </div>
            {tokenType == ContractType.ERC20 &&
                <div>
                    <div className="text-center underline-offset-1 my-5">Amount to approve</div>
                    <div className="text-center gap-10" onChange={(e) => setApproveType(e.target.value)}>
                        <Radio name="type" value={ApproveType.Custom} label="Exact Amount to be sent" />
                        <Radio name="type" value={ApproveType.Unlimited} label="Unlimited amount" defaultChecked />
                    </div>
                </div>
            }

        </div>
    );
};
