import { getSession } from "@/app/supabase-server";
import AuthUI from "./AuthUI";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function SignIn() {
  const session = await getSession();
  if (session) {
    return redirect("/");
  }
  return (
    <div className="flex justify-center height-screen-helper">
      <div className="flex text-black flex-col mt-20 justify-between max-w-lg p-3 m-auto w-80 ">
        <Link
          className="text-black text-2xl font-medium flex flex-row flex-nowrap items-center justify-center gap-x-1.5 pr-1.5 leading-none rounded-lg"
          href="/"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-car-front">
            <path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8" /><path d="M7 14h.01" /><path d="M17 14h.01" /><rect width="18" height="8" x="3" y="10" rx="2" /><path d="M5 18v2" /><path d="M19 18v2" /></svg>
          <span text->cruiseo</span>
        </Link>
        <AuthUI />
      </div>
    </div>
  );
}
