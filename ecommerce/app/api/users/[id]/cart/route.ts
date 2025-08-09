import {NextRequest } from 'next/server';
import { products } from '@/app/product-data';

type ShoppingCart = Record<string, string[]>;

const carts: ShoppingCart = {
    '1': ['123', '234'],
    '2': ['234', '456']
}
type Params = {
    id: string;
}

export async function GET(request:NextRequest, { params }: {params: Params}){
    const userID = params.id;
    const productIDs = carts[userID];
    
    if(productIDs === undefined){
        return new Response(JSON.stringify([]), {
            status:200,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    const cartProducts = productIDs.map(id => products.find(p => p.id === id));
    return new Response(JSON.stringify(cartProducts), {
        status: 200,
        headers: {
            'Content-Type': 'applications/json'
        }
    })
}