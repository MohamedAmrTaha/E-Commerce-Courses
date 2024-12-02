import React from 'react'
import ProductItem from "./ProductItem"

function ProductList({list}) {
  return (
    <div className = 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3'>
      {list.map(item =>(
          <ProductItem product={item} key={item.u_id}/>
      ))}
    </div>
  )
}

export default ProductList
