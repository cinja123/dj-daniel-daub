import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import Dock from 'primevue/dock';


createApp(App)
.use(router)
.use(PrimeVue)
.component('Dock', Dock)
.mount('#app')
