'use client';

import React from "react"
import { Button } from "@material-tailwind/react"
export const BuyVip = () => {
    return <>
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="relative w-full max-w-3xl mx-auto p-10 bg-black rounded-lg shadow-xl">
                <h1 className="text-5xl font-bold text-white text-center mb-5 uppercase">VIP Members Lounge</h1>
                <p className="text-lg text-gray-300 text-center mb-8">
                    Welcome to the exclusive members-only lounge. Enjoy premium content and services tailored just for you.
                </p>
                <div className="mt-10 text-center">
                    <button className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition duration-300">
                        Click to Join
                    </button>
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