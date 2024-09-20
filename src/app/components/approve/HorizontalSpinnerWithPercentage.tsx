'use client';

import { useContext } from "react";
import { BulkSenderStateContext } from "@/app/providers";

export const HorizontalSpinnerWithPercentage = ({ text, progress }: { text: string; progress: number; }) => {
    const { isDarkMode } = useContext(BulkSenderStateContext);

    return (
        <div className="flex flex-col m-2 my-8 space-y-2">
            {/* Text Label */}
            <div className={`text-left text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {text}
            </div>

            {/* Progress Bar */}
            <div className={`relative w-full h-6 rounded-full shadow-inner ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                {/* Progress Indicator */}
                <div
                    className={`absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ease-in-out ${isDarkMode ? 'bg-gradient-to-r from-blue-600 to-blue-400' : 'bg-gradient-to-r from-blue-400 to-blue-600'}`}
                    style={{
                        width: `${progress}%`,
                    }}
                ></div>

                {/* Progress Percentage (inside bar) */}
                <div
                    className={`absolute inset-0 flex items-center justify-center text-sm font-medium transition-colors duration-500 ${progress <= 25 ? (isDarkMode ? 'text-gray-300' : 'text-gray-800') : 'text-white'}`}
                >
                    {progress}%
                </div>
            </div>
        </div>
    );
};
