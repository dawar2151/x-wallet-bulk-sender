'use client';

import React, { useState, useContext } from 'react';
import { TransactionERC20 } from './etherscan';
import { formatEther } from 'viem';
import { BulkSenderStateContext } from "@/app/providers";

const TransactionTable = ({ transactions }: { readonly transactions: TransactionERC20[] }) => {
  const [expandedRows, setExpandedRows] = useState<{ [key: number]: boolean }>({});
  const { isDarkMode } = useContext(BulkSenderStateContext);

  const toggleRowExpansion = (index: number) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className={`py-10 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-left">Transactions</h1>

        <div className="overflow-x-auto">
          <table className={`min-w-full rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <thead>
              <tr className={`${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'} uppercase text-sm leading-normal`}>
                <th className="py-3 px-6 text-left">Block #</th>
                <th className="py-3 px-6 text-left">From</th>
                <th className="py-3 px-6 text-left">To</th>
                <th className="py-3 px-6 text-left">Value (ETH)</th>
                <th className="py-3 px-6 text-left">Gas Used</th>
                <th className="py-3 px-6 text-center">Expand</th>
              </tr>
            </thead>
            <tbody className={`text-sm font-light ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {transactions && transactions.map((transaction, index) => (
                <React.Fragment key={index}>
                  <tr className={`${isDarkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-100'}`}>
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {transaction.blockNumber}
                    </td>
                    <td className="py-3 px-6 text-left">{transaction.from}</td>
                    <td className="py-3 px-6 text-left">{transaction.to}</td>
                    <td className="py-3 px-6 text-left">
                      {formatEther(BigInt(transaction.value))}
                    </td>
                    <td className="py-3 px-6 text-left">{transaction.gasUsed}</td>
                    <td className="py-3 px-6 text-center">
                      <button
                        onClick={() => toggleRowExpansion(index)}
                        className="text-blue-500 hover:underline"
                      >
                        {expandedRows[index] ? 'Collapse' : 'Expand'}
                      </button>
                    </td>
                  </tr>

                  {expandedRows[index] && (
                    <tr className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <td colSpan={7} className="py-3 px-6">
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <p><strong>Nonce:</strong> {transaction.nonce}</p>
                            <p><strong>Block Hash:</strong> {transaction.blockHash}</p>
                            <p><strong>Transaction Hash:</strong> {transaction.hash}</p>
                            <p><strong>Transaction Index:</strong> {transaction.transactionIndex}</p>
                            <p><strong>Gas Price:</strong> {transaction.gasPrice}</p>
                            <p><strong>Confirmations:</strong> {transaction.confirmations}</p>
                          </div>
                          <div>
                            <p><strong>Method ID:</strong> {transaction.methodId}</p>
                            <p><strong>Function Name:</strong> {transaction.functionName}</p>
                            <p><strong>Token Name:</strong> {transaction.tokenName}</p>
                            <p><strong>Token Symbol:</strong> {transaction.tokenSymbol}</p>
                            <p><strong>Contract Address:</strong> {transaction.contractAddress || 'N/A'}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
