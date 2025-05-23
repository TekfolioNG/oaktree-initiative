import { createError, defineEventHandler, readBody } from 'h3';

// Define types
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
  // Method verification
  if (event.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed',
      data: {
        message: 'Only POST requests are allowed',
        allowedMethods: ['POST']
      }
    });
  }

  const body = await readBody<DonationRequest>(event);
  const config = useRuntimeConfig();
  const reference = `TOEI-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Enhanced configuration validation
  console.log('Environment check:');
  console.log('- Paystack Secret Key exists:', !!config.paystackSecretKey);
  console.log('- Site URL:', config.public.siteUrl);
  console.log('- Web3Forms Key exists:', !!config.web3formsKey);

  if (!config.paystackSecretKey) {
    console.error('Paystack secret key is missing');
    throw createError({
      statusCode: 500,
      statusMessage: 'Server configuration error: Missing payment gateway credentials',
      data: { reference }
    });
  }

  // Validate secret key format
  if (!config.paystackSecretKey.startsWith('sk_')) {
    console.error('Invalid Paystack secret key format');
    throw createError({
      statusCode: 500,
      statusMessage: 'Server configuration error: Invalid payment gateway key format',
      data: { reference }
    });
  }

  // Validate request data
  try {
    if (!body.email || !body.amount || !body.currency || !body.name) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields',
        data: { reference }
      });
    }

    if (body.amount < 1000) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Amount too small',
        data: { reference }
      });
    }
  } catch (validationError) {
    console.error('Validation error:', validationError);
    throw validationError;
  }

  try {
    // Send donation details to Web3Forms
    try {
      await $fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: {
          access_key: config.web3formsKey,
          subject: `New Donation Intent: ${body.name} for ${body.project}`,
          from_name: 'The OakTree Empowerment Initiative',
          donation_reference: reference,
          name: body.name,
          email: body.email,
          phone: body.phone || 'Not provided',
          project: body.project,
          currency: body.currency,
          amount: body.amount / 100,
          status: 'Pending',
          message: `Donation initiated: ${body.currency} ${body.amount / 100} for ${body.project} project. Payment pending.`,
        },
      });
    } catch (emailError) {
      console.error('Failed to send donation intent email:', emailError);
    }
    
    // Initialize transaction with Paystack
    const response = await $fetch<PaystackResponse>(
      'https://api.paystack.co/transaction/initialize',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${config.paystackSecretKey}`,
          'Content-Type': 'application/json',
        },
        body: {
          email: body.email,
          amount: body.amount,
          currency: body.currency,
          reference: reference,
          metadata: {
            name: body.name,
            phone: body.phone,
            project: body.project,
            organization: 'The OakTree Empowerment Initiative',
          },
          callback_url: `${config.public.siteUrl}/donation.success`,
        },
      }
    );
    
    if (!response.status || !response.data?.authorization_url) {
      throw createError({
        statusCode: 500,
        statusMessage: `Payment gateway error: ${response.message || 'Invalid response'}`,
        data: { reference }
      });
    }
    
    return response.data;
    
  } catch (error: unknown) {
    let errorMessage = 'Failed to initialize payment';
    let statusCode = 500;
    
    if (error && typeof error === 'object') {
      if ('statusCode' in error) {
        statusCode = (error as any).statusCode;
        errorMessage = (error as any).statusMessage || errorMessage;
      }
      else if ('response' in error) {
        const fetchError = error as any;
        statusCode = fetchError.response?.status || 500;
        errorMessage = fetchError.response?._data?.message || errorMessage;
      }
    }
    
    throw createError({
      statusCode,
      statusMessage: errorMessage,
      data: {
        reference,
        timestamp: new Date().toISOString()
      }
    });
  }
});