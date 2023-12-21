<template>
    <div class="flex flex-wrap items-center justify-between px-[40px] py-[16px]">
        <span class="ht-20">{{ title }}</span>
        <UButton variant="ghost" class="invisible ml-1 rounded-lg border border-[#D9D9D9] px-4 py-2 text-black">
            Create New Alert
        </UButton>
    </div>
</template>

    <script>
    export default {
        name: "SearchHeader",
        props: {
            title: {
            type: String,
            default: ""
        }
    }
}
</script>