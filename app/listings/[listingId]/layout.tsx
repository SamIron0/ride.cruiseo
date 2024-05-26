import { ReactNode } from "react"
import "./globals.css"

interface RootLayoutProps {
  children: ReactNode
  
}
export default async function RootLayout({ children }: RootLayoutProps) {
  return <div> {children}</div>
}
