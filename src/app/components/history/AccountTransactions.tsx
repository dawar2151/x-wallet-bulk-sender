'use client';
import React, { useEffect } from 'react';
import { Address } from 'viem';
import { fetchErc20Transaction, TransactionERC20 } from './etherscan';
import TransactionTable from './Transactions';
import { Spinner } from '@material-tailwind/react';

export const AccountTransactions = ({accountAddress, network}:{accountAddress: Address, network: number}) => {
  const [transactions, setTransactions] = React.useState<TransactionERC20[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetchErc20Transaction(network, accountAddress);
      if(response?.result === undefined) 
        return;
      setTransactions([...response?.result]);
      setLoading(false);
    };
    fetchTransactions();
  }, [accountAddress, network]);
  return (
    <div className="flex items-center justify-center mt-20">
      {loading && <Spinner className="h-16 w-16 text-gray-900/50" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}} />}
      {!loading && <TransactionTable transactions={transactions} />}
      </div>
  );
}