import { NextRequest } from 'next/server';
import { connectToDb } from '@/app/api/db';

type Params = {
    id: string;
}

export async function GET(request:NextRequest, { params }: {params: Params}){
    const { db } = await connectToDb();

    const userID = params.id;
    const userCart = await db.collection('carts').findOne({ userID });

    if (!userCart) {
        return new Response(JSON.stringify([]), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        }
        });
    }

    const cartIds = userCart.cartIds;
    const cartProducts = await db.collection('products').find({ id: { $in: cartIds } }).toArray();
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
    const { db } = await connectToDb();

    const userID = params.id;
    const body: CartBody = await request.json();
    const productID = body.productID;

    //add to cart if cart exists otherwise create new cart with item
    const updatedCart = await db.collection('carts').findOneAndUpdate(
        { userID },
        { $push: { cartIds: productID } },
        { upsert: true, returnDocument: 'after' },
    )

    const cartProducts = await db.collection('products').find({ id: { $in: updatedCart.cartIds } }).toArray()

    return new Response(JSON.stringify(cartProducts), {
        status:201,
        headers: {
            'Content-Type' : 'application/json'
        }
    })
}

//remove from cart if cart exists or return empty cart
export async function DELETE(request: NextRequest, { params }: {params : Params} ){
    const { db } = await connectToDb();
    
    const userID = params.id;
    const body: CartBody = await request.json();
    const productID = body.productID;

    const updatedCart = await db.collection('carts').findOneAndUpdate(
        { userID },
        { $pull: { cartIds: productID } },
        { returnDocument: 'after' }
    );

    if (!updatedCart) {
        return new Response(JSON.stringify([]), {
        status: 202,
        headers: {
            'Content-Type': 'application/json',
        }
        })
    }

    const cartProducts = await db.collection('products').find({ id: { $in: updatedCart.cartIds } }).toArray();
    
    return new Response(JSON.stringify(cartProducts), {
        status:202,
        headers: {
            'Content-Type' : 'application/json'
        }
    })
}