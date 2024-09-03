'use client'

import { useContext } from "react";
import { BulkSenderStateContext } from "../providers";
import { DragComponent } from "./DragComponent"
import { TokenAddressInput } from "./TokenAddressInput"
import { NumberedTextarea } from "./NumberedTextarea";
import { STEPS } from "../types/BulkSenderState";
import CheckContractType from "../utils/getTokenType";
import { Address } from "viem";

export function FillDetails( ) {
    const {setBulkSenderState,bulkSenderState} = useContext(BulkSenderStateContext);
    const setCurrentStep = () => {
        console.log(bulkSenderState);
        setBulkSenderState({
            ...bulkSenderState,
            currentStep: STEPS.APPROVE
        })
    }
    return (
        <>
            <TokenAddressInput />
           Contract type: <CheckContractType contractAddress={bulkSenderState.tokenAddress as Address} />
            <div className="my-10">
                {
                    bulkSenderState?.stringReceivers ? (
                        <NumberedTextarea />
                    ):(
                        <DragComponent   />
                    )
                }
            </div>
            <div className="text-right my-10">
            <button
                onClick={()=>setCurrentStep()}
                className="rounded-md bg-indigo-600 px-10 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Next
            </button>
            </div>
        </>
    )
}