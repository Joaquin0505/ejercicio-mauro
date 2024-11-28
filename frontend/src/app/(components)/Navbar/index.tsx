'use client'

import { setIsDarkMode, setIsSidebarCollapsed } from '@/state'

import { Bell, Menu, Moon, SearchIcon, Settings, Sun, Weight } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/app/redux'
import { usePathname } from 'next/navigation'
import { useCreateProductMutation, useGetProductsQuery } from '@/state/api'

interface SiderbarLinkProps{
  href:string;  
  label:string;
  isCollapsed:boolean
}


type ProductFormData ={
  name:string;
  price: number;
  
}


const SidebarLink=({href,label,isCollapsed}:SiderbarLinkProps)=>{
  const pathname =usePathname();
  const isActive =pathname===href ||(pathname=="/" && href==="/dashboard")
  return(
      <Link href={href}>
          <div className={`cursor-pointer flex items-center 
              ${isCollapsed?"justify-center py-4 p-0": "justify-start px-8 py-1 " }
              hover:text-blue-300 hover:bg-blue-100 gap-3 transition-colors 
              ${isActive? "text-white":"text-blue-400"}` }>                  
                  <span className={`${isCollapsed? "hidden":"block"}
                  font-medium text-gray-700`}>
                      {label}
                  </span>

          </div>
      </Link>
  )
}


export const Navbar = () => {
  const[searchTerm, setSearchTerm] = useState("")
  const[isModalOpen, setIsModalOpen] = useState(false)
  
  
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCoolapsed
  )
  const isDarkMode = useAppSelector((state)=>state.global.isDarkMode)

  const toggleSidebar = ()=>{
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const toggleDarkMode = ()=>{
    dispatch(setIsDarkMode(!isDarkMode));
  };


  const {
    data: products,
    isLoading,
    isError
}=useGetProductsQuery(searchTerm);


const [createProduct]= useCreateProductMutation();
    const handlerCreateProduct = async(productData:ProductFormData)=>{
        await createProduct(productData)
    };
    if(isLoading){
        return <div className="py-4">Cargando...</div>
    }
    if(isError||!products){
        return(
            <div className="text-center text-red-500 py-4">Conexion fallida</div>
        )
    }


  const sidebarClassNames=`fixed flex flex-col ${isSidebarCollapsed?"w-0 md:w-20":"w-72 md:w-60"} bg-white transition-all 
    duration-300 overflow-hidden h-full shadow-md z-40`;
  return (
    <div className='flex justify-between items-start w-full px-7'>      
    <div className='flex flex-col md:flex-row justify-between items-center gap-5 z-10'>
    <button className=' p-3 bg-gray-100 rounded-full hover:bg-blue-100' onClick={toggleSidebar}>
            <Menu className='w-4 h-4'/>
          </button>
      <h1 className={` ${isSidebarCollapsed ? "hidden":"block"} font-extrabold text-2xl `}>Jolt</h1>
          
          <div className='flex flex-col md:flex-row items-center bg-white md:bg-transparent  md:mb-0 z-10'>
            <SidebarLink 
            href='/'            
            label='Categories'
            isCollapsed={isSidebarCollapsed}/>

            <SidebarLink
            href='/inventory'
            label='Inventario'
            isCollapsed={isSidebarCollapsed}/>

            <SidebarLink
            href='/products'
            label='Productos'
            isCollapsed={isSidebarCollapsed}/>

            <SidebarLink
            href='/users'
            label='Usuarios'
            isCollapsed={isSidebarCollapsed}/>

            <SidebarLink
            href='/settings'
            label='Configuración'
            isCollapsed={isSidebarCollapsed}/>

            <SidebarLink
            href='/expenses'
            label='Salidas'
            isCollapsed={isSidebarCollapsed}/>
            
    </div>


      </div>
      

      <div className='flex justify-between items-center gap-5 z-10'>
        <div className='hidden md:flex justify-between items-center gap-5'>
          <div>
            <button onClick={toggleDarkMode}>
              {isDarkMode ? (<Sun className='cursor-pointer text-gray-500'
              size={24}/>):<Moon className='cursor-pointer text-gray-500'
              size={24}/>            
            }
              
            </button>
          </div>

          <div className='relative z-10'>
      <div className="">
            <div className="flex items-center border-2 border-gray-200 rounded-full">
                <SearchIcon className="w-5 h-5 text-gray-500 m-2"/>
                <input type="text" className="w-full py-2 px-4  bg-white rounded-full" placeholder="Buscar producto..." value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
            </div>            
        </div>
      </div>
          
          <hr className='w-0 h-7 border border-solid border-l border-gray-300 mx-3'/>
          <div className='flex items-center gap-3 cursor-pointer'>
            <Weight/>
            <Link href="/carrito" className="hover:text-black">Chard</Link>
          </div>
        </div>
        <Link href="/admin">
          <Settings className='cursor-pointer text-gray-500' size={24}/>
        </Link>
      </div>
    </div>
  )
}
