'use client'
import { Button, Input } from "@/components";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IRegisterForm } from "./types";
import registerSchema from "@/schemas/registerSchema";

const RegisterPage: React.FC = () => {
  const {control, handleSubmit, formState: {errors}} = useForm<IRegisterForm>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: ''
    }
  })

  const handleSubmitForm: SubmitHandler<IRegisterForm> = (data) => {
    console.info(data)
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
          <Button type="submit" className="text-sm">
            Submit
          </Button>
         </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage