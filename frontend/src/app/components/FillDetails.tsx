'use client'

import { useContext } from "react";
import { BulkSenderStateContext } from "../providers";
import { DragComponent } from "./DragComponent"
import { TokenAddressInput } from "./TokenAddressInput"
import { NumberedTextarea } from "./NumberedTextarea";

export function FillDetails( ) {
    const {bulkSenderState} = useContext(BulkSenderStateContext);
    return (
        <>
            <TokenAddressInput />
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
            <a
                href="#"
                className="rounded-md bg-indigo-600 px-10 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Next
            </a>
            </div>
        </>
    )
}