'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CiUser } from 'react-icons/ci';

const Logo = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push('/')}
      className="hidden md:block cursor-pointer"
    >
      <span className="w-[100px]"> cruiseo</span> 
    </div>
  );
};

export default Logo;
