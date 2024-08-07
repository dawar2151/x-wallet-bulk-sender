"use client";

import { CustomDragDrop } from "./CustomContainer";
import { useState } from "react";

export  function DragComponent() {
  const [ownerLicense, setOwnerLicense] = useState<any>([]);

  function uploadFiles(f:any) {
    setOwnerLicense([...ownerLicense, ...f]);
  }

  function deleteFile(indexImg:any) {
    const updatedList = ownerLicense.filter((ele:any, index:any) => index !== indexImg);
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
