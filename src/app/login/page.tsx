'use client'
import { Button, Input } from "@/components";
import loginSchema from "@/schemas/loginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ILoginForm } from "./types";
import { useMutation } from "@tanstack/react-query";
import postLogin from "@/api/Post_Login";
import { IResponse, IResponseWithParams } from "@/interfaces/IResponse";
import IToken from "@/interfaces/IToken";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { setToken } from "@/store/reducers/auth";

const LoginPage: React.FC = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const {control, handleSubmit, formState: {errors}} = useForm<ILoginForm>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const {isPending, mutate} = useMutation<IResponseWithParams<IToken>, IResponse, ILoginForm>({
    mutationFn: postLogin,
    onSuccess(data) {
      if(data?.statusCode === 200 && data?.data?.accessToken && data?.data?.refreshToken) {
        dispatch(setToken({
          accessToken: data?.data?.accessToken ?? '',
          refreshToken: data?.data?.refreshToken ?? ''
        }))
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Login Successfuly'
        })
        setTimeout(() => {
          router.push('/')
        }, 500)
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Warning',
          text: data?.message ?? 'Failed to login'
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

  const handleSubmitForm: SubmitHandler<ILoginForm> = (data) => {
    mutate(data)
  }

  return (
    <div className="h-screen bg-white md:bg-sky-600 flex items-center justify-center">
      <div className="w-[90%] md:w-[25rem] bg-white py-5 rounded-md">
        <form onSubmit={handleSubmit(handleSubmitForm)} className="container mx-auto px-5">
          <h1 className="text-slate-700 text-2xl mb-5 text-center">Login Account</h1>
         <div className="mb-3">
          <label className="text-md text-slate-700 mb-1 block" htmlFor="email">Email</label>
          <Controller 
            control={control}
            name="email"
            render={({field: {onBlur, onChange, value}}) => (
              <Input 
                className="text-sm" 
                type="email" 
                id="email" 
                placeholder="Type your email here..." 
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                errorMessage={errors?.email?.message ?? undefined}
              />
            )}
          />
          
         </div>
         <div className="mb-3">
          <label className="text-md text-slate-700 mb-1 block" htmlFor="password">Password</label>
          <Controller 
            control={control}
            name="password"
            render={({field: {onBlur, onChange, value}}) => (
              <Input 
                className="text-sm" 
                type="password" 
                id="password" 
                placeholder="Type your password here..." 
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                errorMessage={errors?.password?.message ?? undefined}
              />
            )}
          />
         </div>
         <div className="mb-3">
          <Button type="submit" className="text-sm" disabled={isPending}>
            Login
          </Button>
         </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage