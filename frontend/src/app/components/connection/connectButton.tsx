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
    <div>
      <a
        href="#"
        onClick={openChainModal}
        className="rounded-md px-3.5 py-2.5 text-sm font-semibold  shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Switch Networks
      </a>
      <a href="#" onClick={async () => openAccountModal?.()} className="text-sm font-semibold leading-6 text-gray-900">
        {address?.slice(0, 6)}...{address?.slice(-4)} <span aria-hidden="true">→</span>
      </a>
      <span>{chain?.name}</span>
    </div>
  );
};
