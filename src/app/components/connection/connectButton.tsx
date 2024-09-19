"use client";

import { useEffect, useRef } from "react";
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";

export const ConnectBtn: React.FC = () => {
  const { isConnecting, address, isConnected, chain } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const { disconnect } = useDisconnect();

  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  if (!isConnected) {
    return (
      <button
        className="btn"
        onClick={async () => {
          // Disconnecting wallet first because sometimes when is connected but the user is not connected
          if (isConnected) {
            disconnect();
          }
          openConnectModal?.();
        }}
        disabled={isConnecting}
      >
        {isConnecting ? 'Connecting...' : 'Connect your wallet'}
      </button>
    );
  }

  if (isConnected && !chain) {
    return (
      <button className="btn" onClick={openChainModal}>
        Wrong network
      </button>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <a
        href="#"
        onClick={openChainModal}
        className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-full shadow hover:bg-blue-100 transition"
      >
        Switch Networks
      </a>
      <a href="#" onClick={async () => openAccountModal?.()} className="bg-gray-900 text-gray-200 px-3 py-1 rounded-full shadow-sm text-sm">
        {address?.slice(0, 6)}...{address?.slice(-4)} ({chain?.name})<span aria-hidden="true">→</span>
      </a>
    </div>
  );
};
