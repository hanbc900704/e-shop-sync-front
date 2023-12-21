<template>
    <UCard class="border !ring-0">
        <div class="flex items-start gap-4">
            <UCheckbox :value="false" class="mt-1" />
            <section class="basis-8/12">
                <h4 class="m-0 mb-4 text-base font-semibold">
                    <span>{{ report.name }}</span>
                </h4>
                <div class="mt-6">
                    <div class="flex items-center py-2 text-[14px]">
                        <div class="pr-5 text-[#6C6C6C]">Contents</div>
                        <div class="flex items-center gap-2">
                            <p class="text-[14px] font-medium">
                                {{ report.contents }} 
                            </p>
                        </div>
                    </div>
                    <div class="flex py-2 text-[14px]">
                        <div class="pr-5 text-[#6C6C6C]">Recipient</div>
                        <div class="flex">
                            <p>
                                {{ report.recipient }}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section class="ml-auto">
                <div class="inline-grid grid-cols-2 items-center gap-2">
                    <UButton color="white" variant="solid" icon="i-mdi-link"
                        class="!border-none ring-0" />
                    <UButton color="white" variant="solid" icon="i-heroicons-chevron-right"
                        class="!border-none ring-0" @click="reportDetailed()" />
                </div>
            </section>
        </div>
        <hr class="my-3 border-[#D0D5DD]" />
        <section id="bottom-list" class="flex items-center gap-3 overflow-hidden">
            <h6 class="text-sm text-[#6C6C6C]">
                <UIcon name="i-heroicons-folder" class="mr-2 align-middle" />
                <span class="align-middle">Lists:</span>
            </h6>

            <ul class="grid grid-cols-1 gap-3 sm:grid-cols-3 md:flex md:flex-wrap">
                <li v-for="item, index in report.lists" :key="index">
                    <UBadge v-if="index < 3" :ui="{ rounded: 'rounded-sm' }" class="border border-[#D0D5DD] bg-[#F2F4F7]">
                        <p class="text-xs text-[#667085]">{{ item.name }}</p>
                        <span class="ml-2 text-xs text-[#667085]">|</span>
                        <UButton variant="ghost" class="p-0 hover:bg-transparent">
                            <UIcon name="i-heroicons-x-mark" class="ml-1 text-[18px] font-semibold text-[#667085]" />
                        </UButton>
                    </UBadge>
                </li>
            
                <li v-if="report.lists.length > 3">
                    <UBadge class="h-[25px] rounded-full border border-[#D0D5DD] !bg-[#F2F4F7] text-[#667085]">
                    +{{ report.lists.length - 3 }}
                    </UBadge>
                </li>
            </ul>
            <div class="ml-auto">
                <UButton icon="i-heroicons-folder-plus" size="sm" class="bg-[#EAECF0] font-bold text-[#344054]"
                    variant="solid" label="Add to List" :trailing="false" />
            </div>
        </section>
    </UCard>
</template>

<script>
export default {
    name: "ReportCard",
    props: {
        report: {
            type: Object,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: {}
        },
        index: {
            type: Number,
            default: 0
        }
    },
    emits: ['reportDetailed'],
    data() {
        
    },
    methods: {
        reportDetailed() {
            this.$emit('reportDetailed')
        }
    }
}
</script>