import Midtrans, { Snap } from 'midtrans-client';
import { NextRequest, NextResponse } from "next/server";


let snap = new Snap({
    isProduction: false,
    serverKey: process.env.NEXT_PUBLIC_SECRET || '',
    clientKey: process.env.NEXT_PUBLIC_CLIENT || '',
});

export async function POST(request: NextRequest) {
    const items = await request.json()

    let totalPrice: number = 0;
    
    console.log(items.items[0])
    for (let i = 0; i < items.items.length; i++) {
        // console.log(items[i].price, items[i].quantity);
      totalPrice += items.items[i].price * items.items[i].quantity;
    }
    console.log(totalPrice)
    const name = `ORD-${Date.now()}`
    const quantity = 1;

    const parameter: Midtrans.TransactionRequestBody = {
        item_details:{
            name:name,
            price:totalPrice,
            quantity:quantity
        },
        transaction_details:{
            order_id:name,
            gross_amount: totalPrice * quantity
        },
    };


    const token = await snap.createTransactionToken(parameter)
    console.log("Token: ", token)
    return NextResponse.json({token})
}