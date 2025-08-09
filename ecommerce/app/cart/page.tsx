'use client'; // force client side rendering, use sparingly 

import { useState } from "react"
import { products } from '../product-data'
import Link from 'next/link';
//seed state as shortcut for building a shopping cart


export default function CartPage(){
    const [cartIDs] = useState(['123', '345'])
    const cartProducts = cartIDs.map(id => products.find(p => p.id ===id)!); //temporarily assert that the id exists
    return (
    <>
        <h1> Shopping Cart </h1>
        {cartProducts.map(product => (
            <Link key={product.id} href={"/products/" + product.id}>
                <h3>{product.name}</h3>
                <p>${product.price}</p>
            </Link>
        ))}
    </>
)}