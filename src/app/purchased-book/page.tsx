'use client'
import getOrderLists from "@/api/GET_OrderList";
import { Card, Navbar } from "@/components";
import ORDER_STATUS from "@/constants";
import { RootState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const PurchasedBook: React.FC = () => {
  const router = useRouter()
  const accessToken = useSelector((states: RootState) => states.authReducer.accessToken)
  const refreshToken = useSelector((states: RootState) => states.authReducer.refreshToken)

  useEffect(() => {
    if(!refreshToken || !accessToken || accessToken === '' || refreshToken === '') {
      router.push('/login')
    }
  }, [accessToken, refreshToken, router])

  const {data, isPending} = useQuery({
    queryKey: ['purchased-book'],
    queryFn: () => getOrderLists({
      status: ORDER_STATUS.SUCCESS
    })
  })

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="pt-20 py-10">
        <div className="container mx-auto">
         <div className="flex items-center">
            <div className="grow-[8]">
              <h2 className="text-2xl text-slate-800">Purchased Book</h2>
            </div>
         </div>
          <div className="mt-5 columns-1 lg:columns-5">  
            {!isPending && Array.isArray(data?.data) && data.data.map(item => (
              <Card 
                key={item.id}
                img={item.book.image}
                title={`${item.book.title} by ${item.book.writer}`}
                subtitle={`Price: $${item.book.price}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PurchasedBook