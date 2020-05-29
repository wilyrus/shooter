import App from './main.vue';
import { createApp } from 'vue';
import { store } from './store';

const app = createApp(App);

app.use(store);

app.mount('#vueScene');
