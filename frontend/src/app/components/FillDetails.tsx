'use client'

import { useContext } from "react";
import { BulkSenderStateContext } from "../providers";
import { DragComponent } from "./DragComponent"
import { TokenAddressInput } from "./TokenAddressInput"
import { NumberedTextarea } from "./NumberedTextarea";
import { STEPS, TypingType } from "../types/BulkSenderState";
import CheckContractType from "../utils/getTokenType";
import { Address } from "viem";
import { TypingTypeChoose } from "./TypingType";

export function FillDetails() {
    const { setBulkSenderState, bulkSenderState } = useContext(BulkSenderStateContext);

    return (
        <>
            <TokenAddressInput />
            {/* <div className="my-5">
                Contract type: <CheckContractType contractAddress={bulkSenderState.tokenAddress as Address} />
            </div> */}
            <div className="my-10">
                <TypingTypeChoose />

                {
                    bulkSenderState?.currentTypingType == TypingType.Manually ? (
                        <NumberedTextarea />
                    ) : (
                        <DragComponent />
                    )
                }
            </div>
        </>
    )
}