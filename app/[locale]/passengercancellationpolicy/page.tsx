import Container from "@/components/Container"
import Logo from "@/components/navbar/Logo"
import UserMenu from "@/components/navbar/UserMenu"

export default function PassengerCancellationPolicy() {
  return (
    <div>
      <div className="fixed w-full z-10 shadow-sm  shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
        <div className="py-4 sm:px-4 border-[#232325] border-b-[1px]">
          <Container>
            <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
              <Logo />
              <UserMenu />
            </div>
          </Container>
        </div>
      </div>
      <div className="max-w-2xl mx-auto p-6 my-32">
        <h1 className="text-2xl font-bold mb-4">
          Passenger Cancellation Policy
        </h1>
        <p>
          If you are a passenger and need to cancel a booking, the following
          policies apply:
        </p>

        <h2 className="text-xl font-semibold mt-6">
          Withdrawing a Booking Request or When it Expires
        </h2>
        <ul className="list-disc list-inside mt-2">
          <li>You receive a full refund (100%).</li>
          <li>The booking fee is also refunded.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">
          Cancelling a Booking Less than 24 Hours Before Departure
        </h2>
        <ul className="list-disc list-inside mt-2">
          <li>You receive a 50% refund (excluding the booking fee).</li>
          <li>The driver is compensated with 50% of the seat price.</li>
          <li>
            An automatic "late cancellation" review will be added to your
            profile.
          </li>
        </ul>
        <p className="mt-2">
          Note: If the driver cancels the trip afterwards, you will get the
          remaining 50% refunded (excluding the booking fee).
        </p>

        <h2 className="text-xl font-semibold mt-6">
          Cancelling a Booking More than 24 Hours Before Departure
        </h2>
        <ul className="list-disc list-inside mt-2">
          <li>You receive a full refund (excluding the booking fee).</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">No Show</h2>
        <ul className="list-disc list-inside mt-2">
          <li>
            No refund will be provided. Please refer to our passenger no-show
            policy.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">
          When the Driver Cancels Your Trip
        </h2>
        <ul className="list-disc list-inside mt-2">
          <li>You will receive a full refund, including the booking fee.</li>
        </ul>
      </div>
    </div>
  )
}
