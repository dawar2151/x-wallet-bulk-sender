'use client';
import { NextPage } from 'next';

import fs from 'fs';
import AnimatedPage from '@/app/utils/AnimatedPage';
const Home: NextPage = () => {
 
  return (
    <AnimatedPage>

    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Video Section */}
        <div className="flex flex-col justify-center min-h-[600px]">
          <div className="h-full">
            <iframe
              className="w-full h-full rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/pCcQoCV8laU"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Tutorial Notes Section */}
        <div className="flex flex-col justify-center bg-gray-50 p-5 rounded-lg shadow-inner h-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Tutorial Notes</h2>
          <p className="text-gray-700 mb-4">
            Follow along with this tutorial to learn how to bulk send your tokens. I
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>How to import csv receivers and amount</li>
            <li>Approve to contracts to safe transfer tokens</li>
            <li>Proceeds the transfers</li>
            <li>Check transfers details on Etherscan and Transaction history page</li>
          </ul>
        </div>

      </div>
    </div>
    </AnimatedPage>

  );
};

export default Home;