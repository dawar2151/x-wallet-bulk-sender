"use client";

import '@rainbow-me/rainbowkit/styles.css';

import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, lightTheme, darkTheme, Theme } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { config } from "@/lib/config";
import { createContext, useEffect, useState } from 'react';
import { BulkSenderState, initialBulkSenderState } from '@/app/types/BulkSenderState';
import { ThemeProvider } from '@material-tailwind/react';

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};
export const BulkSenderStateContext = createContext({
  bulkSenderState: initialBulkSenderState,
  setBulkSenderState: (state: BulkSenderState) => { },
  toggleTheme: () => { },
  theme: lightTheme() as Theme,
  isDarkMode: false,
});
export  default function Providers({ children }: Props) {
  
  const [bulkSenderState, setBulkSenderState] = useState<BulkSenderState>(initialBulkSenderState);
  const [theme, setTheme] = useState<Theme>(lightTheme());

  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle between dark and light mode
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setIsDarkMode(storedTheme === 'dark');
      setTheme(storedTheme === 'dark' ? darkTheme() : lightTheme());
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
      <RainbowKitProvider
      theme={isDarkMode ? darkTheme() : lightTheme()} coolMode
        >
          <BulkSenderStateContext.Provider value={{ isDarkMode, theme,toggleTheme, bulkSenderState, setBulkSenderState }}>
          <ThemeProvider>
            {children}
            </ThemeProvider>
          </BulkSenderStateContext.Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}