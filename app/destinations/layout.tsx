'use client';
import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ListingsLayoutProps {
  children: ReactNode;
}

export default function ListingsLayout({ children }: ListingsLayoutProps) {
  const router = useRouter();

  return <>{children}</>;
}
