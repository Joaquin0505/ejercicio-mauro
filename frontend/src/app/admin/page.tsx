'use client'

import { useGetProductsQuery, useCreateProductMutation } from "@/state/api"
import { Header } from "../(components)/Header"

import { useState } from "react"
import { PlusCircleIcon, SearchIcon } from "lucide-react"
import { Rating } from "../(components)/Rating"
import { CreateProductModal } from "../products/CreateProductModal"
import { DataGrid, GridColDef } from "@mui/x-data-grid"

type ProductFormData ={
    name:string;
    price: number;
    
}

const columns:GridColDef[]=[
    {field: 'productId', headerName:"ID", width:90},
    {field: "name", headerName:"Nombre del Producto", width:200},
    {field: "price", headerName:"Precio", width:110, type:"number", 
        valueGetter:(value,row)=>`S/.${row.price}`
    },    
]


const Adminpage = () => {
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

    if(isLoading){
        return <div className="py-4">Cargando...</div>
    }
    if(isError|| !products){
        return(
            <div className="text-center text-red-500 py-4">
                Falla en traer información de productos
            </div>
        );
    }

  return (
    <div className="mx-auto pb-5 w-full px-7">
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

        <div className="flex flex-col">
        <Header name="Inventario"/>
        <DataGrid rows={products} columns={columns} getRowId={(row)=>row.productId} checkboxSelection className="bg-white shadow-lg rounded-lg border-gray-200 mt-5 !text-gray-700"/>
    </div>

        
        <CreateProductModal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)} onCreate={handlerCreateProduct}/>
    </div>
  )
}

export default Adminpage