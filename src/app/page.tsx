'use client'
import { Card, Input, Navbar } from "@/components";
import React, { useCallback, useState } from "react";

const BookList: React.FC = () => {
  const [keyword, setKeyword] = useState('')

  const handleSearch = useCallback((e: any) => {
    setKeyword(() => e.target.value)
  }, [setKeyword])


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
            {[...Array(9)].map((__item, index) => (
              <Card 
                key={index.toString()}
                img={"https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg"}
                title="Boruto: Naruto The Next Generation by Masashi"
                subtitle={`Price: ${100}`}
                tags={['Fight', 'Fight', 'Fight', 'Fight']}
                buttonText="Order Now"
                onClick={() => {}}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookList