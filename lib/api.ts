import {  Product } from "@/lib/type";


const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:3001"


export async function getProducts(){

  const res = await fetch(
    `${API_URL}/api/products`,
    {
      cache:"no-store"
    }
  )


  if(!res.ok){
    throw new Error(
      "Failed loading products"
    )
  }


  return res.json() as Promise<Product[]>
}



export async function createProduct(
 data:Partial<Product>
){

 const res = await fetch(
 `${API_URL}/api/products`,
 {
  method:"POST",
  headers:{
   "Content-Type":"application/json"
  },
  body:JSON.stringify(data)
 }
 )


 return res.json()

}