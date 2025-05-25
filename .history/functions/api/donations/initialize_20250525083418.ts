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
  
  interface Env {
    PAYSTACK_SECRET_KEY: string;
    WEB3FORMS_KEY: string;
    SITE_URL: string;
  }
  
  export const onRequestPost = async (context: { request: Request; env: Env }) => {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
      'X-Content-Type-Options': 'nosniff',
      'Content-Type': 'application/json'
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
  
      const body = await request.json() as DonationRequest;
      const reference = `TOEI-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
      // Validate required fields
      if (!body.email || !body.amount || !body.currency || !body.name) {
        return new Response(JSON.stringify({
          error: 'Missing required fields'
        }), {
          status: 400,
          headers: corsHeaders
        });
      }
  
      // Validate amount
      if (body.amount < 1000) {
        return new Response(JSON.stringify({
          error: 'Amount must be at least ₦1000'
        }), {
          status: 400,
          headers: corsHeaders
        });
      }
  
      // Validate Paystack credentials
      if (!env.PAYSTACK_SECRET_KEY?.startsWith('sk_')) {
        console.error('Invalid Paystack secret key');
        return new Response(JSON.stringify({
          error: 'Payment gateway configuration error'
        }), {
          status: 500,
          headers: corsHeaders
        });
      }
  
      // Send to Web3Forms (email notification)
      try {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            access_key: env.WEB3FORMS_KEY,
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
          })
        });
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
        // Continue with payment processing even if email fails
      }
  
      // Initialize Paystack payment
      const paystackResponse = await fetch(
        'https://api.paystack.co/transaction/initialize',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
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
            callback_url: `${env.SITE_URL || 'https://www.oaktreeinitiative.org'}/donation/success?reference=${reference}`
          })
        }
      );
  
      const paystackData = await paystackResponse.json() as PaystackResponse;
  
      if (!paystackData.status || !paystackData.data?.authorization_url) {
        throw new Error(paystackData.message || 'Failed to initialize payment');
      }
  
      return new Response(JSON.stringify(paystackData.data), {
        headers: corsHeaders
      });
  
    } catch (error: any) {
      console.error('Payment processing error:', error);
      return new Response(JSON.stringify({
        error: error.message || 'Payment processing failed',
        reference: `TOEI-${Date.now()}`,
        timestamp: new Date().toISOString()
      }), {
        status: 500,
        headers: corsHeaders
      });
    }
  };