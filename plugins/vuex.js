import { createStore } from 'vuex';

// pina
// https://vueschool.io/articles/vuejs-tutorials/global-state-management-with-pinia-in-nuxt-3/

let store;

const index = import('@/store/index');
const auth0 = import('@/store/auth0');

export default defineNuxtPlugin(async (nuxtApp) => {
    if (!store) {
        store = createStore({
            ...(await index),
            modules: {
                auth0: await auth0
            }
        });
    }

    nuxtApp.vueApp.use(store);
    nuxtApp.provide('store', store);
});
