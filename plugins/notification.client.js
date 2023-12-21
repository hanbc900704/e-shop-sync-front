import Vue3Toastify, { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default defineNuxtPlugin(async (nuxtApp) => {
    const options = {
        autoClose: 1000
    };    

    nuxtApp.vueApp.use(Vue3Toastify, options);
    nuxtApp.provide('toast', toast);
});