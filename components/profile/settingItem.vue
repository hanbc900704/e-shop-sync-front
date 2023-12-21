<template>
    <div class="flex flex-col rounded-[8px] border-[1px] border-solid px-[24px] py-[16px]
         shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)] hover:cursor-pointer" 
        :class="{ 'border-[#32D583]': active}">
        <span class="ht-20 mb-[8px] text-black">{{ title }}</span>
        <span class="ht-14 mb-[8px] text-black">{{ subTitle }}</span>
    </div>
</template>

<script>
export default {
    props: {
        active: {
            type: Boolean,
            default: false
        },
        title: {
            type: String, 
            default: ""
        },
        subTitle: {
            type: String, 
            default: ""
        }
    }
}
</script>