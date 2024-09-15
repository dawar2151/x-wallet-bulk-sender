
'use client'
import { NextPage } from 'next';
import { Forward } from '@/app/components/confirm/Forward';
import { HorizontalSpinnerWithPercentage } from '@/app/components/approve/Summary';
import { Button } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';
import { useApproveHelper } from '@/app/components/approve/useApproveHelper';
import { useTransferHelper } from '@/app/components/confirm/useTransferHelper';
import AnimatedPage from '@/app/utils/AnimatedPage';

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
                <Button   onClick={() => {router.push('/bulksender/approve')}}>Back</Button>
                <Button   onClick={()=>router.push('/bulksender/send')}>Next</Button>
            </div>
                </div>
            </div>
        </div>
        </AnimatedPage>

    );
};

export default Confirm;