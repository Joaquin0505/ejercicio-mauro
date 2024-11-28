import { ChangeEvent, FormEvent, useState } from "react";
import { v4 } from "uuid";
import { Header } from "../(components)/Header";

type ProductFormaData={
    name: string;
    price: number;

}

type CreateProductModalProps={
    isOpen: boolean;
    onClose:()=>void;
    onCreate: (formData: ProductFormaData)=>void;
}


export const CreateProductModal = ({isOpen, onClose, onCreate}
    :CreateProductModalProps) => {
        const [formData, setFormData]= useState({
            productId: v4(),
            name:"",
            price:0,
            
        })

        const handlerChange = (e: ChangeEvent<HTMLInputElement>)=>{
            const {name, value}=e.target;
            setFormData({
                ...formData,
                [name]:name === "price" 
                ?parseFloat(value)
                :value,
            });
        };

        const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
            e.preventDefault();
            onCreate(formData);
            onClose();
        };

        if(!isOpen) return null;

        const labelCssStyles = "block text-sm font-medium text-gray-700";
        const inputCssStyles = "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md"
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <Header name="Crear nuevo producto"/>
            <form action="" onSubmit={handleSubmit} className="mt-5">
                <label htmlFor="productName" className={labelCssStyles}>
                    Nombre del producto
                </label>
                <input type="text" name="name" placeholder="Nombre del producto" onChange={handlerChange} value={formData.name} className={inputCssStyles} required/>

                <label htmlFor="productprice" className={labelCssStyles}>
                    Precio del producto
                </label>
                <input type="number" name="price" placeholder="Precio del producto" onChange={handlerChange} value={formData.price} className={inputCssStyles} required/>

               

                <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Crear</button>
                <button onClick={onClose} className="ml-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">Cancelar</button>
            </form>
        </div>
    </div>
  )
}

