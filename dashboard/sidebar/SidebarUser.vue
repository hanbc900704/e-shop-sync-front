<template>
    <div class="flex flex-col items-center lg:flex-row lg:px-4">
        <img v-if="userInfo.avatar" class="h-10 w-10 rounded-full object-cover" :src="userInfo.avatar" alt="avata"/>
        <div v-else class="h-10 w-10 rounded-full bg-[#FFFFFF40]" alt="avata" />
        <span class="ml-0 flex flex-col lg:ml-4">
        <!-- <RouterLink to="/profile">
            <span class="ht-14 mr-4 font-semibold text-white">
            {{ userName }}
            </span>
        </RouterLink> -->
            <span class="ht-14 mr-4 hidden font-semibold text-white lg:block">
                {{ `${userInfo.first_name} ${userInfo.last_name}` }} 
                </span>
            <button class="border-0 p-0 text-left" @click="logout">
                <span class="ht-12 mr-4 hidden text-[#98A2B3] lg:block">
                    Log out
                </span>
                <span class="ht-12 mb-2 mt-4 block text-[#98A2B3] lg:hidden">
                    <img src="/images/logout.svg" alt="avata" />
                </span>
            </button>
        </span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userImg: "/images/9.jpg",
            userName: "User Name",
        }
    },
    computed: {
		router() {
			return useRouter();
		},
        userInfo() {
            const userData = useCookie('userData'); // get token from cookies
            // console.log(userData.value)
            return userData.value
        }
	},
    methods: {
        logout () {
            const { $store } = useNuxtApp();

            const token = useCookie('token'); // get token from cookies
            if (token.value) {
                $store.dispatch('authenticateStatus', false);
                token.value = ""
            }
            this.router.push('/login')
        }
    }
}
</script>