
'use client'
import { NextPage } from 'next';
import { Forward } from '@/app/components/confirm/Forward';
import { HorizontalSpinnerWithPercentage } from "@/app/components/approve/HorizontalSpinnerWithPercentage";
import { Button } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';
import { useApproveHelper } from '@/app/components/approve/useApproveHelper';
import { useTransferHelper } from '@/app/components/confirm/useTransferHelper';
import AnimatedPage from '@/app/utils/AnimatedPage';
import { XButton } from '@/app/utils/XButton';

const Confirm: NextPage = () => {
    const router = useRouter();
    return (
        <AnimatedPage>

        <div className="w-full py-4 px-8">
            <div className="mt-20">
                <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
                <HorizontalSpinnerWithPercentage text='Confirm' progress={75} />
                    <Forward />
                    <div className="flex space-x-4 mt-4">
                <XButton   action={() => router.push('/bulksender/approve')} caption="Back" />
                <XButton   action={()=>router.push('/bulksender/send')} caption="Next" />
            </div>
                </div>
            </div>
        </div>
        </AnimatedPage>

    );
};

export default Confirm;