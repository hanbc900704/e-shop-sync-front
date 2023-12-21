<template>
    <div class="flex flex-wrap items-center justify-between px-[40px] py-[16px]">
        <RouterLink :to="to" class="flex items-center">
            <img class="mr-[12px] rotate-90" src="/images/arrow.svg" alt="arrow" />
            <span class="ht-20">{{ title }}</span>
        </RouterLink>

        <div class="flex items-center">
            <div class="group relative mr-[14px] flex h-full w-36 items-center lg:w-64">
                <svg class="pointer-events-none absolute left-0 ml-4 hidden h-4 w-4 fill-current text-gray-500 group-hover:text-gray-400 sm:block"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path
                        d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                </svg>
                <input type="text"
                    class="block w-full rounded-[8px] border border-[#D0D5DD] bg-white py-1.5 pl-10 pr-4 leading-normal text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TrackingHeader",
    props: {
        title: {
            type: String,
            default: ""
        },
        to: {
            type: String,
            default: ""
        },
    }
}
</script>