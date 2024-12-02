import React from 'react'
import Image from 'next/image'

function ProductBanner({product}) {
    console.log(product)
  return (
    <div>
        {product?.image?.url?
        <Image src={process.env.NEXT_PUBLIC_REACT_APP_UPLOAD_URL+'/'+product?.image?.url} alt='banner' width={500} height={500} className='rounded-lg'/>:
        <div className='w-[500px] h-[225px] bg-slate-200 rounded-lg animate-pulse'></div>
        }
      
        
    </div>
  )
}

export default ProductBanner
