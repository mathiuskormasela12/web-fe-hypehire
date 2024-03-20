import Link from "next/link";
import React, { useCallback, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";

const Navbar: React.FC = () => {
  const [toggle, setToggle] = useState(false)

  const handleToggle = useCallback(() => {
    setToggle((toggle) => !toggle)
  }, [setToggle])

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
              Buy List
            </Link>
          </li>
          <li className="p-4">
            <Link href={'/order-list'}>
              Ongoing Order
            </Link>
          </li>
          <li className="p-4">
            Logout
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
            <li className="p-4">
              Logout
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar