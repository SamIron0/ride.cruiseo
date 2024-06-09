import Link from "next/link"

export default function Footer() {
  return (
    <footer className="mx-auto w-full border-t border-input max-w-[1920px] px-6 bg-background">
      <div className="grid grid-cols-1 gap-8 py-6 text-white transition-colors duration-150 border-b lg:grid-cols-6 border-input bg-black">
        <div className="col-span-1 lg:mt-3 lg:pr-2 lg:col-span-2">
          <Link
            href="/"
            className="flex items-center flex-initial font-bold md:mr-24"
          >
            <span className="mr-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="25"
                zoomAndPan="magnify"
                viewBox="0 0 375 187.499995"
                preserveAspectRatio="xMidYMid meet"
                version="1.0"
              >
                <defs>
                  <clipPath id="a8a9e70608">
                    <path
                      d="M 2 11 L 373 11 L 373 176 L 2 176 Z M 2 11 "
                      clip-rule="nonzero"
                    />
                  </clipPath>
                  <clipPath id="119e63adc9">
                    <path
                      d="M 187.5 -137.160156 L 418.109375 93.449219 L 187.5 324.058594 L -43.109375 93.449219 Z M 187.5 -137.160156 "
                      clip-rule="nonzero"
                    />
                  </clipPath>
                  <clipPath id="4dd370a28c">
                    <path
                      d="M 187.5 -137.160156 L 418.109375 93.449219 L 187.5 324.058594 L -43.109375 93.449219 Z M 187.5 -137.160156 "
                      clip-rule="nonzero"
                    />
                  </clipPath>
                </defs>
                <g clip-path="url(#a8a9e70608)">
                  <g clip-path="url(#119e63adc9)">
                    <g clip-path="url(#4dd370a28c)">
                      <path
                        fill="#ffffff"
                        d="M 290.40625 175.785156 L 208.097656 175.773438 C 162.644531 175.785156 125.785156 138.929688 125.800781 93.476562 C 125.785156 86.328125 127.007812 79.507812 128.699219 72.902344 L 166.949219 72.902344 C 168.773438 72.894531 170.421875 73.492188 172.113281 73.945312 C 168.914062 79.785156 166.949219 86.371094 166.949219 93.476562 C 166.941406 116.171875 185.417969 134.625 208.097656 134.625 L 290.394531 134.625 C 313.097656 134.625 331.558594 116.167969 331.550781 93.46875 C 331.554688 70.785156 313.097656 52.328125 290.402344 52.320312 L 261.117188 52.332031 C 253.871094 35.835938 242.316406 21.800781 228.039062 11.171875 L 290.402344 11.171875 C 335.859375 11.179688 372.703125 48.019531 372.710938 93.480469 C 372.703125 138.929688 335.855469 175.78125 290.40625 175.785156 Z M 113.929688 134.632812 L 84.636719 134.636719 C 61.953125 134.632812 43.488281 116.167969 43.480469 93.484375 C 43.488281 70.785156 61.945312 52.328125 84.644531 52.320312 L 166.949219 52.328125 C 189.652344 52.328125 208.101562 70.777344 208.097656 93.476562 C 208.097656 100.566406 206.128906 107.152344 202.953125 113 C 204.65625 113.453125 206.277344 114.050781 208.097656 114.050781 L 246.339844 114.058594 C 248.058594 107.449219 249.253906 100.628906 249.246094 93.476562 C 249.25 48.03125 212.394531 11.171875 166.941406 11.171875 L 84.644531 11.171875 C 39.183594 11.179688 2.339844 48.023438 2.332031 93.484375 C 2.339844 138.929688 39.191406 175.78125 84.636719 175.789062 L 147.011719 175.789062 C 132.71875 165.160156 121.175781 151.113281 113.929688 134.632812 Z M 113.929688 134.632812 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                </g>
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
  )
}
