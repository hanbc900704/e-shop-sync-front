import { envs } from './environments.config';

const appEnv = process.env.ENV || 'dev';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    devtools: { enabled: true },
    modules: [
        "@nuxt/ui",
        "@nuxtjs/device",
        "nuxt-lodash",
        "@nuxtjs/tailwindcss",
        "@nuxtjs/color-mode",
    ],
    css: [
        '~/assets/css/tailwind.css',
        '~/styles/global.scss',
    ],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    colorMode: {
        preference: 'light',
        classSuffix: ''
    },
    ui: {
        icons: ['mdi', 'majesticons',]
    },  
    runtimeConfig: {
        // avail on server and client
        public: {
            ...envs[appEnv],
        },
    },
})