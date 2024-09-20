
'use client'

import { NextPage } from 'next';


import { Summary } from '@/app/components/approve/Summary';
import { HorizontalSpinnerWithPercentage } from "@/app/components/approve/HorizontalSpinnerWithPercentage";
import { Button } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';
import { useApproveHelper } from '@/app/components/approve/useApproveHelper';
import { useContext, useState } from 'react';
import { Approving } from '@/app/components/execute-approve/Approving';

import { motion, AnimatePresence } from 'framer-motion';
import AnimatedPage from '@/app/utils/AnimatedPage';
import { BulkSenderStateContext } from '@/app/providers';

const Approve: NextPage = () => {
    const router = useRouter();
    const {isAllowed} = useApproveHelper();
    const manageApprove = ()    => {
        console.log(isAllowed);
        if(isAllowed){
            router.push('/bulksender/confirm');
        }else{
            router.push('/bulksender/execute-approve');
        }
    }    
    return (
        <AnimatedPage>
        <div className="w-full py-4 px-10">
            <div className="mt-20">
                <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
                <HorizontalSpinnerWithPercentage text='Approve' progress={50} />
                       <Summary />
                        <div className="flex space-x-4 mt-4">
                    <Button   onClick={() => {router.push('/bulksender/preparing')}}>Back</Button>
                    <Button   onClick={() => manageApprove()}>Next</Button>
                </div>
                    
                   
                </div>
            </div>
           
        </div>
        </AnimatedPage>
    );
};

export default Approve;

