<template>
    <div>
        <h1>Checkout</h1>
        <form @submit.prevent="handleSubmit">
            <div id="card-element"></div>
            <button type="submit" :disabled="loading">
                Pay {{ totalAmount }}
            </button>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { loadStripe } from "@stripe/stripe-js";

const totalAmount = ref(0);
const loading = ref(false);
let stripe, cardElement;

onMounted(async () => {
    stripe = await loadStripe("your-publishable-key");
    const elements = stripe.elements();
    cardElement = elements.create("card");
    cardElement.mount("#card-element");
});

const handleSubmit = async () => {
    loading.value = true;
    const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
    });
    if (error) {
        console.error(error);
        loading.value = false;
    } else {
        await processPayment(paymentMethod.id);
    }
};

const processPayment = async (paymentMethodId) => {
    try {
        const response = await fetch("/api/payment_intents", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                payment_method: paymentMethodId,
                amount: totalAmount.value * 100,
            }),
        });
        const { client_secret } = await response.json();
        const { error, paymentIntent } = await stripe.confirmCardPayment(
            client_secret
        );
        if (error) {
            console.error(error);
        } else {
            console.log("Payment succeeded:", paymentIntent);
        }
    } catch (error) {
        console.error("Error processing payment:", error);
    } finally {
        loading.value = false;
    }
};
</script>
