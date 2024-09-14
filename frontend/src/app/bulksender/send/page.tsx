'use client'
import { HorizontalSpinnerWithPercentage } from '@/app/components/approve/Summary';
import { Sending } from '@/app/components/send/Sending';
import { Button } from '@material-tailwind/react';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';

const Send: NextPage = () => {
    const router = useRouter();

    return (
        <div className="w-full py-4 px-8">
            <div className="mt-20">
                <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
                <HorizontalSpinnerWithPercentage text='Send' progress={100} />
                <Sending />
                <div className="flex space-x-4 mt-4">
                <Button   onClick={() => {router.push('/bulksender/confirm')}}>Back</Button>
            </div>
                </div>
            </div>
        </div>
    );
};

export default Send;