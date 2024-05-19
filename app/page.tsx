import { Grid } from '@/components/Grid';
import { getSession, getUserDetails } from './supabase-server';
import Link from 'next/link';
import { HowCruiseoWorks } from '@/components/how-cruiseo-works';
import { HowFaresCalculated } from '@/components/how-fares-calculated';

interface HomeProps {}

export default async function Home() {
  const session = await getSession();

  return (
    <>
      {/*
    <div>
      <div className="mt-28 flex max-w-3xl flex-col items-center justify-center p-4 sm:mt-24 md:p-10">
        <div className="pb-12 text-center md:pb-16">
          <h1
            className="leading-tighter mb-6 text-5xl font-extrabold tracking-tighter text-white md:text-6xl"
            data-aos="zoom-y-out"
          >
            <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text pr-2 text-transparent">
              Share
            </span>
            and Save
          </h1>
          <div className="mx-auto max-w-3xl">
            <p
              className="mb-8 text-xl text-zinc-400"
              data-aos="zoom-y-out"
              data-aos-delay="150"
            >
              The best way to book a trip
            </p>{' '}
          </div>
        </div>
        <Link
          href={'/login'}
          className="group mt-6 flex scale-100 items-center justify-center rounded-md bg-[#f5f7f9] px-20 py-2 text-lg font-semibold text-[#1E2B3A] no-underline transition-all duration-75 active:scale-95"
          style={{
            boxShadow: '0 1px 1px #0c192714, 0 1px 3px #0c192724'
          }}
        >
          {' '}
          Try it out
        </Link>
      </div>
      <HowCruiseoWorks />
      <HowFaresCalculated />
    </div>
    */}
    </>
  );
}
