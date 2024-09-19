
'use client'
import { NextPage } from 'next';

import { FillDetails } from '@/app/components/preparing/FillDetails';
import { Button } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';
import { HorizontalSpinnerWithPercentage } from '@/app/components/approve/Summary';
import AnimatedPage from '@/app/utils/AnimatedPage';
import { useApproveHelper } from '@/app/components/approve/useApproveHelper';
const Preparing: NextPage = () => {
    const router = useRouter();
    const { isAllowed } = useApproveHelper();
    const manageApprove = () => {
        if (isAllowed) {
            router.push('/bulksender/confirm');
        } else {
            router.push('/bulksender/approve');
        }
    }
    return (
        <AnimatedPage>
            <div className="w-full py-4 px-8">
                <div className="mt-5">
                    <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
                        <HorizontalSpinnerWithPercentage text='Prepare' progress={25} />
                        <FillDetails />
                        <div className="flex space-x-4 mt-4">
                            <Button onClick={() => { router.push('/bulksender/preparing') }}>Back</Button>
                            <Button onClick={() => manageApprove()}>Next</Button>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedPage>

    );
};

export default Preparing;