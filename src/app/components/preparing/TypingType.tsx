"use client";

import { useContext, useState } from "react";
import { BulkSenderStateContext } from "@/app/providers";
import { TypingType } from "@/app/types/BulkSenderState";
import { Button, Switch } from "@material-tailwind/react";

export function TypingTypeChoose() {
  const { bulkSenderState, setBulkSenderState, isDarkMode } = useContext(BulkSenderStateContext);

  const toggleTypingType = () => {
      setBulkSenderState({
        ...bulkSenderState,
        currentTypingType: bulkSenderState.currentTypingType == TypingType.Manually? TypingType.Upload: TypingType.Manually
      });
  }

  return (
    <div className={`pb-[8px] flex flex-row`}>
      <Switch color={isDarkMode ? "gray" : "gray"} label={bulkSenderState.currentTypingType == TypingType.Upload ? 'Insert Manually' : 'Upload'} onClick={toggleTypingType} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
    </div>
  );
}
