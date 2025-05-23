<script setup>
const route = useRoute();
const config = useRuntimeConfig();

const { data: payment, pending, error } = await useFetch('/api/donations/verify', {
    method: 'POST',
    body: {
        reference: route.query.reference
    },
    immediate: !!route.query.reference
});

// Track successful payment
if (payment.value?.status) {
    useTrackDonation(payment.value.data);
}
</script>

<template>
    <div class="container">
        <div v-if="pending" class="loading">
            <p>Verifying your payment...</p>
        </div>

        <div v-else-if="error" class="error">
            <h1>Payment Verification Failed</h1>
            <p>Please contact support with reference: {{ route.query.reference }}</p>
        </div>

        <div v-else-if="payment?.status" class="success">
            <h1>Thank You for Your Donation!</h1>
            <div class="receipt">
                <p><strong>Amount:</strong> {{ payment.data.amount / 100 }} {{ payment.data.currency }}</p>
                <p><strong>Reference:</strong> {{ payment.data.reference }}</p>
                <p><strong>Date:</strong> {{ new Date(payment.data.paid_at).toLocaleString() }}</p>
            </div>
            <NuxtLink to="/" class="button">Return Home</NuxtLink>
        </div>

        <div v-else class="unknown">
            <h1>Payment Status Unknown</h1>
            <p>Your payment is being processed. You'll receive an email confirmation shortly.</p>
        </div>
    </div>
</template>

<style scoped>
.container {
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
    text-align: center;
}

.loading {
    color: #666;
}

.error {
    color: #d32f2f;
}

.success {
    color: #2e7d32;
}

.receipt {
    margin: 2rem 0;
    padding: 1rem;
    background: #f5f5f5;
    border-radius: 4px;
}

.button {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: #4caf50;
    color: white;
    text-decoration: none;
    border-radius: 4px;
}
</style>