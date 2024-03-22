'use client'
import getOrderLists from "@/api/GET_OrderList";
import updateOrderStatus, { IPostOrderRequest } from "@/api/POST_Order";
import cancelOrder, { IPutCancelOrderRequest } from "@/api/PUT_CancelOrder";
import payBook, { IPutPayBookRequest } from "@/api/PUT_PayBook";
import { Card, Navbar } from "@/components";
import ORDER_STATUS from "@/constants";
import { IResponse } from "@/interfaces/IResponse";
import { RootState } from "@/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const BuyList: React.FC = () => {
  const router = useRouter()
  const accessToken = useSelector((states: RootState) => states.authReducer.accessToken)
  const refreshToken = useSelector((states: RootState) => states.authReducer.refreshToken)

  const queryClient = useQueryClient()

  const {data, isPending} = useQuery({
    queryKey: ['buy-list'],
    queryFn: () => getOrderLists({
      status: ORDER_STATUS.PENDING
    })
  })

  const updateOrderStatusToSuccessMutation = useMutation<IResponse, IResponse, IPutPayBookRequest>({
    mutationFn: payBook,
    onSuccess(data) {
      queryClient.invalidateQueries({queryKey: ['buy-list']})
      if(data?.statusCode === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: data.message
        })
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Warning',
          text: data?.message ?? 'Failed to make a payment'
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

  const updateOrderStatusToCancelMutation = useMutation<IResponse, IResponse, IPutCancelOrderRequest>({
    mutationFn: cancelOrder,
    onSuccess(data) {
      queryClient.invalidateQueries({queryKey: ['buy-list']})
      queryClient.invalidateQueries({queryKey: ['logged-in-user']})
      if(data?.statusCode === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: data.message
        })

      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Warning',
          text: data?.message ?? 'Failed to cancel your order'
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
              <h2 className="text-2xl text-slate-800">List of Buy</h2>
            </div>
         </div>
          <div className="mt-5 columns-1 lg:columns-5">  
            {!isPending && Array.isArray(data?.data) && data.data.map(item => (
              <Card 
                key={item.id}
                img={item.book.image}
                title={`${item.book.title} by ${item.book.writer}`}
                subtitle={`Price: ${item.book.price}`}
                tags={item.book.bookTag.map(tag => tag.tag.name)}
                buttonText="Cancel Now"
                onClick={updateOrderStatusToCancelMutation.mutate.bind(this, {
                  id: item.id
                })}
                disabled={updateOrderStatusToCancelMutation.isPending}
                secondButtonText="Pay Now"
                secondOnClick={updateOrderStatusToSuccessMutation.mutate.bind(this, {
                  id: item.id
                })}
                secondDisabled={updateOrderStatusToSuccessMutation.isPending}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuyList