"use client"
import { useRouter } from "next/navigation"

const Logo = () => {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push("/")}
      className="flex flex-row items-center gap-0.5  cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="75"
        zoomAndPan="magnify"
        viewBox="0 0 56.25 30.000001"
        height="40"
        preserveAspectRatio="xMidYMid meet"
        version="1.0"
      >
        <defs>
          <g />
          <clipPath id="421a46411b">
            <path
              d="M 0.542969 8 L 9 8 L 9 18 L 0.542969 18 Z M 0.542969 8 "
              clip-rule="nonzero"
            />
          </clipPath>
          <clipPath id="1b25aa52a1">
            <path
              d="M 45 8 L 54.980469 8 L 54.980469 18 L 45 18 Z M 45 8 "
              clip-rule="nonzero"
            />
          </clipPath>
        </defs>
        <g clip-path="url(#421a46411b)">
          <g fill="#ffffff" fill-opacity="1">
            <g transform="translate(1.089959, 17.331283)">
              <g>
                <path d="M 1.375 -7.078125 C -0.296875 -5.40625 -0.296875 -2.703125 1.375 -1.046875 C 3.046875 0.625 5.75 0.625 7.40625 -1.046875 L 4.390625 -4.0625 L 7.40625 -7.078125 C 5.75 -8.734375 3.046875 -8.734375 1.375 -7.078125 Z M 1.375 -7.078125 " />
              </g>
            </g>
          </g>
        </g>
        <g fill="#ffffff" fill-opacity="1">
          <g transform="translate(8.500011, 17.331283)">
            <g>
              <path d="M 4.234375 -8.109375 L 0.34375 -8.109375 C 0.34375 -1.84375 0.34375 -8.96875 0.34375 0.015625 L 7.46875 0.015625 L 6.28125 -2.21875 C 7.046875 -2.828125 7.53125 -3.75 7.53125 -4.8125 C 7.53125 -6.640625 6.0625 -8.109375 4.234375 -8.109375 Z M 4.234375 -8.109375 " />
            </g>
          </g>
        </g>
        <g fill="#ffffff" fill-opacity="1">
          <g transform="translate(16.164783, 17.331283)">
            <g>
              <path d="M 0.296875 -3.890625 C 0.296875 -1.65625 2.125 0.15625 4.359375 0.15625 C 6.59375 0.15625 8.40625 -1.65625 8.40625 -3.890625 L 8.40625 -8.125 L 0.296875 -8.125 Z M 0.296875 -3.890625 " />
            </g>
          </g>
        </g>
        <g fill="#ffffff" fill-opacity="1">
          <g transform="translate(24.871594, 17.331283)">
            <g>
              <path d="M 0.328125 -8.109375 L 0.328125 0 L 4.546875 0 L 4.546875 -8.109375 Z M 0.328125 -8.109375 " />
            </g>
          </g>
        </g>
        <g fill="#ffffff" fill-opacity="1">
          <g transform="translate(29.769173, 17.331283)">
            <g>
              <path d="M 2.078125 -8.109375 C 0.96875 -8.109375 0.0625 -7.125 0.0625 -6.09375 C 0.0625 -5.03125 0.765625 -4.328125 1.90625 -4.109375 L 1.90625 -4.03125 L 0.265625 -4.03125 L 0.265625 0.015625 L 6.296875 0.015625 C 8.640625 0.015625 9.0625 -3.421875 6.734375 -3.953125 L 6.734375 -4.03125 L 8.15625 -4.03125 L 8.15625 -8.109375 Z M 2.078125 -8.109375 " />
            </g>
          </g>
        </g>
        <g fill="#ffffff" fill-opacity="1">
          <g transform="translate(38.11706, 17.331283)">
            <g>
              <path d="M 0.328125 -8.109375 L 0.328125 -0.015625 L 7.046875 -0.015625 L 7.046875 -2.75 L 5.375 -2.75 L 5.375 -3.09375 L 7.046875 -3.09375 L 7.046875 -5.03125 L 5.375 -5.03125 L 5.375 -5.390625 L 7.046875 -5.390625 L 7.046875 -8.109375 Z M 0.328125 -8.109375 " />
            </g>
          </g>
        </g>
        <g clip-path="url(#1b25aa52a1)">
          <g fill="#ffffff" fill-opacity="1">
            <g transform="translate(45.503953, 17.331283)">
              <g>
                <path d="M 4.4375 -8.375 C 2.046875 -8.375 0.109375 -6.453125 0.109375 -4.0625 C 0.109375 -1.671875 2.046875 0.25 4.4375 0.25 C 6.8125 0.25 8.75 -1.671875 8.75 -4.0625 C 8.75 -6.453125 6.8125 -8.375 4.4375 -8.375 Z M 4.4375 -8.375 " />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}

export default Logo
