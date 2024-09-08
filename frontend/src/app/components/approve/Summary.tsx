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
import { formatEther } from "viem";
import { ApproveType, STEPS } from "@/app/types/BulkSenderState";
import { useApproveHelper } from "./useApproveHelper";
export function Summary() {

    const { setBulkSenderState, bulkSenderState } = useContext(BulkSenderStateContext);
    const {allowance, balanceOf, symbol, result} = useApproveHelper();

    const setApproveType = (type: ApproveType) => {
        setBulkSenderState({
            ...bulkSenderState,
            approveType: type
        })
    }
    return (
        <div>
            <div className="grid grid-cols-2 gap-2 justify-items-center">
                <Card className="mt-6 w-96">
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {`${allowance?.result} ${symbol?.result}`}
                        </Typography>
                        <Typography>
                            Your current bulksender allowance.
                        </Typography>
                    </CardBody>
                </Card>
                <Card className="mt-6 w-96">
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {bulkSenderState.totalAmount} {symbol?.result}
                        </Typography>
                        <Typography>
                            Total number of tokens to be sent.
                        </Typography>
                    </CardBody>
                </Card>
                <Card className="mt-6 w-96">
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {balanceOf?.result?formatEther(BigInt(balanceOf?.result), 'wei'):'0'} {symbol?.result}
                        </Typography>
                        <Typography>
                            your {`${symbol?.result}`} Balance
                        </Typography>
                    </CardBody>
                </Card>
                <Card className="mt-6 w-96">
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