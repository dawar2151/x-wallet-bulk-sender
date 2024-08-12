'use client';

import React from "react";
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
 
export function TabsWithIcon() {
  const data = [
    {
      label: "Prepare",
      value: "dashboard",
      icon: Square3Stack3DIcon,
      desc: <FillDetails />,
    },
    {
      label: "Preview & Approve",
      value: "Preview & Approve",
      icon: UserCircleIcon,
      desc: <Summary />,
    },
    {
      label: "Settings",
      value: "settings",
      icon: Cog6ToothIcon,
      desc: <Forward />,
    },
  ];
  return (
    <Tabs value="dashboard">
      <TabsHeader
        placeholder=""
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      >
        {data.map(({ label, value, icon }) => (
          <Tab
            key={value}
            value={value}
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            <div className="flex items-center gap-2">
              {React.createElement(icon, { className: "w-5 h-5" })}
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody
        placeholder=""
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      >
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}