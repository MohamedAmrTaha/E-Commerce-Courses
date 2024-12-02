import React from 'react'
import Image from 'next/image'
import {List} from 'lucide-react'
import Link from 'next/link'

function ProductItem({product}) {
  return (
    <Link href={`/product-details/${product.u_id}`}className='p-1 border-teal-400 rounded-lg hover:shadow-md hover:border hover:cursor-pointer'>
        <Image src={process.env.NEXT_PUBLIC_REACT_APP_UPLOAD_URL+product?.image?.url} alt='banner' width={400} height={350} className='rounded-t-lg h-[170px] object-cover'/>
        <div className='flex items-center justify-between p-3 rounded-b-lg bg-gray-50'>
            <div >
                <h2 className='text-[18px] font-medium line-clamp-1'>{product?.title}</h2>
                <h2 className='text-[10px] text-gray-400 flex  gap-1 items-center'>
				<List className='w-4 h-4' /> {product?.category}</h2>
            </div>
            <div>
                {product?.price}
            </div>
        </div>
    </Link>
    
  )
}

export default ProductItem
