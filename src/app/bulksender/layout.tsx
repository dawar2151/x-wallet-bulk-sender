'use client';

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog, DialogPanel } from '@headlessui/react';
import { useContext, useState } from 'react';
import { ConnectBtn } from '@/components/connection/connectButton';
import { useRouter } from 'next/navigation';
import MovingGraph from '../utils/BackRight';
import { BulkSenderStateContext } from '../providers';
import Link from 'next/link';

const navigation = [
  { name: 'VIP', href: '/bulksender/vip', current: true },
  { name: 'Tutorial', href: '/bulksender/tutorial', current: false },
  { name: 'Transactions history', href: '/bulksender/history', current: false },
  { name: 'Approval Management', href: '/bulksender/approval', current: false },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { isDarkMode, toggleTheme } = useContext(BulkSenderStateContext);

  return (
    <div className={`${isDarkMode ? 'bg-gray-900':''} min-h-screen transition-colors duration-300`}>
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-gray-900 dark:to-gray-700 text-white shadow-lg p-4">
        <nav aria-label="Global" className="flex items-center justify-between lg:px-8">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <img className="h-10 w-auto rounded-xl object-cover object-center mr-2" src="/ahoo.png" alt="Logo" />
            <Link
              href="#"
              onClick={() => router.push('/bulksender/preparing')}
              className="text-2xl font-bold"
            >
              BULK Sender
            </Link>
          </div>

          {/* Desktop NAV */}
          <div className="hidden md:flex space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href="#"
                onClick={() => router.push(item.href)}
                className="hover:text-blue-200 dark:hover:text-gray-300 transition duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Connect Button & Theme Toggle */}
          <div className="flex items-center space-x-4">
            <ConnectBtn />
            <button
              onClick={toggleTheme}
              className="text-white hover:text-gray-200 transition duration-200"
            >
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white hover:text-blue-600"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </nav>

        {/* Mobile NAV */}
        <Dialog
          as="div"
          className="md:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-50">
            <DialogPanel className="relative z-10 bg-white dark:bg-gray-900 p-6">
              <div className="flex items-center justify-between">
                <Link href="#" onClick={() => router.push('/bulksender/preparing')} className="text-2xl font-bold text-blue-600 dark:text-white">
                  BULK Sender
                </Link>
                <button
                  type="button"
                  className="rounded-md p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href="#"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      router.push(item.href);
                    }}
                    className="block text-lg font-semibold text-blue-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 rounded-lg"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="https://github.com/dawar2151/x-wallet-bulksender-smart-contracts"
                  target="_blank"
                  className="block text-lg font-semibold text-blue-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 rounded-lg"
                >
                  GitHub
                </Link>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </header>

      {/* Main Content */}
      <main>
        {children}        
      </main>
    </div>
  );
}
