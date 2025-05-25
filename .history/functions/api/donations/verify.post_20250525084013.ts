interface VerifyRequest {
    reference: string;
  }
  
  interface Env {
    PAYSTACK_SECRET_KEY: string;
  }
  
  export const onRequestPost = async (context: { request: Request; env: Env }) => {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
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
  
      const body = await request.json() as VerifyRequest;
  
      if (!body.reference) {
        return new Response(JSON.stringify({
          error: 'Missing reference code'
        }), {
          status: 400,
          headers: corsHeaders
        });
      }
  
      // Verify payment with Paystack
      const verificationResponse = await fetch(
        `https://api.paystack.co/transaction/verify/${encodeURIComponent(body.reference)}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
  
      const verification = await verificationResponse.json();
  
      if (!verificationResponse.ok) {
        throw new Error(verification.message || 'Verification request failed');
      }
  
      return new Response(JSON.stringify(verification), {
        headers: corsHeaders
      });
  
    } catch (error: any) {
      console.error('Verification failed:', error);
      return new Response(JSON.stringify({
        error: error.message || 'Payment verification failed'
      }), {
        status: 500,
        headers: corsHeaders
      });
    }
  };