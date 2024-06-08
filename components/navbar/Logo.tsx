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
        width="110"
        zoomAndPan="magnify"
        viewBox="0 0 82.5 30.000001"
        height="40"
        preserveAspectRatio="xMidYMid meet"
        version="1.0"
      >
        <defs>
          <g />
          <clipPath id="1b89b08f2d">
            <path
              d="M 1.089844 7 L 13 7 L 13 21 L 1.089844 21 Z M 1.089844 7 "
              clip-rule="nonzero"
            />
          </clipPath>
          <clipPath id="1eba71a914">
            <path
              d="M 67 7 L 80.925781 7 L 80.925781 21 L 67 21 Z M 67 7 "
              clip-rule="nonzero"
            />
          </clipPath>
        </defs>
        <g clip-path="url(#1b89b08f2d)">
          <g fill="#ffffff" fill-opacity="1">
            <g transform="translate(1.623328, 20.032225)">
              <g>
                <path d="M 2.03125 -10.4375 C -0.421875 -7.984375 -0.421875 -4 2.03125 -1.53125 C 4.5 0.921875 8.484375 0.921875 10.9375 -1.53125 L 6.484375 -6 L 10.9375 -10.4375 C 8.484375 -12.90625 4.5 -12.90625 2.03125 -10.4375 Z M 2.03125 -10.4375 " />
              </g>
            </g>
          </g>
        </g>
        <g fill="#ffffff" fill-opacity="1">
          <g transform="translate(12.565194, 20.032225)">
            <g>
              <path d="M 6.25 -11.96875 L 0.515625 -11.96875 C 0.515625 -2.71875 0.515625 -13.25 0.515625 0.015625 L 11.03125 0.015625 L 9.265625 -3.28125 C 10.40625 -4.171875 11.125 -5.53125 11.125 -7.09375 C 11.125 -9.796875 8.9375 -11.96875 6.25 -11.96875 Z M 6.25 -11.96875 " />
            </g>
          </g>
        </g>
        <g fill="#ffffff" fill-opacity="1">
          <g transform="translate(23.883186, 20.032225)">
            <g>
              <path d="M 0.4375 -5.75 C 0.4375 -2.4375 3.125 0.234375 6.421875 0.234375 C 9.71875 0.234375 12.40625 -2.4375 12.40625 -5.75 L 12.40625 -12 L 0.4375 -12 Z M 0.4375 -5.75 " />
            </g>
          </g>
        </g>
        <g fill="#ffffff" fill-opacity="1">
          <g transform="translate(36.739878, 20.032225)">
            <g>
              <path d="M 0.5 -11.96875 L 0.5 0 L 6.71875 0 L 6.71875 -11.96875 Z M 0.5 -11.96875 " />
            </g>
          </g>
        </g>
        <g fill="#ffffff" fill-opacity="1">
          <g transform="translate(43.971766, 20.032225)">
            <g>
              <path d="M 3.0625 -11.96875 C 1.421875 -11.96875 0.078125 -10.53125 0.078125 -8.984375 C 0.078125 -7.4375 1.125 -6.390625 2.796875 -6.0625 L 2.796875 -5.953125 L 0.390625 -5.953125 L 0.390625 0.015625 L 9.296875 0.015625 C 12.75 0.015625 13.390625 -5.0625 9.953125 -5.828125 L 9.953125 -5.953125 L 12.03125 -5.953125 L 12.03125 -11.96875 Z M 3.0625 -11.96875 " />
            </g>
          </g>
        </g>
        <g fill="#ffffff" fill-opacity="1">
          <g transform="translate(56.298461, 20.032225)">
            <g>
              <path d="M 0.5 -11.984375 L 0.5 -0.015625 L 10.40625 -0.015625 L 10.40625 -4.046875 L 7.9375 -4.046875 L 7.9375 -4.5625 L 10.40625 -4.5625 L 10.40625 -7.4375 L 7.9375 -7.4375 L 7.9375 -7.953125 L 10.40625 -7.953125 L 10.40625 -11.984375 Z M 0.5 -11.984375 " />
            </g>
          </g>
        </g>
        <g clip-path="url(#1eba71a914)">
          <g fill="#ffffff" fill-opacity="1">
            <g transform="translate(67.206131, 20.032225)">
              <g>
                <path d="M 6.546875 -12.375 C 3.03125 -12.375 0.171875 -9.515625 0.171875 -6 C 0.171875 -2.484375 3.03125 0.375 6.546875 0.375 C 10.0625 0.375 12.921875 -2.484375 12.921875 -6 C 12.921875 -9.515625 10.0625 -12.375 6.546875 -12.375 Z M 6.546875 -12.375 " />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}

export default Logo
