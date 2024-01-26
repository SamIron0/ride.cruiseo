'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CiUser } from 'react-icons/ci';

const Logo = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push('/')}
      className="flex flex-row items-center gap-0.5 text-lg cursor-pointer"
    >
      <span> cruiseo</span>
    </div>
  );
};

export default Logo;
