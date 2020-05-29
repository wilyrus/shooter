// @ts-ignore
import App from './main.vue';
import { createApp } from 'vue';
import { store } from './src/store';

declare global {
    interface Window {
        facade: any;
        phisicsEngine: any;
    }
}

const app = createApp(App);

app.use(store);

app.mount('#vueScene');

