import { Metadata } from "next";
import { Inter } from "next/font/google";
import React, { PropsWithChildren } from "react";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'HypeHire Register',
  description: 'HypeHire'
}

const RootLayout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}

export default RootLayout