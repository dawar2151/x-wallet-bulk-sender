
import { NextPage } from 'next';
import { Forward } from '@/app/components/confirm/Forward';

const Confirm: NextPage = () => {

    return (
        <div className="w-full py-4 px-8">
            <div className="mt-20">
                <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
                    <Forward />
                </div>
            </div>
        </div>
    );
};

export default Confirm;