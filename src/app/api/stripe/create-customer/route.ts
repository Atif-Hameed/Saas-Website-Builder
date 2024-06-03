import { stripe } from '@/lib/stripe';
import { StripeCustomerType } from '@/lib/types';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { address, email, name, shipping }: StripeCustomerType = await req.json();

    // Log incoming data
    console.log('Incoming data:', { address, email, name, shipping });

    // Validate required fields
    if (!email || !address || !name || !shipping) {
      console.log('Validation failed:', { email, address, name, shipping });
      return new NextResponse('Missing data', { status: 400 });
    }

    const customer = await stripe.customers.create({
      email,
      name,
      address,
      shipping,
    });

    console.log('Created customer:', customer);

    return NextResponse.json({ customerId: customer.id });
  } catch (error) {
    console.error('🔴 Error', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
