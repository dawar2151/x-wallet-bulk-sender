'use client';

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog, DialogPanel } from '@headlessui/react'
import { useState } from 'react'
import { ConnectBtn } from '@/components/connection/connectButton';
import { IconButton } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';
import BlockchainGraph from '../utils/BackRight';
import MovingGraph from '../utils/BackRight';
import MovingLeft from '../utils/BackRight';
const Icon = () => {
  return (
    <div className="">
      <i className="fab fa-github text-lg" />
    </div>)
};

const navigation = [
  { name: 'VIP', href: '/bulksender/vip', current: true },
  { name: 'Tutorial', href: '/bulksender/tutorial', current: false },
  { name: 'Transactions history', href: '/bulksender/history', current: false },
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter();

  return (
    <div>
      <header className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-4 shadow-lg">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="text-2xl font-bold flex items-center">
            <span className="mr-2 text-3xl text-white">💸</span> {/* Optional Logo/Icon */}
            <a href='#' onClick={() => router.push("/bulksender/preparing")} className="-m-1.5 p-1.5">
              <span>bulk sender</span>
              <span className="ml-1 text-blue-200">x-wallet</span>
            </a>
          </div>
          <nav className="hidden md:flex space-x-6">
            {navigation.map((item) => (
              <a key={item.name} href="#" onClick={() => router.push(item.href)} className="hover:text-blue-200 transition duration-200">
                {item.icon ? <item.icon /> : item.name}
              </a>
            ))}
          </nav>

          <ConnectBtn />


          {/* GitHub Icon Link */}
          <a
            href="https://github.com"
            className="text-white hover:text-gray-200 transition duration-200"
            aria-label="GitHub"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12 1.293c-5.867 0-10.667 4.8-10.667 10.707 0 4.736 3.074 8.742 7.332 10.15.533.1.733-.2.733-.533V19.86c-2.8.607-3.4-1.293-3.4-1.293-.467-1.2-1.2-1.533-1.2-1.533-.933-.6.067-.533.067-.533 1 .066 1.6 1.066 1.6 1.066.933 1.666 2.533 1.2 3.2.933.067-.666.267-1.2.533-1.533-2.4-.267-4.933-1.2-4.933-5.333 0-1.2.4-2.133 1.067-2.8-.2-.267-.467-1.333.067-2.667 0 0 .867-.267 2.867 1.066.8-.2 1.6-.267 2.533-.267.933 0 1.733.067 2.533.267 2-1.4 2.867-1.066 2.867-1.066.533 1.333.267 2.4.067 2.667.667.667 1.067 1.6 1.067 2.8 0 4.133-2.533 5.066-4.933 5.333.267.267.533.8.533 1.533v2.667c0 .267.267.667.733.533 4.267-1.4 7.333-5.467 7.333-10.2C22.667 6.093 17.867 1.293 12 1.293z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </nav>
      </header>

      {children}
      <MovingGraph />

    </div>
  );
}
