"use client";

import { CustomDragDrop } from "./CustomContainer";
import { useContext, useState } from "react";
import { Base64 } from "js-base64";
import { BulkSenderStateContext } from "../providers";
import { Receiver } from "../types/BulkSenderState";
import { useBalance } from "wagmi";
import { isAddress } from "viem";

export function DragComponent() {
  const [ownerLicense, setOwnerLicense] = useState<any>([]);
  const { bulkSenderState, setBulkSenderState } = useContext(BulkSenderStateContext);

  function uploadFiles(f: any) {
    setOwnerLicense([...ownerLicense, ...f]);
    const content = Base64.decode(f[0].fileContent.split(",")[1]);

    const data = Base64.decode(f[0].fileContent.split(",")[1]);
    const receiversAccounts = data.split('\n').map((line) => {
      const [address, amount] = line.replace('\r', '').split(',');
      return {
        address,
        amount,
      };
    }).filter(({ address, amount }) => isAddress(address) && amount);
    const totalAmount = receiversAccounts.reduce((acc, { amount }) => acc + Number(amount), 0);
    setBulkSenderState(
      {
        ...bulkSenderState,
        stringReceivers: data,
        receivers: receiversAccounts,
        totalAmount: totalAmount,
      }
    )
  }

  function deleteFile(indexImg: any) {
    const updatedList = ownerLicense.filter((ele: any, index: any) => index !== indexImg);
    setOwnerLicense(updatedList);
  }

  return (
    <div className="bg-white shadow rounded-lg w-full px-5 pt-3 pb-5">
      <div className="pb-[8px] border-b border-[#e0e0e0]">
        <h2 className="text-black text-[17px] font-[600]">
          Drag and Drop Your File here
        </h2>
      </div>
      <CustomDragDrop
        ownerLicense={ownerLicense}
        onUpload={uploadFiles}
        onDelete={deleteFile}
        count={2}
        formats={["csv", "txt"]}
      />
    </div>
  );
}
