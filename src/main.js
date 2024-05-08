import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { installPinia } from '../pinia.ts';


const app = createApp(App)
app.use(router)
installPinia(app);

app.mount('#app')