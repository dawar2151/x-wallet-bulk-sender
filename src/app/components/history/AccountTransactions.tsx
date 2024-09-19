'use client';
import React, { useEffect } from 'react';
import { Address } from 'viem';
import { fetchErc20Transaction } from './etherscan';
import TransactionTable from './Transactions';

export const AccountTransactions = ({accountAddress, network}:{accountAddress: Address, network: number}) => {
  const [transactions, setTransactions] = React.useState<TransactionERC20[]>([]);
  useEffect(() => {
    const fetchTransactions = async () => {
      const result = await fetchErc20Transaction(network, accountAddress);
      setTransactions(result?.result);
    };
    fetchTransactions();
  }, [accountAddress, network]);
  return (
    <div className="min-h-screen flex items-center justify-center mt-20">
      <TransactionTable transactions={transactions} />
      </div>
  );
}