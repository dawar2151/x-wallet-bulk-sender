
'use client'

import { NextPage } from 'next';


import { HorizontalSpinnerWithPercentage, Summary } from '@/app/components/approve/Summary';
import { Button } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';


const Approve: NextPage = () => {
    const router = useRouter();
    return (
        <div className="w-full py-4 px-8">
            <div className="mt-20">
                <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
                <HorizontalSpinnerWithPercentage text='Approve' progress={50} />
                    <Summary />
                    <div className="flex space-x-4 mt-4">
                <Button   onClick={() => {router.push('/bulksender/preparing')}}>Back</Button>
                <Button   onClick={() => {router.push('/bulksender/execute-approve')}}>Next</Button>
            </div>
                </div>
            </div>
           
        </div>
    );
};

export default Approve;

