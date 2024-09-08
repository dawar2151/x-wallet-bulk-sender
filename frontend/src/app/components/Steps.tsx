'use client';

import React, { useContext, useEffect } from "react";
import {
  Spinner
} from "@material-tailwind/react";
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { FillDetails } from "@/components/preparing/FillDetails";
import { Summary } from "@/components/summary/Summary";
import { Forward } from "@/components/executeTransfer/Forward";
import { BulkSenderStateContext } from "@/app/providers";
import { STEPS } from "@/app/types/BulkSenderState";

import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import {
  CogIcon,
  UserIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
import { useApproveHelper } from "@/components/summary/useApproveHelper";
import { useTransferHelper } from "@/components/executeTransfer/useTransferHelper";
import { parseEther } from "viem";
 
export function TabsWithIcon( ) {
  const {setBulkSenderState,bulkSenderState} = useContext(BulkSenderStateContext);
  const { erc20Approve, isConfirmed, isPending, allowance } = useApproveHelper();
  const {erc20Transfer ,isTransferConfirmed, isTransferPending} = useTransferHelper();
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
 
  const handleNext = async () => {
    console.log(allowance?.result)
    console.log(bulkSenderState?.totalAmount)
     if(activeStep === 0 && (allowance?.result as number) >= (parseEther(bulkSenderState.totalAmount?.toString() || '0') ?? 0)){
      !isLastStep && setActiveStep((cur) => cur + 2)
     }else if(activeStep === 1 && (allowance?.result as number) < (parseEther(bulkSenderState.totalAmount?.toString() || '0') ?? 0)){
      await erc20Approve();
    }else if(activeStep === 2){
      await erc20Transfer();
    } else {
      !isLastStep && setActiveStep((cur) => cur + 1)
    }
  };
  useEffect(() => {
    !isLastStep && setActiveStep((cur) => cur + 1)
  },[isConfirmed])

  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
 

  const data = {
    0: {
      label: STEPS.PREPARING,
      value: STEPS.PREPARING,
      icon: Square3Stack3DIcon,
      desc: <FillDetails   />,
      step: STEPS.PREPARING,
    },
    1: {
      label: STEPS.APPROVE,
      value: STEPS.APPROVE,
      icon: UserCircleIcon,
      desc: <Summary />,
      step: STEPS.APPROVE,
    },
    2: {
      label: STEPS.TRANSFER,
      value: STEPS.TRANSFER,
      icon: Cog6ToothIcon,
      desc: <Forward />,
      step: STEPS.TRANSFER,
    },
  };
  const setStep =(step: STEPS)=>{
    setBulkSenderState({
      ...bulkSenderState,
      currentStep: step
  })
  }
  return (
    <div className="w-full py-4 px-8">
    <Stepper
      activeStep={activeStep}
      isLastStep={(value) => setIsLastStep(value)}
      isFirstStep={(value) => setIsFirstStep(value)}
    >
      <Step onClick={() => setActiveStep(0)}>
          <UserIcon className="h-5 w-5" />
          <div className="absolute -bottom-[2.5rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 0 ? "blue-gray" : "gray"}
            >
              {data[0].label}
            </Typography>
            {/* <Typography
              color={activeStep === 0 ? "blue-gray" : "gray"}
              className="font-normal"
            >
              Fill token address, receivers and amounts.
            </Typography> */}
          </div>
        </Step>
        <Step onClick={() => setActiveStep(1)}>
          <CogIcon className="h-5 w-5" />
          <div className="absolute -bottom-[2.5rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 1 ? "blue-gray" : "gray"}
            >
               {data[1].label}
            </Typography>
            {/* <Typography
              color={activeStep === 1 ? "blue-gray" : "gray"}
              className="font-normal"
            >
              Give allowance to bulk sender contract to spend token.
            </Typography> */}
          </div>
        </Step>
        <Step onClick={() => setActiveStep(2)}>
          <BuildingLibraryIcon className="h-5 w-5" />
          <div className="absolute -bottom-[2.5rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 2 ? "blue-gray" : "gray"}
            >
               {data[2].label}
            </Typography>
            {/* <Typography
              color={activeStep === 2 ? "blue-gray" : "gray"}
              className="font-normal"
            >
              Execute the transaction.
            </Typography> */}
          </div>
        </Step>
    </Stepper>
    <div className="mt-20">
    {data[activeStep].desc}
    </div>
    <div className="mt-16 flex justify-between">
      <Button onClick={handlePrev} disabled={isFirstStep}>
        Prev
      </Button>
      <Button onClick={handleNext}>
        {isPending || isTransferPending ? <Spinner /> : "Next"}
      </Button>
    </div>
  </div>
);
}