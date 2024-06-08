import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mx-auto w-full border-t border-input max-w-[1920px] px-6 bg-black">
      <div className="grid grid-cols-1 gap-8 py-6 text-white transition-colors duration-150 border-b lg:grid-cols-6 border-input bg-black">
        <div className="col-span-1 lg:mt-3 lg:pr-2 lg:col-span-2">
          <Link
            href="/"
            className="flex items-center flex-initial font-bold md:mr-24"
          >
            <span className="mr-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-car-front"
              >
                <path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8" />
                <path d="M7 14h.01" />
                <path d="M17 14h.01" />
                <rect width="18" height="8" x="3" y="10" rx="2" />
                <path d="M5 18v2" />
                <path d="M19 18v2" />
              </svg>
            </span>
            <span>cruiseo</span>
          </Link>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <ul className="flex flex-col flex-initial md:flex-1">
            <li className="py-1 md:py-0 md:pb-4">
              <Link
                href="/"
                className="text-white transition duration-150 ease-in-out hover:text-zinc-200"
              >
                Home
              </Link>
            </li>
            <li className="py-1 md:py-0 md:pb-4">
              <Link
                href="/contactus"
                className="text-white transition duration-150 ease-in-out hover:text-zinc-200"
              >
                Contact Us
              </Link>
            </li>
              <li className="py-1 md:py-0 md:pb-4">
              <Link
                href="/passengercancellationpolicy"
                className="text-white transition duration-150 ease-in-out hover:text-zinc-200"
              >
                Cancellation Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between py-6 md:flex-row bg-black">
        <div className="text-white">
          <span>
            &copy; {new Date().getFullYear()} cruiseo. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
