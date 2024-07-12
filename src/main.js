import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { installPinia } from "../pinia.ts";
import Antd from "ant-design-vue";
import VueStripeCheckout from "vue-stripe";

const app = createApp(App);
app.use(router);
app.use(Antd);
installPinia(app);

app.use(VueStripeCheckout, {
    pk: import.meta.env.VITE_APP_STRIPE_PK,
});

app.mount("#app");
