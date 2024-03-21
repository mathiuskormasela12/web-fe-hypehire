'use client'
import { dehydrate, QueryClient, QueryClientProvider, HydrationBoundary } from "@tanstack/react-query"
import React, { PropsWithChildren } from "react"


const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2000
    }
  }
})

const dehydratedState = dehydrate(client);

const TanstackQuery: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <QueryClientProvider client={client}>
      <HydrationBoundary state={dehydratedState}>
        {children}
      </HydrationBoundary>
    </QueryClientProvider>
  )
}

export default TanstackQuery