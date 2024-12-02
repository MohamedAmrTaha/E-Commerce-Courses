import React, { useContext } from 'react'
import { BadgeCheck, AlertOctagon, ShoppingCart } from 'lucide-react'
import SkeletonProductInfo from './SkeletonProductInfo'
import { useUser } from '@clerk/nextjs'
import { usePathname, useRouter } from 'next/navigation'
import CartApis from '../../_utils/CartApis'
import { CartContext } from '../../_context/CartContext'

function ProductInfo({product}) {
  const {user} = useUser()
  const router = useRouter()
  const path = usePathname()
  const {cart,setCart} = useContext(CartContext)
  console.log("product",product)
  const handleAddToCart = ()=>{
    if(!user)
    {
      router.push('/sign-in')
      
    }
    else{
      const id = product.documentId
      const data={
        data:{
          username:'mohamed',
          email:user.primaryEmailAddress.emailAddress,
          products:[id]
        }
      }
      CartApis.addToCart(data).then(res=>{
        console.log("item added successfully",res.data.data)
        const docId = res?.data?.data?.documentId
        console.log("item added successfully",docId)
        setCart(oldCart => [
					...oldCart,
					{
						id: docId,
						product
					}
				])
        
        console.log("cart",cart)
      })
    }
    
    

  }
  return (
    <div>
      {product?.u_id?
        <div>
        <h2 className='text-[20px]'>{product?.title}</h2>
        <h2 className='text-[15px] text-gray-400'>{product?.category}</h2>
        <h2 className='text-[11px] mt-2'>{product?.description[0]?.children[0]?.text}</h2>
        <h2 className='text-[11px] text-gray-500 flex gap-2 mt-2 items-center'>{product?.instantDelivery? <BadgeCheck className='w-5 h-5 text-green-500'/>:<AlertOctagon/>}Eligible For Instant Delivery</h2>
        <h2 className='text-[32px] text-primary mt-2'>$ {product?.price}</h2>
        <button onClick={handleAddToCart} className='flex gap-2 p-3 text-white rounded-lg bg-primary hover:bg-teal-600 '><ShoppingCart/> Add To Cart</button>
      </div>:<SkeletonProductInfo/>
      }
      
    </div>
  )
}

export default ProductInfo
