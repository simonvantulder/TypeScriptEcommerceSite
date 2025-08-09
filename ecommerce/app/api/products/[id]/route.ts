import {NextRequest } from 'next/server';
import {products } from '@/app/product-data';

type Params = {
    id: string;
}

export async function GET(request:NextRequest, { params }: {params: Params}){
    const productID = params.id;
    const product = products.find(p => p.id ===productID);
    return new Response(JSON.stringify(product), {
        status:200,
        headers: {
            'Content-Type': 'application/json',
        }
    })
}