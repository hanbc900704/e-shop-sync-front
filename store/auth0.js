export const state = () => ({
    authenticated: false,
    loading: false,
})

export const getters = {
    authentificated(state) {
        return state.authenticated;
    }
}

export const mutations = {
    setAuthentification(state, payload) {
        state.authenticated = payload;
    },
    setLoading(state, payload) {
        state.loading = payload
    }
}

export const actions = {
    async authenticateUser(context, payload) {

        const { commit } = context;
        const { email, pwd } = payload;
        // console.log(email, pwd)
        // useFetch from nuxt 3
        const { public: config } = useRuntimeConfig();
        const urlPrefix = config.BACKEND_API_URL;
        try {
            const response = await $fetch(`${urlPrefix}/auth/login`, {
            // const response = await $fetch(`http://localhost:8000/python/auth/login`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: {
                    email,
                    pwd,
                },
            });
            // console.log('login', response)
            if (response) {
                const token = useCookie('token'); // useCookie new hook in nuxt 3
                token.value = response?.token; // set token to cookie

                const userData = response;
                delete userData.token
                const userCookie = useCookie('userData'); // useCookie new hook in nuxt 3
                userCookie.value = userData; // set token to cookie

                commit('setAuthentification', true)
            }
        } catch (err) {
            console.error('auth failed', err)
        }
        commit('setLoading', false)
    },
    authenticateStatus(context, payload) {
        const { commit } = context;
        
        commit('setAuthentification', payload)
    }
}