export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  console.log("Initialize endpoint called with:", body);

  const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!paystackSecretKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "Paystack secret key not configured",
    });
  }

  try {
    const response = await $fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${paystackSecretKey}`,
          "Content-Type": "application/json",
        },
        body: {
          email: body.email,
          amount: body.amount,
          currency: body.currency,
          callback_url: `https://www.oaktreeinitiative.org/donation/success`,
          metadata: {
            name: body.name,
            project: body.project,
          },
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Paystack Error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }
});
