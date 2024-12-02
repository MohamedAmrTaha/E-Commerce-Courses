'use client'
import { useParams, usePathname } from 'next/navigation'
import ProductApis from '../../_utils/ProductApis'
import React from 'react'
import { useEffect, useState } from 'react'
import BreadCrumbs from '../../_components/BreadCrumbs'
import ProductBanner from '../_components/ProductBanner'
import ProductInfo from '../_components/ProductInfo'
import ProductList from '../../_components/ProductList'

function ProductDetails() {
    const params = useParams()
    const path = usePathname()
    const [details, setDetails] = useState({})
    const [productsList, setProductsList] = useState([])
    useEffect(()=>{
        getProductById_()
    },[params.productId])
    const getProductById_ = ()=>{
        ProductApis.getProductById(params.productId).then(res=>{
            console.log('product item',res.data.data[0])
            setDetails(res.data.data[0])
            getProductsByCategory_(res.data.data)
        })
    }
    const getProductsByCategory_ = (product)=>{
        ProductApis.getProductsByCategory(product[0].category).then(res=>{
            console.log(res.data.data)
            setProductsList(res.data.data)
        })
    }
  return (
    <div className='px-10 py-8 md:px-28'>
        <BreadCrumbs path={path} />
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-0 mt-10 justify-around '>
            <ProductBanner product={details}/>
            <ProductInfo product={details}/>
        </div>
        <div>
            <h2 className='mt-24 mb-4 text-xl'>Similar Products</h2>
            <ProductList list={productsList} />
        </div>
    </div>
  )
}

export default ProductDetails
