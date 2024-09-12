
import { NextPage } from 'next';

import TransactionTable from '@/app/components/history/Transactions';
import { useAccount } from 'wagmi';
import { fetchErc20Transaction } from '@/app/components/history/etherscan';
import { AccountTransactions } from '@/app/components/history/AccountTransactions';
import { WrapperAccountTransactions } from '@/app/components/history/WrapperAccountTransactions';
import { FillDetails } from '@/app/components/preparing/FillDetails';
const Preparing: NextPage = () => {

    return (
        <div className="w-full py-4 px-8">
            <div className="mt-20">
                <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
                    <FillDetails />
                </div>
            </div>
        </div>
    );
};

export default Preparing;