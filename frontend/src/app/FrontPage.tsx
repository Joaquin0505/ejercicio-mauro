'use client'
import StoreProvider, {useAppSelector} from './redux'



import React, { useEffect } from 'react'

import { Navbar } from "./(components)/Navbar"

const FrontLayout = ({children}:{children:React.ReactNode}) => {

    const isDarkMode = useAppSelector((state)=>state.global.isDarkMode);
  useEffect(()=>{
    if(isDarkMode){
      document.documentElement.classList.add("dark");
    }else{
      document.documentElement.classList.add("light");
    }
  })
   
  return (
    <div className={`${isDarkMode ? "dark" : "light" } flex bg-gray-50 text-gray-900 w-full min-h-screen`}>
            <main className={`flex flex-col w-full h-full pt-7  bg-gray-50 `}>
            <Navbar/>
            {children}
        </main>
    </div>
  )
}


export const Frontpage = ({children}:{children:React.ReactNode}) => {
  return (
    <StoreProvider>
      <FrontLayout>{children}</FrontLayout>
    </StoreProvider>

  )
}
