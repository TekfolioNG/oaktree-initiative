export default defineEventHandler(async (event) => {
  // Ensure this only handles POST requests
  if (getMethod(event) !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed",
    });
  }

  try {
    const body = await readBody(event);

    console.log("Initialize endpoint called with:", body);

    // Validate required fields
    if (!body.email || !body.amount || !body.currency) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required fields: email, amount, currency",
      });
    }

    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;

    if (!paystackSecretKey) {
      throw createError({
        statusCode: 500,
        statusMessage: "Paystack secret key not configured",
      });
    }

    // Make request to Paystack
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
            name: body.name || "Anonymous",
            project: body.project || "general",
          },
        },
      }
    );

    console.log("Paystack response:", response);
    return response;
  } catch (error) {
    console.error("Paystack Error:", error);

    // Handle different error types
    let statusCode = 500;
    let statusMessage = "Internal Server Error";

    if (error.statusCode) {
      statusCode = error.statusCode;
      statusMessage = error.statusMessage || error.message;
    } else if (error.message) {
      statusMessage = error.message;
    }

    throw createError({
      statusCode,
      statusMessage,
    });
  }
});
