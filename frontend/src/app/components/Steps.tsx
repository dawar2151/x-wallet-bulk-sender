'use client';

import React, { useContext } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { FillDetails } from "./FillDetails";
import { Summary } from "./Summary";
import { Forward } from "./Forward";
import { BulkSenderStateContext } from "../providers";
import { BulkSenderState, STEPS } from "../types/BulkSenderState";
 
export function TabsWithIcon( ) {
  const {setBulkSenderState,bulkSenderState} = useContext(BulkSenderStateContext);
  const data = [
    {
      label: STEPS.PREPARING,
      value: STEPS.PREPARING,
      icon: Square3Stack3DIcon,
      desc: <FillDetails   />,
      step: STEPS.PREPARING,
    },
    {
      label: STEPS.APPROVE,
      value: STEPS.APPROVE,
      icon: UserCircleIcon,
      desc: <Summary />,
      step: STEPS.APPROVE,
    },
    {
      label: STEPS.TRANSFER,
      value: STEPS.TRANSFER,
      icon: Cog6ToothIcon,
      desc: <Forward />,
      step: STEPS.TRANSFER,
    },
  ];
  const setStep =(step: STEPS)=>{
    setBulkSenderState({
      ...bulkSenderState,
      currentStep: step
  })
  }
  return (
    <div>
    <div className="flex space-x-3 border-b">
      {/* Loop through tab data and render button for each. */}
      {data.map(({label, value, desc, step}, idx) => {
        return (
          <button
            key={value}
            className={`py-2 border-b-4 transition-colors duration-300 ${
              value === bulkSenderState.currentStep
                ? 'border-teal-500'
                : 'border-transparent hover:border-gray-200'
            }`}
            onClick={() => setStep(step)}
          >
            {label}
          </button>
        );
      })}
    </div>
    {/* Show active tab content. */}
    <div className="py-4">
      <p>{data.filter(item=>item.value === bulkSenderState.currentStep)[0].desc}</p>
    </div>
  </div>
);
}