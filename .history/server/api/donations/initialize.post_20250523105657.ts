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
  // Add this debug log
  console.log('Initializing payment with data:', JSON.stringify(body, null, 2));

  try {
    // Generate unique reference
    const reference = `TOEI-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Send donation details to Web3Forms
    try {
      // Add this debug log
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
      // Add this debug log with full error details
    console.error('Failed to send donation intent email:', emailError);
    }
    
    // Add this debug log
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
          callback_url: `${config.public.siteUrl}/donation.success`, // Add your success page URL
        },
      }
    );
    
    // Add this debug log
    console.log('Paystack response:', JSON.stringify(response, null, 2));
    return response.data;
} catch (error: unknown) {
    // Enhanced error logging with proper type checking
    console.error('Paystack initialization error details:', error);
    
    // Check if error is an object with a response property
    if (error && typeof error === 'object' && 'response' in error) {
    console.error('Paystack API response:', JSON.stringify((error as any).response, null, 2));
    }
    
    throw createError({
    statusCode: 500,
    statusMessage: 'Failed to initialize payment',
    });
}
});