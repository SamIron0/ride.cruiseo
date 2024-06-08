import React from 'react';
import Categories from './Categories';
import Container from '../Container';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/browser-client';

export default function Navbar() {
  return (
    <div className="fixed w-full z-10 shadow-sm  shrink-0 bg-background">
      <div>
        <div className="py-4 sm:px-4 border-[#232325] border-b-[1px]">
          <Container>
            <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
              <Logo />
              <Search />
              <UserMenu/>
            </div>
          </Container>
        </div>
        <Categories />
      </div>
    </div>
  );
}
