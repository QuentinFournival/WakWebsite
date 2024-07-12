import {
    createMemoryHistory,
    createRouter,
    createWebHistory,
    type RouteRecordRaw,
    type Router,
} from "vue-router";
import { useAuthStore } from "../stores/authStore";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "index",
        component: () => import("../views/index.vue"),
    },
    {
        path: "/construction",
        name: "construction",
        component: () => import("../views/construction.vue"),
    },

    {
        path: "/shop",
        name: "shop",
        component: () => import("../views/shop.vue"),
    },

    {
        path: "/success/:session_id",
        name: "success",
        component: () => import("../views/success.vue"),
    },
    {
        path: "/cancel",
        name: "leaderboard",
        component: () => import("../views/leaderboard.vue"),
    },

    {
        path: "/leaderboardASA",
        name: "leaderboardASA",
        component: () => import("../views/leaderboardASA.vue"),
    },
    {
        path: "/leaderboardASA2man",
        name: "leaderboardASA2man",
        component: () => import("../views/leaderboardASA2man.vue"),
    },
    {
        path: "/selectServer",
        name: "selectServer",
        component: () => import("../views/selectServer.vue"),
    },
    {
        path: "/leaderboard",
        name: "leaderboard",
        component: () => import("../views/leaderboard.vue"),
    },
    {
        path: "/leaderboardTwoMan",
        name: "leaderboardTwoMan",
        component: () => import("../views/leaderboardTwoMan.vue"),
    },
    {
        path: "/leaderboardAdmin",
        name: "leaderboardAdmin",
        component: () => import("../views/leaderboardAdmin.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/login.vue"),
    },
];

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    // if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    //     next({ name: "login" });
    // } else {
    next();
    // }
});
export default router;
