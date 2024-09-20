'use client'

import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';

export default function Home() {

  const router = useRouter();

  const goToHome = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push("/bulksender/preparing");
  };

  return (
    <div className="relative isolate overflow-hidden px-6 pt-14 lg:px-8">
      {/* Background Blob */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            backgroundImage: 'linear-gradient(to top right, #ff80b5, #9089fc)',
          }}
          className="relative left-1/2 aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72rem] animate-pulse"
        />
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl py-10 sm:py-48 lg:py-32">
        {/* Announcement Banner */}
        <div className="hidden sm:mb-6 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 transition-all duration-200">
            X-Wallet bulk sender.{' '}
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-all">
              <span aria-hidden="true" className="absolute inset-0" />
              Read more <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>

        {/* Heading and Subtext */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            Bulk Send your Tokens.
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Bulk Send your ERC20 Token, NFTs, Native Tokens, and more.
          </p>

          {/* CTA Button */}
          <a
            href="#"
            onClick={(e) => goToHome(e)}
            className="inline-block mt-8 rounded-md bg-indigo-600 px-5 py-3 text-lg font-semibold text-white shadow-lg hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-300"
          >
            Get started
          </a>
        </div>
      </div>
    </div>
  );
}
