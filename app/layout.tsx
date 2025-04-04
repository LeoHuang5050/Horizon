import { Inter } from 'next/font/google'
import './styles/globals.css'
import Web3Layout from './components/layout/Web3Layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Web3 App',
  description: 'A Web3 application built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Web3Layout>
          {children}
        </Web3Layout>
      </body>
    </html>
  )
}
