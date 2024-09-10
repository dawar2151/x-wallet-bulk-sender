'use server';
import React from 'react';
import { Address } from 'viem';
import { fetchErc20Transaction } from './etherscan';
import TransactionTable from './Transactions';

export const AccountTransactions = async ({accountAddress, network}:{accountAddress: Address, network: string}) => {

  const result = await fetchErc20Transaction(network, accountAddress);

  return (
    <div className="min-h-screen flex items-center justify-center mt-20">
      <TransactionTable transactions={result?.result as TransactionERC20[]} />
      </div>
  );
}