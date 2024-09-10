'use client';

import React from 'react';
import { Address } from 'viem';
import { fetchErc20Transaction } from './etherscan';
import TransactionTable from './Transactions';
import { useAccount } from 'wagmi';

export const WrapperAccountTransactions =  ({AccountTransactions}:{AccountTransactions: React.Component}) => {

  const { address, chainId } = useAccount();
  if (!address) return null;

  return (
    <AccountTransactions accountAddress={address} network={"sepolia"} />
  );
}