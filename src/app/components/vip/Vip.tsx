'use client';

import React from "react"
import { Button, ButtonGroup } from "@material-tailwind/react"
import { useVipHelper } from "@/components/vip/useVipHelper";
import { formatEther } from "viem";
export const BuyVip = () => {
    const {vipFee, isVIP, buyVip, isLoading, isSuccess, isBuyingVip} = useVipHelper();

    return <>
        <div className="min-h-screen flex items-center justify-center">
            <div className="relative w-full max-w-3xl mx-auto p-10 bg-black rounded-lg shadow-xl">
                <h1 className="text-5xl font-bold text-white text-center mb-5 uppercase">VIP Members Lounge</h1>
                <p className="text-lg text-gray-300 text-center mb-8">
                Become a VIP Member for Only {vipFee?formatEther((vipFee as bigint)):"0"} ETH
                </p>
                <p className="text-lg text-gray-300 text-center mb-8">
                    Enjoy unlimited free transactions through x-wallet bulk sender forever!
                </p>
                <p className="text-lg text-gray-300 text-center mb-8">
                Please note: while transaction fees are waived, standard mining fees still apply.
                Need more info? Join our Telegram community for support and answers!
                </p>
                <div className="mt-10 text-center">
                    <Button onClick={()=> buyVip()} className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition duration-300">
                       {
                        (isBuyingVip  || isLoading) ? 'Loading...' : isSuccess ? 'VIP Purchased' : isVIP ? 'VIP Purchased' : `Buy VIP for ${vipFee?formatEther((vipFee as bigint)):"0"} ETH`
                       }
                    </Button>
                </div>
                <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2">
                    <svg className="w-full h-20 text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill-opacity="1" d="M0,192L120,170.7C240,149,480,107,720,112C960,117,1200,171,1320,197.3L1440,224L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
                    </svg>
                </div>
            </div>
        </div>

    </>
}