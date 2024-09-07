"use client";

import { useContext, useState } from "react";
import { Base64 } from "js-base64";
import { BulkSenderStateContext } from "../providers";
import { Receiver, TypingType } from "../types/BulkSenderState";

export function TypingTypeChoose() {
  const [ownerLicense, setOwnerLicense] = useState<any>([]);
  const { bulkSenderState, setBulkSenderState } = useContext(BulkSenderStateContext);

  const setTypingtoManually = () => {
    setBulkSenderState({
      ...bulkSenderState,
      currentTypingType: TypingType.Manually
    })
  }
  const setTypingtoUpload = () => {
    setBulkSenderState({
      ...bulkSenderState,
      currentTypingType: TypingType.Upload
    })
  }
  return (
      <div className="pb-[8px] flex flex-row">
        <h2 className="text-black text-[12px] font-[500] basis-1/2 text-left">
        <a href="#" className="text-[#0070f3]" onClick={()=>setTypingtoUpload()}>
          Drag and Drop Your CSV File here
          </a>
        </h2>
        <h2 className="text-black text-[12px] font-[500] basis-1/2 text-right">
          <a href="#" className="text-[#0070f3]" onClick={()=>setTypingtoManually()}>
          Insert Manualy
          </a>
        </h2>
      </div>
  );
}
