
<template>
    <div class="mb-[20px] flex w-full flex-col">
        <span class="ht-16 rounded-t-[8px] bg-[#EAECF0] px-[24px] py-[12px]">{{ alert.name }}</span>
        <ul>
            <li v-for="item, index in alert.details" :key="index" class="timeline-item ht-14 px-[40px] py-[4px] text-[#232323]">
                <span class="font-semibold">{{ item.info }}</span> <span class="ml-[16px]">{{ item.status }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "AlertsInfo",
    props: {
        alert: {
            type: Object,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: {}
        }
    }
}
</script>

<style scoped>
.timeline-item {
    position: relative;
}
.timeline-item:not(:last-child)::before {
    position: absolute;
    width: 1px;
    height: 100%;
    top: 0;
    left: 24px;
    content: ' ';
    background: #D9D9D9;
    translate: 0 50%;
}
.timeline-item::after {
    position: absolute;
    width: 12px;
    height: 12px;
    top: 6px;
    left: 19px;
    content: ' ';
    background: #D9D9D9;
    translate: 0 50%;
    border-radius: 50%;
}

</style>