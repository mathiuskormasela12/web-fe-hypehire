'use client'
import { store, persitor } from "@/store"
import React, { PropsWithChildren } from "react"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

const ReduxWrapper: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persitor}>
        {children}
      </PersistGate>
    </Provider>
  )
}

export default ReduxWrapper