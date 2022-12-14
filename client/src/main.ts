import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import Dock from 'primevue/dock';
import Carousel from 'primevue/carousel';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import Chips from 'primevue/chips';
import TextArea from 'primevue/textarea';
import SelectButton from 'primevue/selectbutton';


createApp(App)
.use(router)
.use(PrimeVue)
.component('Dock', Dock)
.component('Carousel', Carousel)
.component('InputText', InputText)
.component('Dropdown', Dropdown)
.component('Calendar', Calendar)
.component('Chips', Chips)
.component('InputMask', InputMask)
.component('SelectButton', SelectButton)
.component('Textarea', TextArea)
.mount('#app')
