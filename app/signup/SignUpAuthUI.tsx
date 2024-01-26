'use client';

import { useState } from 'react';
import { useSupabase } from '@/app/supabase-provider';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Turnstile } from '@marsidev/react-turnstile';
import { signIn } from 'next-auth/react';
import Input from '@/components/Input';


export default function AuthUI() {
  {
    const { supabase } = useSupabase();
    const [captchaToken, setCaptchaToken] = useState();

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async (data: any) => {
      setIsLoading(true);

      try {
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: { captchaToken }
        });
        if (error) {
          toast.error(error.message);
        } else {
          toast.success(
            'Account created. Please check your email for verification.'
          );
          router.refresh();
        }
      } catch (error) {
        toast.error('An error occurred during login.');
      } finally {
        setIsLoading(false);
      }
    };
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    return (
      <section className="bg-black">
        <div className="max-w-6xl text-white mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pb-20">
            {/* Page header */}
            <div className="max-w-xl mx-auto text-center pb-12 md:pb-20">
              <h1 className="text-white font-semibold text-2xl">
                Welcome, sign up to begin creating.
              </h1>
            </div>

            {/* Form */}
            <div className="max-w-sm mx-auto">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSubmit({ email, password });
                }}
              >
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-white text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Name
                    </label>

                    <input
                      placeholder="Enter your name"
                      className="w-full text-white px-4 py-2 focus:outline-none bg-[#232325] border-[1px] border-zinc-600 text-md rounded-md "
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-white text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Email
                    </label>

                    <input
                      placeholder="Enter your email"
                      className="w-full text-white px-4 py-2 focus:outline-none bg-[#232325] border-[1px] border-zinc-600 text-md rounded-md "
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <div className="flex justify-between">
                      <label
                        className="block text-white text-sm font-medium mb-1"
                        htmlFor="password"
                      >
                        Password
                      </label>
                    </div>

                    <input
                      placeholder="Enter your password"
                      className="w-full text-white py-2 px-4 focus:outline-none bg-[#232325] border-[1px] border-zinc-600 text-md rounded-md "
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mt-6">
                  <div className="w-full px-3">
                    <button
                      type="submit"
                      className="btn px-0 py-2 flex justify-center rounded-lg text-white bg-blue-600 hover:bg-blue-700 w-full relative  items-center"
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              </form>
              <div className="text-zinc-400 text-center mt-6 pb-6">
                Already using Fitpal?{' '}
                <Link
                  href="/signin"
                  className="text-blue-600 pb-2hover:underline transition duration-150 ease-in-out"
                >
                  Sign in
                </Link>
              </div>
              <div className="flex justify-center items-center pt-3 ">
                <Turnstile
                  siteKey={process.env.TURNSTILE_SITE_KEY || ''}
                  onSuccess={(token: any) => {
                    setCaptchaToken(token);
                  }}
                />
              </div>{' '}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
