"use client";

import { useContext, useState } from "react";
import { Base64 } from "js-base64";
import { BulkSenderStateContext } from "@/app/providers";
import { Receiver, TypingType } from "@/app/types/BulkSenderState";
import { ExampleContents } from "@/components/preparing/ExampleContents";
import { Button } from "@material-tailwind/react";

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
        <h2 className="text-black text-[12px] font-[500] basis-1/3 text-left">
        <Button size="lg" color="white" onClick={()=>setTypingtoUpload()} className="flex items-center gap-3">
        Upload File
      </Button>
        </h2>
        <h2 className="text-black text-[12px] font-[500] basis-1/3 text-center">
         <ExampleContents />
        </h2>
        <h2 className="text-black text-[12px] font-[500] basis-1/3 text-right">
          <Button size="lg" color="white" onClick={()=>setTypingtoManually()}>
        Insert Manually
      </Button>
        </h2>
      </div>
  );
}
