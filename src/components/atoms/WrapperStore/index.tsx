'use client'
import store from "@/store"
import { Provider } from "jotai"
import React, { PropsWithChildren } from "react"

const WrapperStore: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

export default WrapperStore