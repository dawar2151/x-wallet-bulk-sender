
'use client';
import { NextPage } from 'next';

import { AccountTransactions } from '@/app/components/history/AccountTransactions';
import { WrapperAccountTransactions } from '@/app/components/history/WrapperAccountTransactions';
import AnimatedPage from '@/app/utils/AnimatedPage';
const VIP: NextPage =  () => {

  return (
    <AnimatedPage>
    <WrapperAccountTransactions AccountTransactions={AccountTransactions} />
    </AnimatedPage>

  );
};

export default VIP;