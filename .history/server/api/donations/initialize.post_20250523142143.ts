import { createError, defineEventHandler, readBody, setResponseHeaders } from 'h3';

interface DonationRequest {
  email: string;
  amount: number;
  currency: string;
  name: string;
  phone?: string;
  project: string;
}

interface PaystackResponse {
  status: boolean;
  message: string;
  data: {
    reference: string;
    access_code: string;
    authorization_url: string;
  };
}

export default defineEventHandler(async (event) => {
  // Set security headers
  setResponseHeaders(event, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
    'X-Content-Type-Options': 'nosniff'
  });

  if (event.method === 'OPTIONS') {
    return { status: 'OK' };
  }

  if (event.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    });
  }

  const config = useRuntimeConfig();
  const body = await readBody<DonationRequest>(event);
  const reference = `TOEI-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Validate required fields
  if (!body.email || !body.amount || !body.currency || !body.name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields'
    });
  }

  // Validate amount
  if (body.amount < 1000) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Amount must be at least ₦1000'
    });
  }

  // Validate Paystack credentials
  if (!config.paystackSecretKey?.startsWith('sk_')) {
    console.error('Invalid Paystack secret key');
    throw createError({
      statusCode: 500,
      statusMessage: 'Payment gateway configuration error'
    });
  }

  try {
    // Send to Web3Forms (email notification)
    await $fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: {
        access_key: config.web3formsKey,
        subject: `New Donation: ${body.name}`,
        from_name: 'Oaktree Donation',
        name: body.name,
        email: body.email,
        phone: body.phone || 'Not provided',
        amount: body.amount / 100,
        currency: body.currency,
        project: body.project,
        reference: reference,
        status: 'Processing'
      }
    }).catch(emailError => {
      console.error('Email notification failed:', emailError);
    });

    // Initialize Paystack payment
    const paystackResponse = await $fetch<PaystackResponse>(
      'https://api.paystack.co/transaction/initialize',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${config.paystackSecretKey}`,
          'Content-Type': 'application/json'
        },
        body: {
          email: body.email,
          amount: body.amount,
          currency: body.currency,
          reference: reference,
          metadata: {
            custom_fields: [
              {
                display_name: "Donor Name",
                variable_name: "donor_name",
                value: body.name
              },
              {
                display_name: "Project",
                variable_name: "project",
                value: body.project
              }
            ]
          },
          callback_url: `${config.public.siteUrl}/donation/success?reference=${reference}`
        }
      }
    );

    if (!paystackResponse.status || !paystackResponse.data?.authorization_url) {
      throw new Error(paystackResponse.message || 'Failed to initialize payment');
    }

    return paystackResponse.data;

  } catch (error: any) {
    console.error('Payment processing error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Payment processing failed',
      data: {
        reference,
        timestamp: new Date().toISOString()
      }
    });
  }
});