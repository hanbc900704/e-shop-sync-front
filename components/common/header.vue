<template>
    <div class="flex flex-wrap items-center justify-between px-[40px] py-[16px]">
        <a v-if="to" :href="to" class="flex items-center">
            <img class="mr-[12px] rotate-90" src="/images/arrow.svg" alt="arrow"/>
            <span class="ht-20" >{{ title }}</span>
        </a>
        <span v-else class="ht-20">{{ title }}</span>
    </div>
</template>

<script>
export default {
    name: "CommonHeader",
    props: {
        title: {
            type: String,
            default: ""
        },
        to: {
            type: String,
            default: ""
        }
    }
}
</script>