<template>
    <div class="px-[40px] pb-[24px] pt-[18px]">
        <div class="flex flex-wrap items-center justify-between">
            <div class="flex items-center justify-start">
                <USelectMenu v-model="selectedItems" class="custom-select-menu" variant="ghost"
                    :options="filter" icon="null" multiple>
                    <UButton class=" bg-transparent pl-0 text-black shadow-none hover:bg-transparent">
                        <div class="flex gap-1 text-sm font-semibold text-black">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                width="20" height="20" viewBox="0 0 16 16">
                                <path fill="currentColor"
                                    d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                            </svg>
                            Filter
                            </div>
                    </UButton>
                    <template #option="{ option: filter }">
                        <span class="truncate">{{ filter }}</span>
                    </template>
                </USelectMenu>
                <UBadge class="h-[25px] w-[25px] rounded-full border border-[#D0D5DD] !bg-[#F2F4F7] text-[#344054]">
                    {{ selectedItems.length }}
                </UBadge>
                <div v-if="selectedItems.length">
                    <span v-for="(item, index) in selectedItems" :key="index" variant="ghost"
                        class="mx-1 truncate rounded-[5px] border border-[#D0D5DD] !bg-[#F2F4F7] px-2 py-1 text-xs font-semibold text-[#344054]">
                        {{ item }}
                        <UButton variant="ghost" icon="i-heroicons-x-mark" class="p-0 align-middle text-[#767676] hover:bg-transparent"
                            @click="removeItem(index)" />
                    </span>
                </div>
            </div>

            <div class="ml-auto flex items-center">
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
                        type="text"
                        class="block w-full rounded-[8px] border border-[#D0D5DD] bg-white py-1.5 pl-10 pr-4 leading-normal text-gray-400  focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Search"
                    />
                </div>
                <UButton variant="ghost" class="ml-2 mr-1 rounded-[4px] border border-[#D9D9D9] px-4 py-2 text-black">
                    Search
                </UButton>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: "SearchFilter",
    data() {
        return {
            filter: ['Type: Bills', 'Type: Legislature'],
            selectedItems: [],
        }
    },
    methods: {
        removeItem(index) {
            this.selectedItems.splice(index, 1)
        },
    }
}
</script>