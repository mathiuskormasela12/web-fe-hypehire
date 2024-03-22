'use client'
import getUser from "@/api/GET_User";
import { AppDispatch } from "@/store";
import { setToken } from "@/store/reducers/auth";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { useDispatch } from "react-redux";

const Navbar: React.FC = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [toggle, setToggle] = useState(false)

  const {data} = useQuery({
    queryKey: ['logged-in-user'],
    queryFn: getUser
  })

  const handleToggle = useCallback(() => {
    setToggle((toggle) => !toggle)
  }, [setToggle])

  const handleLogout = (): void => {
    dispatch(setToken({
      accessToken: '',
      refreshToken: ''
    }))
    router.push('/login')
  }

  return (
    <nav className="w-full bg-sky-700 fixed top-0">
      <div className="container mx-auto flex">
        <div className="flex"> 
          <Link className="p-4" href={'/'}>HypeHire</Link>
        </div>
        <ul className="hidden md:flex flex-col md:flex-row flex-1">
          <li className="p-4">
            <Link href={'/'}>
              Home
            </Link>
          </li>
          <li className="p-4">
            <Link href={'/buy-list'}>
              List of Buy
            </Link>
          </li>
          <li className="p-4">
            <Link href={'/purchased-book'}>
              Purchased Book
            </Link>
          </li>
          <li className="p-4" onClick={handleLogout}>
            Logout
          </li>
          <li className="p-4">
            Your Point: {data?.data?.point ? data.data.point : 0}
          </li>
        </ul>
        <div className="flex md:hidden flex-1 items-center justify-end"> 
          <CiMenuBurger onClick={handleToggle} color="white" className="text-lg mr-5" />
        </div>
      </div>
      {toggle && (
        <div className="container mx-auto flex md:hidden">
          <ul className="md:flex flex-col md:flex-row flex-1">
            <li className="p-4">
              <Link href={'/'}>
                Home
              </Link>
            </li>
            <li className="p-4">
              <Link href={'/buy-list'}>
                Buy List
              </Link>
            </li>
            <li className="p-4">
              <Link href={'/order-list'}>
                Ongoing Order
              </Link>
            </li>
            <li className="p-4" onClick={handleLogout}>
              Logout
            </li>
            <li className="p-4">
              Your Point: {data?.data?.point ? data.data.point : 0}
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar