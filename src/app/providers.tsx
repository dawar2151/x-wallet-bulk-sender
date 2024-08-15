"use client";

import '@rainbow-me/rainbowkit/styles.css';

import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { config } from "@/lib/config";
import { createContext, useState } from 'react';
import { BulkSenderState, initialBulkSenderState } from './types/BulkSenderState';

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  const BulkSenderState = createContext({
    bulkSenderState: initialBulkSenderState,
    setBulkSenderState: (state: BulkSenderState) => { },
  });
  const [bulkSenderState, setBulkSenderState] = useState<BulkSenderState>(initialBulkSenderState);
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#0E76FD",
            accentColorForeground: "white",
            borderRadius: "large",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          <BulkSenderState.Provider value={{ bulkSenderState, setBulkSenderState }}>
            {children}
          </BulkSenderState.Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}