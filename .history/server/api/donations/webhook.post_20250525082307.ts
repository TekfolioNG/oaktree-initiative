import crypto from 'crypto';
import { createError, defineEventHandler, readBody, setResponseHeaders } from 'h3';




interface PaystackWebhookData {
  event: string;
  data: {
    id: number;
    domain: string;
    status: string;
    reference: string;
    amount: number;
    message: string | null;
    gateway_response: string;
    paid_at: string;
    created_at: string;
    channel: string;
    currency: string;
    ip_address: string;
    metadata: {
      custom_fields: Array<{
        display_name: string;
        variable_name: string;
        value: string;
      }>;
    };
    fees: number;
    customer: {
      id: number;
      first_name: string | null;
      last_name: string | null;
      email: string;
      customer_code: string;
      phone: string | null;
      metadata: any;
      risk_action: string;
    };
    authorization: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      channel: string;
      card_type: string;
      bank: string;
      country_code: string;
      brand: string;
      reusable: boolean;
      signature: string;
    };
    plan: any;
  };
}




export default defineEventHandler(async (event) => {
  // Set response headers
  setResponseHeaders(event, {
    'Content-Type': 'application/json'
  });




  if (event.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    });
  }




  const config = useRuntimeConfig();
  const body = await readBody<PaystackWebhookData>(event);
 
  // Get the signature from headers
  const signature = getHeader(event, 'x-paystack-signature');
 
  if (!signature) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing signature'
    });
  }




  // Verify webhook signature
  const hash = crypto
    .createHmac('sha512', config.paystackSecretKey)
    .update(JSON.stringify(body))
    .digest('hex');




  if (hash !== signature) {
    console.error('Invalid webhook signature');
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid signature'
    });
  }




  try {
    // Handle different webhook events
    switch (body.event) {
      case 'charge.success':
        await handleSuccessfulPayment(body.data, config);
        break;
     
      case 'charge.failed':
        await handleFailedPayment(body.data, config);
        break;
     
      default:
        console.log(`Unhandled webhook event: ${body.event}`);
    }




    return { status: 'success' };




  } catch (error: any) {
    console.error('Webhook processing error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Webhook processing failed'
    });
  }
});




async function handleSuccessfulPayment(data: PaystackWebhookData['data'], config: any) {
  console.log(`Payment successful: ${data.reference}`);
 
  // Extract custom fields
  const donorName = data.metadata?.custom_fields?.find(
    field => field.variable_name === 'donor_name'
  )?.value || 'Anonymous';
 
  const project = data.metadata?.custom_fields?.find(
    field => field.variable_name === 'project'
  )?.value || 'General Donation';




  // Send success notification email
  try {
    await $fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: {
        access_key: config.web3formsKey,
        subject: `✅ Donation Confirmed: ${donorName}`,
        from_name: 'Oaktree Donation Confirmed',
        name: donorName,
        email: data.customer.email,
        phone: data.customer.phone || 'Not provided',
        amount: data.amount / 100,
        currency: data.currency,
        project: project,
        reference: data.reference,
        transaction_id: data.id,
        status: 'Confirmed',
        paid_at: data.paid_at,
        gateway_response: data.gateway_response,
        payment_method: `${data.channel} - ${data.authorization?.bank || 'N/A'}`
      }
    });
   
    console.log(`Success notification sent for ${data.reference}`);
  } catch (emailError) {
    console.error('Failed to send success notification:', emailError);
  }




  // Here you can add additional logic like:
  // - Save to database
  // - Send thank you email to donor
  // - Update project funding status
  // - Generate receipt
}




async function handleFailedPayment(data: PaystackWebhookData['data'], config: any) {
  console.log(`Payment failed: ${data.reference}`);
 
  // Extract custom fields
  const donorName = data.metadata?.custom_fields?.find(
    field => field.variable_name === 'donor_name'
  )?.value || 'Anonymous';
 
  const project = data.metadata?.custom_fields?.find(
    field => field.variable_name === 'project'
  )?.value || 'General Donation';




  // Send failure notification email
  try {
    await $fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: {
        access_key: config.web3formsKey,
        subject: `❌ Donation Failed: ${donorName}`,
        from_name: 'Oaktree Donation Failed',
        name: donorName,
        email: data.customer.email,
        phone: data.customer.phone || 'Not provided',
        amount: data.amount / 100,
        currency: data.currency,
        project: project,
        reference: data.reference,
        transaction_id: data.id,
        status: 'Failed',
        gateway_response: data.gateway_response,
        failure_reason: data.message || 'Payment declined'
      }
    });
   
    console.log(`Failure notification sent for ${data.reference}`);
  } catch (emailError) {
    console.error('Failed to send failure notification:', emailError);
  }
}
