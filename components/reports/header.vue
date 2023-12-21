<template>
    <div class="flex flex-wrap items-center justify-between px-[40px] py-[16px]">
        <span class="ht-20">{{ title }}</span>
        <div class="flex items-center">

            <div class="group relative mr-[14px] flex h-full w-36 items-center lg:w-64">
                <div
                    class="absolute flex h-10 w-auto cursor-pointer items-center justify-center p-3 pr-2 text-sm uppercase text-gray-500 sm:hidden">
                    <svg fill="none" class="relative h-5 w-5" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <svg class="pointer-events-none absolute left-0 ml-4 hidden h-4 w-4 fill-current text-gray-500 group-hover:text-gray-400 sm:block"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path
                        d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                </svg>
                <input type="text"
                    class="block w-full rounded-sm bg-white py-1.5 pl-10 pr-4 leading-normal text-gray-400 opacity-90 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search" />
            </div>
            <UButton variant="ghost" icon="i-heroicons-plus"
                class="relative mx-1 rounded-sm border border-[#D9D9D9] px-4 py-2 text-black">
                New Report
            </UButton>
        </div>
    </div>
</template>

<script>
export default {
    name: "ReportsHeader",
    props: {
        title: {
            type: String,
            default: ""
        }
    }
}
</script>