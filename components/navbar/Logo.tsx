'use client';
import { useRouter } from 'next/navigation';

const Logo = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push('/')}
      className="flex flex-row items-center gap-0.5  cursor-pointer"
    >
      <span className="text-lg font-semibold"> cruiseo</span>
    </div>
  );
};

export default Logo;
