'use client';

import { Textarea, IconButton, Spinner } from "@material-tailwind/react";
import { ReactNode, useContext } from "react";
import { useReadContract, useReadContracts } from "wagmi";
import { ABI_ERC20 } from "@/app/abis/ERC20";
import { Address } from "viem";
import { BulkSenderStateContext } from "@/app/providers";
import CheckContractType from "@/app/utils/getTokenType";
import { useApproveHelper } from "../approve/useApproveHelper";

export function TokenAddressInput() {
  const { setBulkSenderState, bulkSenderState, isDarkMode } = useContext(BulkSenderStateContext);
  const tokenType = CheckContractType();
  
  const onChangeAddress = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBulkSenderState({
      ...bulkSenderState,
      tokenAddress: e.target.value as Address,  
    });
  };

  const { decimals, symbol, isReadLoading } = useApproveHelper();
  
  return (
    <div className={`flex w-full flex-row items-center gap-2 rounded-[99px] border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} bg-gray-900/5 p-2`}>
      <div className="flex">
        {(isReadLoading || !bulkSenderState.tokenAddress) ? 
          <Spinner color={isDarkMode ? 'amber' : 'green'} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} /> :
          <IconButton variant="text" className="rounded-full text-gray-800"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            {tokenType}
          </IconButton>
        }
      </div>
      <Textarea
        rows={1}
        resize={true}
        value={bulkSenderState.tokenAddress}
        onChange={onChangeAddress}
        placeholder="Fill your ERC20, ERC721 or ERC1155 Address"
        className="min-h-full !border-0 focus:border-transparent"
        containerProps={{
          className: "grid h-full",
        }}
        labelProps={{
          className: "before:content-none after:content-none",
        }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}      />
      <div>
        {(isReadLoading || !bulkSenderState.tokenAddress) ? 
          <Spinner color={isDarkMode ? 'brown' : 'amber'} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} /> :
          <IconButton variant="text" className="rounded-full text-gray-800"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            {!decimals?.error ? (decimals?.result as number).toString() as ReactNode : '0'}
          </IconButton>
        }
      </div>
    </div>
  );
}
