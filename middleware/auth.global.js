export default defineNuxtRouteMiddleware((to) => {

    const { $store } = useNuxtApp();

    const token = useCookie('token'); // get token from cookies

    if (token.value) {
        // check if value exists
        // todo verify if token is valid, before updating the state
        $store.dispatch('authenticateStatus', true);
        
    }

    // if token exists and url is /login redirect to homepage
    if (token.value && to?.name === 'login') {
        return navigateTo('/dashboard', { external: true });
    }
    
    // if token doesn't exist redirect to log in
    if (!token.value && (to?.name === 'resetpwd' || to?.name === 'setpwd')) {
        return
    }

    //if to.name is weblinkreport/someid, check if token exists
    if (to?.name === 'weblinkreport-id' || to?.name === 'pdfreport-id') {
        return
    }
    

    if (!token.value && (to?.name !== 'login')) {
        abortNavigation();
        return navigateTo('/login', { external: true });
    }
});
