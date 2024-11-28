
import { useGetDashboardMetricsQuery } from '@/state/api'

import { ShoppingBag } from 'lucide-react'
import React from 'react';
import { Rating } from '../(components)/Rating';



export const CardPopularProducts = () => {
    const {data: dashboardMetrics, isLoading} = useGetDashboardMetricsQuery();
  return (
    <div className='row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl pb-16'>
        {isLoading? (
            <div className='m-5'>Cargando...</div>
        ):(
            <>
            <h3 className='text-lg font-semibold px-7 pt-5 pb-2'>
                Productos populares
            </h3>
            <hr />
            <div className='overflow-auto h-full'>
                {dashboardMetrics?.popularProducts.map((product)=>(
                    <div key={product.productId} className='flex items-center justify-between gap-3 px-5 py-7 border-b'>
                        <div className='flex items-center gap-3'>
                            <img src='https://images.pexels.com/photos/1042143/pexels-photo-1042143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' width={48} height={48} className='rounded-lg w-14 h-14'/>
                            <div className='flex flex-col justify-between gap-1'>
                                <div className='font-bold text-gray-700'>
                                    {product.name}
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>
                ))}
            </div>
            </>
        )

        }
    </div>
  )
}
