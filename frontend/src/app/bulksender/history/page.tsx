
'use client'
import { NextPage } from 'next';

import TransactionTable from '@/app/components/history/Transactions';
import { useAccount } from 'wagmi';
import { fetchErc20Transaction } from '@/app/components/history/etherscan';
import { AccountTransactions } from '@/app/components/history/AccountTransactions';
import { WrapperAccountTransactions } from '@/app/components/history/WrapperAccountTransactions';
const VIP: NextPage =  () => {

  return (
    <WrapperAccountTransactions AccountTransactions={AccountTransactions} />
  );
};

export default VIP;