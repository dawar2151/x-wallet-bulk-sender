'use client';
import { Radio } from "@material-tailwind/react";
import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { ABI_ERC20 } from "@/app/abis/ERC20";
import { useAccount, useBalance, useReadContracts, useWriteContract } from "wagmi";
import { BulkSenderStateContext } from "@/app/providers";
import { useContext, useState } from "react";
import { formatEther, formatUnits, parseUnits } from "viem";
import { ApproveType, STEPS } from "@/app/types/BulkSenderState";
import { useApproveHelper } from "./useApproveHelper";
import React, {  useEffect } from 'react';

export const HorizontalSpinnerWithPercentage = ({text, progress}:{text: string, progress: number}) => {
  return (
    <div className="flex flex-col m-1 my-8">
        <div className="text-left font-semibold">
        {text}
      </div>
      <div className="relative w-full h-6 bg-gray-200 rounded-full">
        <div
          className="absolute left-0 top-0 h-full bg-blue-500 rounded-full"
          style={{
            width: `${progress}%`,
            transition: 'width 1s ease-in-out', // smooth animation
          }}
        ></div>
      </div>
    </div>
  );
};



export function Summary() {

    const { setBulkSenderState, bulkSenderState } = useContext(BulkSenderStateContext);
    const {allowance, balanceOf, symbol, result, decimals} = useApproveHelper();

    const setApproveType = (type: ApproveType) => {
        setBulkSenderState({
            ...bulkSenderState,
            approveType: type
        })
    }
    console.log('balanceOf', allowance, balanceOf, symbol, result)
    return (
        <div>
            <div className="grid grid-cols-2 gap-2 justify-items-stretch">
                <Card className="w-auto">
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {`${formatUnits(allowance?.result?.toString() ?? '0', decimals?.result)} ${symbol?.result}`}
                        </Typography>
                        <Typography>
                            Your current bulksender allowance.
                        </Typography>
                    </CardBody>
                </Card>
                <Card className="w-auto">
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {bulkSenderState.totalAmount} {symbol?.result}
                        </Typography>
                        <Typography>
                            Total number of tokens to be sent.
                        </Typography>
                    </CardBody>
                </Card>
                <Card className="w-auto">
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {balanceOf?.result?formatEther(BigInt(balanceOf?.result), 'wei'):'0'} {symbol?.result}
                        </Typography>
                        <Typography>
                            your {`${symbol?.result}`} Balance
                        </Typography>
                    </CardBody>
                </Card>
                <Card className="w-auto">
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {result?.data?.formatted.toString()} ETH
                        </Typography>
                        <Typography>
                        Your Native token balance
                        </Typography>
                    </CardBody>
                </Card>
            </div>
            <div className="text-center underline-offset-1 my-5">Amount to approve</div>
            <div className="text-center gap-10" onChange={(e)=>setApproveType(e.target.value)}>
                <Radio name="type" value={ApproveType.Custom} label="Exact Amount to be sent" />
                <Radio name="type" value={ApproveType.Unlimited} label="Unlimited amount" defaultChecked />
            </div>
        </div>
    )
}