"use client";

import { CustomDragDrop } from "@/components/preparing/CustomDragDrop";
import { useContext, useState } from "react";
import { Base64 } from "js-base64";
import { BulkSenderStateContext } from "@/app/providers";
import { Receiver, TypingType } from "@/app/types/BulkSenderState";
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
        currentTypingType: TypingType.Manually
      }
    )
  }

  function deleteFile(indexImg: any) {
    const updatedList = ownerLicense.filter((ele: any, index: any) => index !== indexImg);
    setOwnerLicense(updatedList);
  }
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
    <div className="bg-white shadow rounded-lg w-full px-5 pt-3 pb-5">
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
