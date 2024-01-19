'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CiUser } from 'react-icons/ci';

const Logo = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push('/')}
      className="sƒm:hidden md:block flex flex-row items-center gap-1 cursor-pointer"
    >
      <span> cruiseo</span>
      <Image src="/logo.png" alt="logo" width={35} height={35} />
    </div>
  );
};

export default Logo;
