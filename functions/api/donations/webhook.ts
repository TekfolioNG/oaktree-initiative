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
  
  interface Env {
    PAYSTACK_SECRET_KEY: string;
    WEB3FORMS_KEY: string;
  }
  
  // Function to create HMAC hash for signature verification
  async function createHmacSha512(secret: string, data: string): Promise<string> {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-512' },
      false,
      ['sign']
    );
    
    const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
    return Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }
  
  async function handleSuccessfulPayment(data: PaystackWebhookData['data'], env: Env) {
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
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          access_key: env.WEB3FORMS_KEY,
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
        })
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
  
  async function handleFailedPayment(data: PaystackWebhookData['data'], env: Env) {
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
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          access_key: env.WEB3FORMS_KEY,
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
        })
      });
     
      console.log(`Failure notification sent for ${data.reference}`);
    } catch (emailError) {
      console.error('Failed to send failure notification:', emailError);
    }
  }
  
  export const onRequestPost = async (context: { request: Request; env: Env }) => {
    const corsHeaders = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Paystack-Signature'
    };
  
    try {
      const { request, env } = context;
      
      if (request.method === 'OPTIONS') {
        return new Response(JSON.stringify({ status: 'OK' }), {
          headers: corsHeaders
        });
      }
  
      if (request.method !== 'POST') {
        return new Response(JSON.stringify({ 
          error: 'Method Not Allowed' 
        }), {
          status: 405,
          headers: corsHeaders
        });
      }
  
      // Get the raw body text for signature verification
      const bodyText = await request.text();
      let body: PaystackWebhookData;
      
      try {
        body = JSON.parse(bodyText);
      } catch (parseError) {
        return new Response(JSON.stringify({
          error: 'Invalid JSON payload'
        }), {
          status: 400,
          headers: corsHeaders
        });
      }
   
      // Get the signature from headers
      const signature = request.headers.get('x-paystack-signature');
   
      if (!signature) {
        return new Response(JSON.stringify({
          error: 'Missing signature'
        }), {
          status: 400,
          headers: corsHeaders
        });
      }
  
      // Verify webhook signature
      const hash = await createHmacSha512(env.PAYSTACK_SECRET_KEY, bodyText);
  
      if (hash !== signature) {
        console.error('Invalid webhook signature');
        return new Response(JSON.stringify({
          error: 'Invalid signature'
        }), {
          status: 400,
          headers: corsHeaders
        });
      }
  
      // Handle different webhook events
      switch (body.event) {
        case 'charge.success':
          await handleSuccessfulPayment(body.data, env);
          break;
       
        case 'charge.failed':
          await handleFailedPayment(body.data, env);
          break;
       
        default:
          console.log(`Unhandled webhook event: ${body.event}`);
      }
  
      return new Response(JSON.stringify({ status: 'success' }), {
        headers: corsHeaders
      });
  
    } catch (error: any) {
      console.error('Webhook processing error:', error);
      return new Response(JSON.stringify({
        error: 'Webhook processing failed'
      }), {
        status: 500,
        headers: corsHeaders
      });
    }
  };