<template>
    <div class="flex flex-wrap items-center justify-between px-[40px] py-[16px]">
        <span class="ht-20">{{ title }}</span>
    </div>
</template>

    <script>
    export default {
        name: "CommonHeader",
        props: {
            title: {
            type: String,
            default: ""
        }
    }
}
</script>