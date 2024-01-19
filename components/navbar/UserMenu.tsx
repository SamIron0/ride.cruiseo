'use client';

import MenuItem from './MenuItem';
import { useSupabase } from '@/app/supabase-provider';
import { UserDetails } from '@/types';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineMenu } from 'react-icons/ai';
import { CiUser } from 'react-icons/ci';
import { TbUserFilled } from 'react-icons/tb';

interface UserMenuProps {
  user?: User | null;
}

export default function UserMenu({ user }: UserMenuProps) {
  const { supabase } = useSupabase();
  const router = useRouter();
  // get session from api
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Signed Out');
        router.refresh();
      }
    } catch (error) {
      toast.error('An error occurred during signout.');
    }
  };
  useEffect(() => {
    async function getSession() {
      try {
        const url = '/api/session';
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        };
        const response = await fetch(url, options);
        const sess = await response.json();
        //console.log('session is: ', sess);
      } catch (error) {
        console.error('An error occurred while fetching session.');
      }
    }
    getSession();
  });

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => ({})}
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          How it works
        </div>
        <div
          onClick={toggleOpen}
          className="
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <TbUserFilled />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {user ? (
              <>
                <MenuItem
                  label="My trips"
                  onClick={() => router.push('/trips')}
                />
                <MenuItem
                  label="My favorites"
                  onClick={() => router.push('/favorites')}
                />
                <MenuItem
                  label="My reservations"
                  onClick={() => router.push('/reservations')}
                />
                <MenuItem
                  label="My properties"
                  onClick={() => router.push('/properties')}
                />
                <MenuItem
                  label="How it works"
                  onClick={() => router.push('/')}
                />
                <hr />
                <MenuItem label="Logout" onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem
                  label="Login"
                  onClick={() => router.push('/signin')}
                />
                <MenuItem
                  label="Sign up"
                  onClick={() => router.push('/signup')}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
