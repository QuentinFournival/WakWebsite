import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
    state: () => ({
        cartItems: [],
    }),
    actions: {
        addToCart(item) {
            this.cartItems.push(item);
        },
        removeFromCart(index) {
            this.cartItems.splice(index, 1);
        },
        clearCart() {
            this.cartItems = [];
        },
    },
});
