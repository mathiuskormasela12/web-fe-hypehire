'use client'
import getBooks from "@/api/GET_Books";
import updateOrderStatus, { IPostOrderRequest } from "@/api/POST_Order";
import { Card, Input, Navbar } from "@/components";
import ORDER_STATUS from "@/constants";
import { IResponse } from "@/interfaces/IResponse";
import { RootState } from "@/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const BookList: React.FC = () => {
  const router = useRouter()
  const accessToken = useSelector((states: RootState) => states.authReducer.accessToken)
  const refreshToken = useSelector((states: RootState) => states.authReducer.refreshToken)
  const [keyword, setKeyword] = useState('')

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(() => e.target.value)
  }, [setKeyword])

  const client = useQueryClient()

  const {data, isPending} = useQuery({
    queryKey: ['books', { keyword }],
    queryFn: () => getBooks({keyword})
  })

  const updateOrderStatusrMutation = useMutation<IResponse, IResponse, IPostOrderRequest>({
    mutationFn: updateOrderStatus,
    onSuccess(data) {
      client.invalidateQueries({queryKey: ['logged-in-user']})
      if(data?.statusCode === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Order Successfuly'
        })
        setTimeout(() => {
          router.push('/')
        }, 500)
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Warning',
          text: data?.message ?? 'Failed to make an order'
        })
      }
    },
    onError(error) {
      if(error?.errors?.[0]) {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: error.errors[0]
        })
      } else if(error?.message) {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: error.message
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: error.message
        })
      }
    },
  })

  useEffect(() => {
    if(!refreshToken || !accessToken || accessToken === '' || refreshToken === '') {
      router.push('/login')
    }
  }, [accessToken, refreshToken, router])


  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="pt-20 py-10">
        <div className="container mx-auto">
         <div className="flex items-center">
            <div className="grow-[8]">
              <h2 className="text-2xl text-slate-800">Books</h2>
            </div>
            <div className="grow-[1] hidden md:block">
              <Input type="search" value={keyword} onChange={handleSearch} placeholder="Book name..." />
            </div>
         </div>
          <div className="mt-5 columns-1 lg:columns-5">  
           {!isPending && Array.isArray(data?.data) && (
            data.data.map(item => (
              <Card 
                key={item.id.toString()}
                img={item.image}
                title={`${item.title} by ${item.writer}`}
                subtitle={`Price: ${item.price}`}
                tags={item.bookTag.map(tag => tag.tag.name)}
                buttonText="Order Now"
                disabled={updateOrderStatusrMutation.isPending}
                onClick={updateOrderStatusrMutation.mutate.bind(this, {
                  bookId: item.id,
                  status: ORDER_STATUS.PENDING
                })}
              />
            ))
           )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookList