<template>
    <div class="flex flex-wrap items-center justify-between px-[40px] py-[16px]">
        <RouterLink :to="to" class="flex items-center">
            <img class="mr-[12px] rotate-90" src="/images/arrow.svg" alt="arrow"/>
            <div class="mr-[12px] h-[40px] w-[40px] rounded-full bg-[rgba(0,0,0,0.1)]"></div>
            <span class="ht-20 mr-[12px]">{{ title }}</span>
            <div class="flex flex-wrap items-center">
                <UBadge v-for="info, index in infos" :key="index" :ui="{ rounded: 'rounded-full' }" class="mr-[12px] border border-[#bcbcbc] bg-[#f3f3f3]">
                    <UButton v-if="info.type" variant="ghost" class="p-0">
                        <UIcon name="i-heroicons-exclamation-triangle" class="ml-1 font-semibold text-[#909090]" />
                    </UButton>
                    <p class="text-xs text-[#474747]">{{ info.name }}</p>
                </UBadge>
            </div>
        </RouterLink>
        
        <div class="flex items-center">
            <UButton variant="ghost" icon="i-heroicons-folder-plus" class="relative mx-1 rounded-sm border border-[#D9D9D9] px-4 py-2 text-black">
                Added ({{addedInfo}})
            </UButton>
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
        addedInfo: {
            type: Number,
            default: 0
        },
        infos: {
            type: Array,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: []
        }
    }
}
</script>