'use client'

import { useContext } from "react";
import { BulkSenderStateContext } from "@/app/providers";
import { DragComponent } from "@/components/preparing/DragComponent"
import { TokenAddressInput } from "@/components/preparing/TokenAddressInput"
import { NumberedTextarea } from "@/components/preparing/NumberedTextarea";
import { TypingType } from "@/app/types/BulkSenderState";
import { TypingTypeChoose } from "@/components/preparing/TypingType";

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