import { createError, defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();

  if (!body.reference) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing reference code'
    });
  }

  try {
    const verification = await $fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(body.reference)}`,
      {
        headers: {
          Authorization: `Bearer ${config.paystackSecretKey}`
        }
      }
    );

    return verification;

  } catch (error) {
    console.error('Verification failed:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Payment verification failed'
    });
  }
});