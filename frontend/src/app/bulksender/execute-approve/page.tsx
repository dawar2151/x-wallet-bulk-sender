'use client'
import { HorizontalSpinnerWithPercentage } from '@/app/components/approve/Summary';
import { Approving } from '@/app/components/execute-approve/Approving';
import { Sending } from '@/app/components/send/Sending';
import AnimatedPage from '@/app/utils/AnimatedPage';
import { Button } from '@material-tailwind/react';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';

const ExecuteApprove: NextPage = () => {
    const router = useRouter();
    return (
        <AnimatedPage>

        <div className="w-full py-4 px-8">
            <div className="mt-20">
                <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
                <HorizontalSpinnerWithPercentage text='Approving' progress={90} />
                <Approving />
                <div className="flex space-x-4 mt-4">
                <Button   onClick={() => {router.push('/bulksender/approve')}}>Back</Button>
            </div>
                </div>
            </div>
        </div>
        </AnimatedPage>

    );
};

export default ExecuteApprove;