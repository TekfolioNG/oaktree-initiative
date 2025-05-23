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
  const body = await readBody<DonationRequest>(event);
  const config = useRuntimeConfig(event);
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

    if (body.amount < 1000) { // Minimum 10 NGN or equivalent
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

  console.log('Initializing payment with data:', JSON.stringify({
    ...body,
    amount: body.amount / 100 // Log human-readable amount
  }, null, 2));
  console.log('Transaction reference:', reference);
  console.log('Callback URL:', `${config.public.siteUrl}/donations-success`);

  try {
    // Send donation details to Web3Forms
    try {
      console.log('Sending donation intent to Web3Forms');
      
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
          amount: body.amount / 100, // Convert back from kobo/cents
          status: 'Pending',
          message: `Donation initiated: ${body.currency} ${body.amount / 100} for ${body.project} project. Payment pending.`,
        },
      });
      
      console.log('Donation intent email sent successfully');
    } catch (emailError) {
      console.error('Failed to send donation intent email:', emailError);
      // Continue with payment even if email fails
    }
    
    console.log('Sending payment request to Paystack');
    
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
    
    console.log('Paystack response status:', response.status);
    console.log('Paystack response message:', response.message);
    
    if (!response.status || !response.data?.authorization_url) {
      console.error('Invalid Paystack response:', response);
      throw createError({
        statusCode: 500,
        statusMessage: `Payment gateway error: ${response.message || 'Invalid response'}`,
        data: { reference }
      });
    }
    
    console.log('Payment initialization successful. Authorization URL generated.');
    return response.data;
    
  } catch (error: unknown) {
    let errorMessage = 'Failed to initialize payment';
    let statusCode = 500;
    
    console.error('Payment initialization error:', error);
    
    // Enhanced error handling
    if (error && typeof error === 'object') {
      // Handle fetch errors
      if ('response' in error || 'data' in error) {
        const fetchError = error as any;
        console.error('Fetch error details:', fetchError);
        
        if (fetchError.response) {
          console.error('Response status:', fetchError.response.status);
          console.error('Response data:', fetchError.response._data);
          
          if (fetchError.response.status === 401) {
            errorMessage = 'Payment gateway authentication failed - check credentials';
            statusCode = 401;
          } else if (fetchError.response.status === 400) {
            errorMessage = fetchError.response._data?.message || 'Invalid payment request';
            statusCode = 400;
          } else if (fetchError.response.status >= 500) {
            errorMessage = 'Payment gateway is currently unavailable';
            statusCode = 502;
          }
        }
      }
      // Handle existing error objects
      else if ('statusCode' in error) {
        statusCode = (error as any).statusCode;
        errorMessage = (error as any).statusMessage || errorMessage;
      }
      // Handle generic Error objects
      else if (error instanceof Error) {
        errorMessage = `Payment initialization failed: ${error.message}`;
      }
    }
    
    throw createError({
      statusCode,
      statusMessage: errorMessage,
      data: {
        originalError: error instanceof Error ? error.message : String(error),
        reference,
        timestamp: new Date().toISOString()
      }
    });
  }
});