'use client'
import { Button, Input } from "@/components";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IRegisterForm } from "./types";
import registerSchema from "@/schemas/registerSchema";
import { useMutation } from "@tanstack/react-query";
import postRegister from "@/api/POST_Register";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2'
import { IResponse } from "@/interfaces/IResponse";

const RegisterPage: React.FC = () => {
  const router = useRouter()
  const {control, handleSubmit, formState: {errors}} = useForm<IRegisterForm>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: ''
    }
  })

  const {isPending, mutate} = useMutation<IResponse, IResponse, IRegisterForm>({
    mutationFn: postRegister,
    onSuccess(data) {
      if(data?.statusCode === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: data.message
        })
        setTimeout(() => {
          router.push('/login')
        }, 500)
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Warning',
          text: data.message
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

  const handleSubmitForm: SubmitHandler<IRegisterForm> = (data) => {
    mutate(data)
  }

  return (
    <div className="h-screen bg-white md:bg-sky-600 flex items-center justify-center">
      <div className="w-[90%] md:w-[25rem] bg-white py-5 rounded-md">
        <form onSubmit={handleSubmit(handleSubmitForm)} className="container mx-auto px-5">
          <h1 className="text-slate-700 text-2xl mb-5 text-center">Create Account</h1>
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
          <label className="text-md text-slate-700 mb-1 block" htmlFor="password">Repeat Password</label>
          <Controller 
            control={control}
            name="repeatPassword"
            render={({field: {onBlur, onChange, value}}) => (
              <Input 
                className="text-sm" 
                type="password" 
                id="repeatPassword" 
                placeholder="Type your repeat password here..." 
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                errorMessage={errors?.repeatPassword?.message ?? undefined}
              />
            )}
          />
         </div>
         <div className="mb-3">
          <Button type="submit" className="text-sm" disabled={isPending}>
            Submit
          </Button>
         </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage