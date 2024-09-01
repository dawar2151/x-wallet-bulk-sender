"use client";

import React, { useState, useEffect, useRef, useContext } from 'react';
import { BulkSenderStateContext } from '../providers';
import { isAddress } from 'viem';

export function NumberedTextarea() {
  const { setBulkSenderState, bulkSenderState } = useContext(BulkSenderStateContext);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
  
    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const receiversAccounts = event.target.value.split('\n').map((line) => {
          const [address, amount] = line.replace('\r', '').split(',');
          return {
            address,
            amount,
          };
        }).filter(({ address, amount }) => isAddress(address) && amount);
      const totalAmount = receiversAccounts.reduce((acc, { amount }) => acc + Number(amount), 0);
      setBulkSenderState(
        {
        ...bulkSenderState,
        stringReceivers: event.target.value,
        receivers: receiversAccounts,
        totalAmount: totalAmount,  
        }  
      )
    };
  
    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }, [bulkSenderState.stringReceivers]);
  
    const lineNumbers = bulkSenderState?.stringReceivers?.split('\n').map((_, i) => i + 1).join('\n');
    return (
      <div className="flex">
        {/* Line numbers */}
        <textarea
          value={lineNumbers}
          className="bg-gray-100 text-gray-500 text-right p-2 border-r border-gray-300 resize-none outline-none"
          style={{
            width: '2.5rem',
            fontFamily: 'monospace',
            lineHeight: '1.5rem',
            overflow: 'hidden',
          }}
          disabled
        />
        {/* Text input */}
        <textarea
          ref={textareaRef}
          value={bulkSenderState.stringReceivers}
          onChange={handleInputChange}
          className="w-full p-2 outline-none resize-none"
          style={{
            fontFamily: 'monospace',
            lineHeight: '1.5rem',
            minHeight: '150px',
          }}
        />
      </div>
    );
  };
  