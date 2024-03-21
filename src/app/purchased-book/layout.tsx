import { Metadata } from "next";
import React, { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: 'HypeHire Purchased Book',
  description: 'HypeHire'
}

const RootLayout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <>
      {children}
    </>
  )
}

export default RootLayout