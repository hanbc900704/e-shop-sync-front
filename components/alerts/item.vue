<template>
    <div class="mb-[24px] flex w-full flex-col">
        <span class="ht-20 mb-[28px]">{{ date }}</span>
        <AlertsInfo v-for="item, index in alerts" :key="index" :alert="item" />
    </div>
</template>

<script>
export default {
    name: "AlertsItem",
    props: {
        date: {
            type: String,
            default: ""
        },
        alerts: {
            type: Array,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: []
        }
    }
}
</script>