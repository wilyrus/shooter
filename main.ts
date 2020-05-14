// @ts-ignore
import App from './main.vue';
import { createApp } from 'vue'

declare global {
    interface Window {
        facade: any;
        phisicsEngine: any;
    }
}

createApp(App).mount('#app')
