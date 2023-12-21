<template>
    <div class="flex w-full flex-col">
        <div class="flex w-full flex-wrap justify-between border-b px-[24px] py-[12px]">
            <label class="font-[12px] text-[#667085]">Recent Searches</label>
            <button class="border-0 p-0 underline" @click="() => clearQuery()">
                Clear History
            </button>
        </div>
        <div v-for="item, index in recentQueries" :key="index" class="flex w-full border-b px-[24px] py-[16px]">
            <button class="flex w-full items-center border-0 p-0" @click="() => searchQuery(item?.search_key || '')">
                <div class="group relative flex h-full w-4 items-center ">
                    <svg
                        class="pointer-events-none absolute left-0 hidden h-4 w-4 fill-current text-gray-500 group-hover:text-gray-400 sm:block"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path
                            d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
                        />
                    </svg>
                </div>
                <label class="ml-[16px] mr-auto py-[10px]">{{ item?.search_key || '' }}</label>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.833 24.1666L24.1663 15.8333M24.1663 15.8333H15.833M24.1663 15.8333V24.1666" stroke="#667085" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>

    </div>
</template>

<script>
export default {
    name: "SearchRecent",
    props: ["onSearchQuery"],
    data() {
        return {
            recentQueries: []
        }    
    },
    computed: {
        apiURL() {
            const { public: config } = useRuntimeConfig();
            return config.BACKEND_API_URL;
        },
    },
    async mounted() {
        await this.getSearchHistory();
    },
    methods: {
        searchQuery(item) {
            console.log(item, item)
            this.$emit("onSearchQuery", item)
        },
        async getSearchHistory() {
            const userId = 1;
            const {data, error} = await useFetch(`${this.apiURL}/search/${userId}`);
            // const {data, error} = await useFetch(`http://localhost:8000/python/search/${userId}`);
            if (error.value) {
                console.log('fetch calendar [agenda list] api error', error)
            } else {
                this.recentQueries = data.value;
            }
        },
        async clearQuery() {
            const userId = 1;
            const {data, error} = await useFetch(`${this.apiURL}/search/${userId}`, {
            // const {data, error} = await useFetch(`http://localhost:8000/python/search/${userId}`, {
                method: "DELETE"
            });

            if (error.value) {
                console.log('fetch calendar [agenda list] api error', error)
            } else {
                this.recentQueries = data.value;
            }
        }
    }
}
</script>