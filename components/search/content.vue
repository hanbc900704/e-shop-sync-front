<template>
    <div class="flex w-full flex-col px-[40px] pt-[18px]">
        <div class="mb-[12px] flex items-center border-b-2 border-[#D0D5DD] pb-[12px]">
            <div class="group relative flex h-full w-36 items-center lg:w-80">
                <svg
                    class="pointer-events-none absolute left-0 ml-4 hidden h-4 w-4 fill-current text-gray-500 group-hover:text-gray-400 sm:block"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                >
                    <path
                        d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
                    />
                </svg>
                <input
                    v-model="searchQ"
                    type="text"
                    class="block w-full rounded-[8px] border border-[#D0D5DD] bg-white py-1.5 pl-10 pr-4 leading-normal text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search"
                />
            </div>
            <UButton variant="ghost" class="ml-2 mr-1 rounded-[4px] border border-[#D9D9D9] px-4 py-2 text-black" @click="searchQuery">
                Search
            </UButton>
            <CommonLoading v-if="loading" class="h-[32px] w-[32px]" />
        </div>

        <div class="w-full py-[16px]">
            <div v-if="!searchResultView" class="flex w-full flex-col">
                <SearchRecent @on-search-query="(query) => searchRecentQuery(query)"/>
            </div>
            <div v-else class="flex w-full flex-col">
                <UTabs :items="results" class="w-full">
                    <template #item="{ item }">
                        <div v-for="dt, index in item.data" :key="index" class="flex w-full border-b px-[24px] py-[16px]">
                            <RouterLink v-if="item.to" class="flex w-full items-center" :to="item.to + '/' + dt.id">
                                <div class="group relative flex h-full w-4 items-center ">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.833 1.6665H4.99967C4.55765 1.6665 4.13372 1.8421 3.82116 2.15466C3.5086 2.46722 3.33301 2.89114 3.33301 3.33317V16.6665C3.33301 17.1085 3.5086 17.5325 3.82116 17.845C4.13372 18.1576 4.55765 18.3332 4.99967 18.3332H14.9997C15.4417 18.3332 15.8656 18.1576 16.1782 17.845C16.4907 17.5325 16.6663 17.1085 16.6663 16.6665V7.49984M10.833 1.6665L16.6663 7.49984M10.833 1.6665V7.49984H16.6663" stroke="#667085" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                                <label class="ml-[16px] w-[400px] py-[10px]">{{ dt.name }}</label>
                                <label class="ml-[16px] mr-auto py-[10px]">{{ String(dt.desc).slice(0, 120) + "" + (String(dt.desc).length > 1200 ? '...' : '') }}</label>
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.833 24.1666L24.1663 15.8333M24.1663 15.8333H15.833M24.1663 15.8333V24.1666" stroke="#667085" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </RouterLink>
                            <RouterLink v-else class="flex w-full items-center">
                                <div class="group relative flex h-full w-4 items-center ">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.833 1.6665H4.99967C4.55765 1.6665 4.13372 1.8421 3.82116 2.15466C3.5086 2.46722 3.33301 2.89114 3.33301 3.33317V16.6665C3.33301 17.1085 3.5086 17.5325 3.82116 17.845C4.13372 18.1576 4.55765 18.3332 4.99967 18.3332H14.9997C15.4417 18.3332 15.8656 18.1576 16.1782 17.845C16.4907 17.5325 16.6663 17.1085 16.6663 16.6665V7.49984M10.833 1.6665L16.6663 7.49984M10.833 1.6665V7.49984H16.6663" stroke="#667085" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                                <label class="ml-[16px] w-[400px] py-[10px]">{{ dt.name }}</label>
                                <label class="ml-[16px] mr-auto py-[10px]">{{ String(dt.desc).slice(0, 120) + "" + (String(dt.desc).length > 1200 ? '...' : '') }}</label>
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.833 24.1666L24.1663 15.8333M24.1663 15.8333H15.833M24.1663 15.8333V24.1666" stroke="#667085" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </RouterLink>
                        </div>
                    

                        <div v-if="item.data.length == 0" class="flex w-full justify-center border-b px-[24px] py-[16px]">
                            <label class="flex items-center">
                                <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048"><path fill="currentColor" d="M1280 64q137 0 274 15q24 3 69 9t101 18t112 28t105 39t77 51t30 64v1472q0 35-30 63t-77 51t-104 39t-113 28t-100 19t-70 9q-137 15-274 15q-138 0-274-15q-24-2-69-9t-101-18t-112-28t-105-39t-77-51t-30-64v-224H85q-35 0-60-25t-25-60V597q0-35 25-60t60-25h427V288q0-35 30-63t77-51t104-39t113-28t100-18t70-10q136-15 274-15zm0 128q-65 0-145 4t-162 16t-161 29t-138 47q62 29 139 47t159 29t161 15t147 5q67 0 146-4t161-15t159-29t140-48q-60-28-138-46t-160-30t-163-15t-145-5zM403 1207h217l51 153h171L597 688H430l-248 672h170l51-153zm1517 532v-303q-66 29-147 48t-168 30t-170 17t-155 5q-73 0-145-4t-145-13q-23 17-51 17H640v203q29 23 78 41t108 31t125 21t126 14t115 8t88 2q35 0 88-2t114-7t127-14t124-22t109-31t78-41zm0-446V924q-66 29-147 48t-168 30t-170 17t-155 5q-64 0-128-3t-128-10v384q64 7 128 10t128 3q37 0 90-2t113-7t125-14t123-22t108-30t81-40zm0-512V412q-66 29-147 48t-168 30t-170 17t-155 5q-71 0-155-5t-170-16t-167-31t-148-48v100h299q35 0 60 25t25 60v286q64 7 128 10t128 3q37 0 90-2t113-7t125-14t123-22t108-30t81-40zM442 1077l69-209l67 209H442z"></path></svg>
                                No Data
                            </label>
                        </div>
                    </template>
                </UTabs>
            </div>
        </div>

    </div>
</template>


<script>
export default {
    name: "SearchContent",
    data() {
        return {
            searchResultView: false,
            searchQ: '',
            results: [],
            loading: false
        }
    },
    computed: {
        apiURL() {
            const { public: config } = useRuntimeConfig();
            return config.BACKEND_API_URL;
        },
    },
    methods: {
        async searchQuery() {
            this.loading = true;
            const userId = 1;
            try {
                const resp = await $fetch(`${this.apiURL}/search/`, {
                // const resp = await $fetch(`http://localhost:8000/python/search/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({query_key: this.searchQ, user_id: userId}),
                })
                this.results = resp;
                console.log('resp', resp)
            } catch (err) {
                this.results = []
            }

            this.searchResultView = true;
            this.loading = false;
        },
        async searchRecentQuery(query) {
            this.searchQ = query;
            await this.searchQuery();
        }
    }
}
</script>