<template>
    <div class="flex w-full flex-col">
        <span class="ht-20 mb-[20px]">
            Sponsored Bills
        </span>
        
        <!-- <UTable v-model="selectedRows" class="rounded-lg border border-[#EAECF0] px-[12px]" :rows="info" :columns="columns" -->
        <UTable class="rounded-lg border border-[#EAECF0] px-[12px]" :rows="info" :columns="columns"
                sort-asc-icon="i-heroicons-arrow-up-20-solid" sort-desc-icon="i-heroicons-arrow-down-20-solid"
                :sort-button="{ icon: 'i-heroicons-arrows-up-down', size: 'sm' }">
            <template #action-data="{ row }">
                <div v-if="row" class="flex flex-col">
                    <span>{{ row?.action?.date }}</span>
                    <span v-if="row?.action?.status">{{ row?.action?.status }}</span>
                </div>
            </template>
        </UTable>
    </div>
</template>

<script>
export default {
    name: "LegislatureProfileBill",
    props: {
        info: {
            type: Object, 
            // eslint-disable-next-line vue/require-valid-default-prop
            default: {}
        }
    },
    data() {
        return {
            columns: [{
                key: 'name',
                label: 'Bill',
                class: "text-sm text-[#5B5B5B]",
                sortable: true,
            }, {
                key: 'title',
                label: 'Short Title',
                class: "text-sm text-[#5B5B5B]"
            }, {
                key: 'action',
                label: 'Last Action',
                class: "text-sm text-[#5B5B5B]"
            }],

        }
    },
}
</script>