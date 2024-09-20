'use client';
import { Radio } from "@material-tailwind/react";
import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";

import { useContext } from "react";
import { BulkSenderStateContext } from "@/app/providers";
import { useAccount, useBalance, useWriteContract} from "wagmi";
import { encodeFunctionData, formatEther, Hex, isAddress, parseEther } from "viem";
import { BULK_SENDER_ABI } from "@/app/abis/BULKSENDER";
import { NetworksConfig } from "@/app/config/bulkSender";
import DiscreteSliderLabel from "@/components/confirm/GasFee";
import { useEstimateGas } from 'wagmi'
import { useApproveHelper } from "@/components/approve/useApproveHelper";
export function Forward() {
    const {address, chainId} = useAccount();
    const {balanceOf, symbol} = useApproveHelper();
    const {bulkSenderState} = useContext(BulkSenderStateContext);
    const nativeTokenBalance = useBalance({
        address: address,
        unit: 'ether',
    });
   
    let result;
    //if(isAddress(bulkSenderState.tokenAddress as string) && bulkSenderState.receivers?.length){
        const dataHex = encodeFunctionData({
            abi: BULK_SENDER_ABI,
            functionName: 'bulkTransferERC20',
            args: [
                bulkSenderState.tokenAddress,
                bulkSenderState.receivers?.map(a=> a.address),
                bulkSenderState.receivers?.map(a=> parseEther(a.amount)),
            ]
          })
         result = useEstimateGas({
            data: dataHex?.toString() as Hex, 
            to: NetworksConfig[chainId as number].bulkSenderAddress ,
            value: parseEther('0'),
          })
   // }
  
    return (
        <div>
            <div className="m-3">
                <DiscreteSliderLabel />
            </div>
            <div className="grid grid-cols-2 gap-2  justify-items-stretch">
                <Card className="w-auto">
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {bulkSenderState?.receivers?.length || '0'} Addresses
                        </Typography>
                        <Typography>
                        Total number of addresses
                        </Typography>
                    </CardBody>
                </Card>
                <Card className="w-auto">
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {bulkSenderState?.totalAmount || '0'} {bulkSenderState?.tokenSymbol}
                        </Typography>
                        <Typography>
                        Total number of tokens to be sent.
                        </Typography>
                    </CardBody>
                </Card>
                <Card className="w-auto">
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            1
                        </Typography>
                        <Typography>
                        Total number of transactions needed
                        </Typography>
                    </CardBody>
                </Card>
                <Card className="w-auto">
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                        {balanceOf?.result?formatEther(BigInt(balanceOf?.result), 'wei'):'0'} {symbol?.result}
                        </Typography>
                        <Typography>
                            Your token balance.
                        </Typography>
                    </CardBody>
                </Card>
                <Card className="w-auto">
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {(Number(result?.data) * bulkSenderState?.currentGasPrice)/1000000000} ETH
                        </Typography>
                        <Typography>
                        Approximate cost of operation 
                        </Typography>
                    </CardBody>
                </Card>
                <Card className="w-auto">
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                           {nativeTokenBalance.data?.formatted || '0'} {nativeTokenBalance.data?.symbol}
                        </Typography>
                        <Typography>
                        Your Native token balance
                        </Typography>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}