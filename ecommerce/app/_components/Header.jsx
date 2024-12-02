'use client'
import React, { useContext } from 'react'
import Image from 'next/image'
import { UserButton, useUser } from '@clerk/nextjs'
import { ShoppingCart } from 'lucide-react'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { CartContext } from '../_context/CartContext'
import CartApis from '../_utils/CartApis'
import Cart from './Cart'

function Header() {
  const path = usePathname()
  const {cart,setCart} = useContext(CartContext)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [openCart, setOpenCart] = useState(false)
  useEffect(() => {
    setIsLoggedIn(path.toString().includes('sign-in'))
	}, [path])
  const {isSignedIn,user} = useUser()
  useEffect(() => {
    user&&getCartItems()
	}, [user])
  const getCartItems = ()=>{
    CartApis.getUserCartItems(user.primaryEmailAddress.emailAddress).then(res=>{
      
      res?.data?.data.forEach(citem => {
				setCart((oldCart) => [
					...oldCart,
					{
						id: citem.documentId,
						product: citem?.products[0]
					}
				])
			})
    })
  }
  return !isLoggedIn && (
    <header className="bg-white">
  <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-1 sm:px-6 lg:px-8 shadow-md">
    <Image src='/logo.svg' alt='logo' width={50} height={50} />

    <div className="flex flex-1 items-center justify-end md:justify-between">
      <nav aria-label="Global" className="hidden md:block">
        <ul className="flex items-center gap-6 text-sm">
          <li>
            <a className="text-gray-500 transition hover:text-gray-500/75" href="/"> Home </a>
          </li>

          <li>
            <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Explore </a>
          </li>

          <li>
            <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Projects </a>
          </li>

          <li>
            <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> About Us </a>
          </li>

          <li>
            <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Contact Us </a>
          </li>
        </ul>
      </nav>

      <div className="flex items-center gap-4">
        {
          !user?
          <div className="sm:flex sm:gap-4">
          <a
            className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-500"
            href="/sign-in"
          >
            Login
          </a>

          <a
            className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
            href="#"
          >
            Register
          </a>
        </div>:
        <div className='flex gap-5 items-center'>
         <h2 className='flex gap-1 cursor-pointer'>
          <ShoppingCart onClick={()=>setOpenCart(!openCart)} />({cart.length})</h2> 
          <UserButton aftersignouturl='/'/>
          {openCart && <Cart/>}
        </div>
        }
        

        <button
          className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</header>
  )
}

export default Header
