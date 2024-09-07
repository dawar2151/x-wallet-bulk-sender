'use client';

import { Textarea, IconButton, Spinner } from "@material-tailwind/react";
import { ReactNode, useContext, useState } from "react";
import { useReadContract, useReadContracts } from "wagmi";
import { ABI_ERC20 } from "../abis/ERC20";
import { Address } from "viem";
import { BulkSenderStateContext } from "../providers";

export function TokenAddressInput() {
  const { setBulkSenderState, bulkSenderState } = useContext(BulkSenderStateContext);
  const onChangeAddress = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBulkSenderState(
      {
        ...bulkSenderState,
        tokenAddress: e.target.value as Address,  
      }  
    )
  }
  const contractConfig = {
    abi: ABI_ERC20,
    address: bulkSenderState.tokenAddress,
  }
  const {
    data,
    error,
    isPending
  } = useReadContracts({
    contracts: [{
      functionName: 'symbol',
      ...contractConfig,
    },
    {
      functionName: 'decimals',
      ...contractConfig,
    }]
  })
  const [symbol, decimals] = data || []
  return (
    <div className="flex w-full flex-row items-center gap-2 rounded-[99px] border border-gray-900/10 bg-gray-900/5 p-2">
      <div className="flex">
        {isPending ? <Spinner size="sm" color="gray" /> :
          <IconButton variant="text" className="rounded-full">
                        {symbol?.result as ReactNode}

          </IconButton>
        }
      </div>
      <Textarea
        rows={1}
        resize={true}
        value={bulkSenderState.tokenAddress}
        onChange={e => onChangeAddress(e)}
        placeholder="Fill your ERC20, ERC721 or ERC1155 Address"
        className="min-h-full !border-0 focus:border-transparent"
        containerProps={{
          className: "grid h-full",
        }}
        labelProps={{
          className: "before:content-none after:content-none",
        }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
      <div>
        {isPending ? <Spinner size="sm" color="gray" /> :
          <IconButton variant="text" className="rounded-full">
            {!decimals?.error? decimals?.result.toString() as ReactNode:'0'}
          </IconButton>
        }
      </div>
    </div>
  );
}