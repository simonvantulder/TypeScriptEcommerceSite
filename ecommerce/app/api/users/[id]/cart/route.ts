import {NextRequest } from 'next/server';
import { products } from '@/app/product-data';

type ShoppingCart = Record<string, string[]>;

const carts: ShoppingCart = {
    '1': ['123', '234'],
    '2': ['234', '456'],
    '3': ['234']
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
type CartBody = { 
    productID: string 
};

export async function POST(request: NextRequest, { params }: {params : Params} ){
    const userID = params.id;
    const body: CartBody = await request.json();
    const productID = body.productID;

    carts[userID] = carts[userID] ? carts[userID].concat(productID) : [productID];
    const cartProducts = carts[userID].map(id => products.find(p => p.id ===id))

    return new Response(JSON.stringify(cartProducts), {
        status:201,
        headers: {
            'Content-Type' : 'application/json'
        }
    })
}