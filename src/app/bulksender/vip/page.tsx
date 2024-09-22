'use client';
import { NextPage } from 'next';

import { BuyVip } from '@/app/components/vip/Vip';
import AnimatedPage from '@/app/utils/AnimatedPage';

const VIP: NextPage = () => {
  return (
    <AnimatedPage>
    <BuyVip />
    </AnimatedPage>

  );
};

export default VIP;