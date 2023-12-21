<template>
    <div>
        <UTable :columns="data.columns" :rows="data.info" class="mt-5">
            <template #congress_person-data="{ row }">
                <div class="flex items-center gap-4">
                    <!-- <UAvatar :src=row.person.avatar alt="Avatar" size="lg" /> -->
                    <p class="font-medium text-black">{{ row.person.name }}</p>
                </div>
            </template>

            <!-- <template #chamber-data="{ row }">
            <div class="flex items-center">
                {{ row.chamber }}
            </div>
        </template> -->

            <template #chamber-data="{ row }">
                <div class="flex items-center gap-4">
                    <a v-if="row.chamber == 'PDF'" class="font-medium text-black" style="color: #0066CC;"
                        :href="row.district" target="_blank" type="application/octet-stream" download="document.pdf">{{
                            row.chamber }}</a>
                    <div v-else class="font-medium text-black hover:cursor-pointer" style="color: #0066CC;"
                        @click="modalProcess(row.chamber, row.district)">{{ row.chamber }}</div>
                </div>
            </template>
        </UTable>
        <UModal v-model="isOpen" fullscreen>
            <UCard :ui="{
                base: 'h-full flex flex-col',
                rounded: '',
                divide: 'divide-y divide-gray-100 dark:divide-gray-800',
                body: {
                    base: 'grow'
                }
            }">
                <template #header>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <UButton class="bg-gray-200 text-black mr-3 rounded-none hover:bg-gray-300"
                                icon="i-heroicons-arrow-left" size="xs" variant="solid" label="back" :trailing="false"
                                @click="isOpen = false" />
                            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                Preview Contents
                            </h3>
                        </div>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                            @click="isOpen = false" />
                    </div>
                </template>

                <Placeholder class="h-full">
                    <iframe :srcdoc="contentData" class="h-full w-full object-cover"></iframe>
                    <!-- <iframe :src="curBillUrl" class="h-full w-full object-cover"></iframe> -->
                    <!-- <p v-html="contentData"></p> -->
                </Placeholder>
            </UCard>
        </UModal>
    </div>
</template>

<script>
export default {
    name: "BillDocuments",
    props: {
        data: {
            type: Object,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: {},
            require: true
        }
    },
    data() {
        return {
            isOpen: false,
            curBillFormat: '',
            curBillUrl: '',
            contentData: ''
        }
    },
    computed: {
        apiURL() {
            const { public: config } = useRuntimeConfig();
            return config.BACKEND_API_URL;
        },
    },
    methods: {
        async modalProcess(format, url) {
            // console.log(format, url)
            this.curBillFormat = format;
            this.curBillUrl = url;

            const resp = await $fetch(`${this.apiURL}/get_iframe_data/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            })
            console.log('resp', resp)
            this.contentData = resp;
            this.isOpen = true;
        },
    }
}
</script>