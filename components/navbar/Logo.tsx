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
          <clipPath id="ca90701140">
            <path
              d="M 0.542969 9 L 9 9 L 9 20 L 0.542969 20 Z M 0.542969 9 "
              clip-rule="nonzero"
            />
          </clipPath>
          <clipPath id="db3c998a64">
            <path
              d="M 45 10 L 54.980469 10 L 54.980469 19 L 45 19 Z M 45 10 "
              clip-rule="nonzero"
            />
          </clipPath>
        </defs>
        <g clip-path="url(#ca90701140)">
          <g fill="#ffffff" fill-opacity="1">
            <g transform="translate(1.071913, 18.499175)">
              <g>
                <path d="M 1.375 -7.078125 C -0.296875 -5.421875 -0.296875 -2.71875 1.375 -1.046875 C 3.046875 0.625 5.75 0.625 7.421875 -1.046875 L 4.390625 -4.0625 L 7.421875 -7.078125 C 5.75 -8.75 3.046875 -8.75 1.375 -7.078125 Z M 1.375 -7.078125 " />
              </g>
            </g>
          </g>
        </g>
        <g fill="#ffffff" fill-opacity="1">
          <g transform="translate(8.486978, 18.499175)">
            <g>
              <path d="M 4.25 -8.109375 L 0.34375 -8.109375 C 0.34375 -1.84375 0.34375 -8.984375 0.34375 0.015625 L 7.484375 0.015625 L 6.28125 -2.21875 C 7.0625 -2.828125 7.546875 -3.75 7.546875 -4.8125 C 7.546875 -6.640625 6.0625 -8.109375 4.25 -8.109375 Z M 4.25 -8.109375 " />
            </g>
          </g>
        </g>
        <g fill="#ffffff" fill-opacity="1">
          <g transform="translate(16.156937, 18.499175)">
            <g>
              <path d="M 0.296875 -3.890625 C 0.296875 -1.65625 2.125 0.15625 4.359375 0.15625 C 6.59375 0.15625 8.421875 -1.65625 8.421875 -3.890625 L 8.421875 -8.140625 L 0.296875 -8.140625 Z M 0.296875 -3.890625 " />
            </g>
          </g>
        </g>
        <g fill="#ffffff" fill-opacity="1">
          <g transform="translate(24.869638, 18.499175)">
            <g>
              <path d="M 0.34375 -8.109375 L 0.34375 0 L 4.5625 0 L 4.5625 -8.109375 Z M 0.34375 -8.109375 " />
            </g>
          </g>
        </g>
        <g fill="#ffffff" fill-opacity="1">
          <g transform="translate(29.770531, 18.499175)">
            <g>
              <path d="M 2.078125 -8.109375 C 0.96875 -8.109375 0.0625 -7.140625 0.0625 -6.09375 C 0.0625 -5.046875 0.765625 -4.34375 1.90625 -4.109375 L 1.90625 -4.03125 L 0.265625 -4.03125 L 0.265625 0.015625 L 6.3125 0.015625 C 8.65625 0.015625 9.078125 -3.4375 6.75 -3.953125 L 6.75 -4.03125 L 8.15625 -4.03125 L 8.15625 -8.109375 Z M 2.078125 -8.109375 " />
            </g>
          </g>
        </g>
        <g fill="#ffffff" fill-opacity="1">
          <g transform="translate(38.124066, 18.499175)">
            <g>
              <path d="M 0.34375 -8.125 L 0.34375 -0.015625 L 7.0625 -0.015625 L 7.0625 -2.75 L 5.375 -2.75 L 5.375 -3.09375 L 7.0625 -3.09375 L 7.0625 -5.046875 L 5.375 -5.046875 L 5.375 -5.390625 L 7.0625 -5.390625 L 7.0625 -8.125 Z M 0.34375 -8.125 " />
            </g>
          </g>
        </g>
        <g clip-path="url(#db3c998a64)">
          <g fill="#ffffff" fill-opacity="1">
            <g transform="translate(45.515957, 18.499175)">
              <g>
                <path d="M 4.4375 -8.390625 C 2.046875 -8.390625 0.109375 -6.453125 0.109375 -4.0625 C 0.109375 -1.6875 2.046875 0.25 4.4375 0.25 C 6.828125 0.25 8.765625 -1.6875 8.765625 -4.0625 C 8.765625 -6.453125 6.828125 -8.390625 4.4375 -8.390625 Z M 4.4375 -8.390625 " />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}

export default Logo
