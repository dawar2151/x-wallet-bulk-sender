'use client';

import { Textarea, IconButton } from "@material-tailwind/react";
import { useState } from "react";
import { useReadContract, useReadContracts } from "wagmi";
import { abi } from "../abis/erc20";
import { Address } from "viem";
 
export function TokenAddressInput() {
   const [address, setAddress] = useState<Address>();
   const contractConfig = {
    abi,
    address,
   }
   const { 
    data,
    error,
    isPending
  } = useReadContracts({ 
    contracts: [{ 
    
      functionName: 'balanceOf',
     ...contractConfig,
      args: ['0x03A71968491d55603FFe1b11A9e23eF013f75bCF'],
    }, { 
      functionName: 'symbol',
      ...contractConfig,
    },
    { 
      functionName: 'decimals', 
      ...contractConfig,
    }, { 
      functionName: 'totalSupply', 
      ...contractConfig,
    }] 
  }) 
  const [balance, symbol, decimals] = data || [] 

 console.log(data);
  return (
    <div className="flex w-full flex-row items-center gap-2 rounded-[99px] border border-gray-900/10 bg-gray-900/5 p-2">
      <div className="flex">
        <IconButton variant="text" className="rounded-full">
         {symbol?.result}
        </IconButton>
        <IconButton variant="text" className="rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
            />
          </svg>
        </IconButton>
      </div>
      <Textarea
        rows={1}
        resize={true}
        value={address}
        onChange={e=>setAddress(e.target.value)}
        placeholder="Your Token Address"
        className="min-h-full !border-0 focus:border-transparent"
        containerProps={{
          className: "grid h-full",
        }}
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
      <div>
        <IconButton variant="text" className="rounded-full">
          {decimals?.result}
        </IconButton>
      </div>
    </div>
  );
}