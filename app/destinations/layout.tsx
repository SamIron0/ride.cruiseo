import { ReactNode } from "react";

interface ListingsLayoutProps {
  children: ReactNode;
}

export default function ListingsLayout({ children }: ListingsLayoutProps) {
  
  return <>{children}</>;
}
