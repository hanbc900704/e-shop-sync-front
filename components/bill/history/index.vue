<template>
    <div class="flex w-full flex-col">
        <div v-if="startsWithH">
            <div class="mt-10 ">
                <ul class="relative flex items-center justify-between">
                    <li class="relative">
                        <UButton variant="ghost" class="bg-transparent font-bold text-black" label="House" :trailing='true'>
                            <template #trailing>
                                <UIcon name="i-majesticons-settings-cog-check-line" class="text-2xl text-gray-500" />
                            </template>
                        </UButton>
                    </li>
                    <div class="mx-[24px] h-[1px] w-full bg-[#D9D9D9]"></div>
                    <li class="relative">
                        <UButton variant="ghost" class="bg-transparent text-base font-bold text-black" label="Senate">
                            <template #trailing>
                                <UIcon name="i-majesticons-settings-cog-check-line" class="text-2xl text-gray-500" />
                            </template>
                        </UButton>
                    </li>
                    <div class="mx-[24px] h-[1px] w-full bg-[#D9D9D9]"></div>
                    <li class="relative">
                        <UButton variant="ghost" class="bg-transparent font-bold text-black" label="Governor">
                            <template #trailing>
                                <UIcon name="i-majesticons-settings-cog-check-line" class="text-2xl text-gray-500" />
                            </template>
                        </UButton>
                    </li>
                </ul>
            </div>
        </div>


        <div v-else>
            <div class="mt-10 ">
                <ul class="relative flex items-center justify-between">
                    <li class="relative">
                        <UButton variant="ghost" class="bg-transparent text-base font-bold text-black" label="Senate">
                            <template #trailing>
                                <UIcon name="i-majesticons-settings-cog-check-line" class="text-2xl text-green-600" />
                            </template>
                        </UButton>
                    </li>
                    <div class="mx-[24px] h-[1px] w-full bg-[#D9D9D9]"></div>
                    <li class="relative">

                        <UButton variant="ghost" class="bg-transparent font-bold text-black" label="House" :trailing='true'>
                            <template #trailing>
                                <UIcon name="i-majesticons-settings-cog-check-line" class="text-2xl text-green-600" />
                            </template>
                        </UButton>
                    </li>
                    <div class="mx-[24px] h-[1px] w-full bg-[#D9D9D9]"></div>
                    <li class="relative">
                        <UButton variant="ghost" class="bg-transparent font-bold text-black" label="Governor">
                            <template #trailing>
                                <UIcon name="i-mdi-close-box-outline" class="text-2xl text-red-700" />
                            </template>
                        </UButton>
                    </li>
                </ul>
            </div>
        </div>

        <section class="my-5">
            <UCard v-for="item, index in histories" :key="index" class="my-4 rounded-[6px] border border-[#CECECE]">
                <div class="mb-[12px] flex items-start justify-between">
                    <section>
                        <p class="text-[#232323]">
                            <strong>{{ item.name }}</strong>
                            <span class="ml-[8px] text-sm">{{ item.date }}</span>
                        </p>
                    </section>
                    <UButton v-if="item.type" :label="item.type" class="bg-[#E9E9E9] p-2 text-[#232323] hover:bg-[#E9E9E9]"
                        icon="i-mdi-file-download-outline" />
                </div>
                <div v-if="item.state.length" class="flex w-full flex-col">
                    <div v-for="st, idx in item.state" :key="idx" class="flex justify-between py-1">
                        <p>{{ st.name }}</p>
                        <p>{{ st.info }}</p>
                    </div>
                </div>
            </UCard>
        </section>
    </div>
</template>

<script>
export default {
    name: "BillHistory",
    props: {
        histories: {
            type: Array,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: []
        },

    },
    data() {
        // console.log(data)
        return {
            billNumber: null,
        }
    },
    mounted() {
        // Access the "id" parameter from the URL
        const id = this.$route.params.id;
        this.billNumber = id;
        // Now, you can use the "id" variable as needed in this component
        console.log(`ID from URL: ${id}`, this.billNumber);
    },
    computed: {
        startsWithH() {
            return this.billNumber !== null && this.billNumber.startsWith('H');
            // return this.billNumber.startsWith('H');
        }
    }


}

</script>