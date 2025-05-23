// server/api/donations/verify.post.ts
import { createError, defineEventHandler, readBody } from 'h3';

interface VerifyRequest {
  reference: string;
}

interface PaystackVerifyResponse {
  status: boolean;
  message: string;
  data: {
    status: string;
    reference: string;
    amount: number;
    currency: string;
    customer: {
      email: string;
    };
    metadata: {
      name: string;
      project: string;
      phone?: string;
    };
  };
}

export default defineEventHandler(async (event) => {
  const body = await readBody<VerifyRequest>(event);
  const config = useRuntimeConfig(event);
  // Add this debug log
  console.log('Verifying payment with reference:', body.reference);

  try {
    // Add this debug log
    console.log('Sending verification request to Paystack');
    
    // Verify transaction with Paystack
    const response = await $fetch<PaystackVerifyResponse>(
      `https://api.paystack.co/transaction/verify/${body.reference}`,
      {
        headers: {
          'Authorization': `Bearer ${config.paystackSecretKey}`
        }
      }
    );
    
    // Add this debug log
    console.log('Paystack verification response:', JSON.stringify(response, null, 2));

    if (response.data.status === 'success') {
      // Add this debug log
      console.log('Payment verified successfully');
      
      // Extract donation details
      const donationDetails = {
        reference: response.data.reference,
        name: response.data.metadata.name,
        email: response.data.customer.email,
        phone: response.data.metadata.phone || 'Not provided',
        amount: response.data.amount / 100, // Convert from kobo/cents
        currency: response.data.currency,
        project: response.data.metadata.project,
        status: 'Completed'
      };
      
      // Add this debug log
      console.log('Sending email notification');
      
      // Send notification email to admin
      await $fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: {
          access_key: config.web3formsKey,
          subject: `Donation Completed: ${donationDetails.name} - ${donationDetails.currency} ${donationDetails.amount}`,
          from_name: 'The OakTree Empowerment Initiative',
          donation_reference: donationDetails.reference,
          name: donationDetails.name,
          email: donationDetails.email,
          phone: donationDetails.phone,
          project: donationDetails.project,
          currency: donationDetails.currency,
          amount: donationDetails.amount,
          status: donationDetails.status,
          message: `A donation of ${donationDetails.currency} ${donationDetails.amount} has been completed for the ${donationDetails.project} project.\n\nDonor Details:\nName: ${donationDetails.name}\nEmail: ${donationDetails.email}\nPhone: ${donationDetails.phone}\nReference: ${donationDetails.reference}`,
        },
      });
      
      console.log(`Donation completed: ${body.reference}. Payment completion receipt sent to ${response.data.customer.email}`);
    } else {
      // Add this debug log
      console.log('Payment verification failed with status:', response.data.status);
    }

    return response.data;

  } catch (error: unknown) {
    // Enhanced error logging with proper type checking
    console.error('Paystack verification error details:', error);
    
    // Check if error is an object with a response property
    if (error && typeof error === 'object' && 'response' in error) {
      console.error('Paystack API response:', JSON.stringify((error as any).response, null, 2));
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to verify payment'
    });
  }
});