'use client'

import { useGetProductsQuery, useCreateProductMutation } from "@/state/api"
import { Header } from "../(components)/Header"

import { useState } from "react"
import { PlusCircleIcon, SearchIcon, Weight } from "lucide-react"

import { CreateProductModal } from "../products/CreateProductModal"

import { FaXTwitter } from "react-icons/fa6"



type ProductFormData ={
    name:string;
    price: number;
    
}



export const Landpage = () => {

  const[searchTerm, setSearchTerm] = useState("")
  const[isModalOpen, setIsModalOpen] = useState(false)
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

  // Obtener solo el primer producto
  const product = products[0];

  // Función para agregar el producto al carrito
  const handleAddToCart = (product: any) => {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Producto agregado al carrito.");
  };

  return (
    <>
    <div className="flex flex-col bg-white m-0">
    <div>
      <div className="flex-col h-[160px] sm:h-[250px] md:h-[680px]  lg:h-[690px] xl:h-[690px]">
      <div className="flex">
        <img src="/esqui.png" alt="" className="absolute top-0 w-full  md:max-h-[730px] bg-opacity-90 opacity-90"/>
        <div className="relative flex items-center text-center justify-center w-full h-full content-center ">
        <p className="font-semibold md:text-8xl -top-40 text-4xl absolute z-10 md:top-40 lg:top-56 text-white">Jolt Sport Project</p>
        <p className="absolute -top-24 px-4 md:text-xl md:top-72 font-medium lg:top-[320px] lg:px-24 xl:px-96 text-white">Introducing our latest collection designed sepecifically outdoor enthusiasts. Features a range of high-perfomance outwear with a range of bold and vibrant colors and patterns to choose from.</p>
        <button  className="absolute items-center py-2 px-4 rounded-lg bg-white text-gray font-bold md:top-96 lg:top-[400px]">
          Shop Now
        </button>
        </div>
      </div>
      </div>
    </div>
    <div>

    <div className="flex flex-col items-center mt-5 w-full justify-center">
        <h1 className="font-semibold text-4xl text-gray-900 z-10 pb-5">New Arrivals</h1>

        <div className="mx-auto pb-5 w-full px-5">
        <div className="mb-6">
            <div className="flex items-center border-2 border-gray-200 rounded-full">
                <SearchIcon className="w-5 h-5 text-gray-500 m-2"/>
                <input type="text" className="w-full py-2 px-4 rounded bg-white" placeholder="Buscar producto..." value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
            </div>
        </div>
        <div className="flex justify-between items-center mb-6">
            <Header name="Productos"/>
            <button className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold px-4 py-2 rounded" onClick={()=>setIsModalOpen(true)}>
                <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200"/>
                Crear Producto
            </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-between">
            {isLoading?(
                <div>
                    Cargando...
                </div>
            ):(
                products?.map((product)=>(
                    <div key={product.productId} className="border shadow rounded-3xl  max-w-full w-full mx-auto">
                        <div className="flex flex-col items-center">
                            <img src="https://www.lomas.pe/cdn/shop/files/IMG_0934.jpg?v=1700067606&width=3840" alt="" className="mb-3 rounded-t-3xl w-full h-full"/>
                            <div className="flex justify-between items-center w-full px-4">
                                <div>
                                    <h3 className="text-lg text-gray-700 font-medium">
                                        {product.name}
                                    </h3>                            
                                    <p className="text-gray-900 pb-3 text-lg font-semibold">
                                        ${product.price.toFixed(2)}
                                    </p>                                                    
                                </div>
                                <div>
                                <button 
                                    onClick={() => handleAddToCart(product)}  className="cursor-pointer"                                
                                >
                                    <Weight/>            
                                </button>
                                    
                                </div>
                            </div>                       
                        </div>
                    </div>
                ))
            )}
        </div>
        <CreateProductModal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)} onCreate={handlerCreateProduct}/>
        </div>


    </div>

    <div className="flex w-full h-full px-5 py-20">
        <img src="/image.png" alt="" className="w-full rounded-2xl"/>
        <div className="pl-9 w-[650px]">
            <h1 className="font-semibold text-5xl">Find Your Perfect Look at Jolt's Stylish New on Tokyo</h1>
            <p className="text-lg pt-6 w-[320px] pb-12">Welcome to the newest Jolt outlet in Shibuya, Japan! Step into our stylish and trendy store and discover the lastest in fashion and apparel. Come and experience the unique and vibrant atmosphere.</p>
            <p className="text-2xl font-semibold">Come and Enjoy Sale!</p>
            <p className="font-semibold text-8xl pt-5 pb-5">50%</p>
            <button className="bg-gray-900 text-gray-50 py-2 px-4 rounded-full">See On Maps</button>
        </div>
    </div>

    <div className="flex flex-col h-full px-7 py-14">
        <h1 className="text-3xl font-semibold text-center mb-3">Featured Collections</h1>
        <p className=" text-center pb-14">Dare to mix and match! Check as collections to level up tour fashion</p>
        <div className="grid grid-cols-3 grid-rows-3 items-centers justify-center gap-4">
        <img src="https://images.pexels.com/photos/179909/pexels-photo-179909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="row-start-1 row-end-1 col-start-1 col-end-1 rounded-xl mr-4"/>
        <img src="https://oneill.pe/cdn/shop/files/Disenosintitulo_2_6084bdd4-929f-406e-aeef-c2cdb089885a.png?v=1706050541&width=1200" alt="" className="col-start-2 col-end-2 row-start-1 row-span-2 rounded-xl mr-4 h-full w-full"/>
        <img src="https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="rounded-xl col-start-3 col-end-3 row-start-1 row-end-1 mr-4"/>
        <img src="https://images.pexels.com/photos/7047619/pexels-photo-7047619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="row-start-2 row-span-3 col-start-1 col-end-1 rounded-xl mr-4 h-full"/>
        <img src="https://images.pexels.com/photos/634538/pexels-photo-634538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="row-start-3 row-end-3 col-start-2 col-end-2 rounded-xl mr-4 h-full w-full justify-end content-end items-end mt-4"/>
        <img src="https://images.pexels.com/photos/52518/jeans-pants-blue-shop-52518.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="row-start-2 row-span-3 col-start-3 col-end-3 rounded-xl mr-4 h-full w-full justify-end content-end items-end"/>
        </div>
    </div>


    <footer>
        <div className=" w-full">

            <div className="w-full bg-gray-700">
            <div className="absolute flex w-full items-center text-center justify-center content-center z-10 ">
                        <h1 className="absolute text-gray-50 top-16 text-4xl">Sign Up Our Newsletter</h1>
                        <p className="absolute text-gray-50 top-32 ">Get the Latest Beauty Secrets and Trends, Sign Up for. Our Newsletter and Stay Informed About All Things Beauty</p>
                        <div className="flex gap-3 absolute top-44">
                            <input type="text" placeholder="Your Email" className="py-2 pl-3 pr-8 rounded-full bg-transparent border border-gray-100"/>
                            <button className="bg-gray-50 text-gray-900 px-8 py-2 rounded-full font-medium">Submit</button>
                        </div>                                                
                    </div> 
                <img src="https://images.pexels.com/photos/18351621/pexels-photo-18351621/free-photo-of-nieve-nevar-montanas-naturaleza.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="bg-transparent w-full opacity-15 h-72"/>

            </div>


            <div className="bg-gray-900 py-7 px-8 w-full">
                <div className="flex gap-10 w-full content-center  justify-center">
                    <div className="flex flex-col w-[550px] text-gray-100 mr-7">
                        <h1 className="text-4xl font-bold pb-5">Jolt</h1>                    
                    <p>
                        Experience the Greate Outdoors in Style with Jolt's. Shop now and gear up for adventure in Jolt  
                    </p>
                    </div>

                    <div className="flex flex-col w-64 text-gray-100">
                        <h1 className="text-base font-bold pb-5">Categories</h1>                    
                    <ul className="flex flex-col gap-1 text-gray-400">
                        <li>Jakets</li>
                        <li>Shirts</li>
                        <li>Knit</li>
                        <li>T-shirts</li>
                        <li>Bottoms</li>
                        <li>Accesories</li>
                    </ul>
                    </div>


                    <div className="flex flex-col w-96 text-gray-100">
                        <h1 className="text-base font-bold pb-5">Customer Care</h1>                    
                    <ul className="flex flex-col gap-1 text-gray-400">
                        <li>FAQ</li>
                        <li>Shipping</li>
                        <li>Order Status</li>
                        <li>Return & Exchanges</li>
                    </ul>
                    </div>

                    <div className="flex flex-col w-80 text-gray-100">
                        <h1 className="text-base font-bold pb-5">Company</h1>                    
                    <ul className="flex flex-col gap-1 text-gray-400">
                        <li>Privacy</li>
                        <li>Guides</li>
                        <li>Term of Conditions</li>
                    </ul>
                    </div>

                    
                </div>


                <div className="flex justify-end gap-5 text-gray-300">
                    <div>
                        Call Us On + 12 332476
                    </div>
                    <div>
                        USD $ | English
                    </div>
                </div> 


                <div className="flex justify-center text-gray-100 gap-5">
                    <div>
                        2023 Jolt Studio, Inc - All Rights Reserved                
                    </div>
                </div>                
            </div>           

        </div>
    </footer>



    </div>
    </div>

    

    </>
  )
}

