"use client";

import React, { useState, useEffect, useRef, useContext } from 'react';
import { BulkSenderStateContext } from '../providers';

export function NumberedTextarea() {
    const [text, setText] = useState('');
    const textareaRef = useRef(null);
    const { setBulkSenderState, bulkSenderState } = useContext(BulkSenderStateContext);
  
    const handleInputChange = (event: unknown) => {
      setBulkSenderState({
        ...bulkSenderState,
        stringReceivers: event.target.value,
        receivers: event.target.value.split('\n').map((line) => {
          const [address, amount] = line.split(',');
          return {
            address,
            amount,
          };
        }),
      });
    };
  
    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }, [text]);
  
    const lineNumbers = bulkSenderState?.stringReceivers?.split('\n').map((_, i) => i + 1).join('\n');
    console.log(lineNumbers);
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
  