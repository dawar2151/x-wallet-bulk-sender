
import React from 'react';
import { Address } from 'viem';
import { fetchErc20Transaction } from './etherscan';
import TransactionTable from './Transactions';
import { useAccount } from 'wagmi';

export const WrapperAccountTransactions =  ({AccountTransactions}:{AccountTransactions: any}) => {

  // const { address, chainId } = useAccount();
  // if (!address) return null;

  return (
    <>
    <AccountTransactions accountAddress={"0xa0BfF9CA8aF0649eB056cA1a902b559Da97FFde9"} network={"sepolia"} />
    </>
  );
}