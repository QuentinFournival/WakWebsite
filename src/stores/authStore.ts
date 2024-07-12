import { computed, ref } from "vue";
import type { Ref } from "vue";
import { defineStore } from "pinia";
import { Article } from "../models/article";
import { articlesMock } from "../mock/articlesMock";
import router from "../router";

export const useAuthStore = defineStore("Auth", () => {
    // State
    const isAuthenticated = ref(false);
    const username = ref("wakArkServerAdmin");
    const password = ref("wakAdmin");

    // Getters

    // Actions

    const authentified = (logged: boolean) => {
        isAuthenticated.value = logged;
    };

    return {
        // state
        isAuthenticated,
        username,
        password,

        // Getters
        // Actions
        authentified,
    };
});
