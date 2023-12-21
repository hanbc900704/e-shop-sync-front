<template>
    <div class="flex w-full flex-col">
        <span class="ht-20 mb-[16px]">{{ data.type }}</span>
        <UTable class="rounded-lg border border-[#EAECF0] px-[12px]" :rows="data.data" :columns="columns"
                sort-asc-icon="i-heroicons-arrow-up-20-solid" sort-desc-icon="i-heroicons-arrow-down-20-solid"
                :sort-button="{ icon: 'i-heroicons-arrows-up-down', size: 'sm' }">
            <template #desc-data="{ row }" >
                <div class="w-full">
                    {{ truncate(row.desc, 80) }}
                </div>
            </template>
            <template #actions-data="{ row }">
                <UDropdown>
                    <RouterLink :to="data.to + '/' + row.id"><img class="-rotate-90" src="/images/arrow.svg" alt="arrow"/></RouterLink>
                </UDropdown>
            </template>
        </UTable>
    </div>
</template>

<script>
export default {
    name: "SearchResult",
    props: {
        data: {
            type: Object,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: {}
        }
    },
    data() {
        return {
            columns: [{
                key: 'id',
                label: 'ID',
                class: "text-sm text-[#5B5B5B] w-[40px]",
            }, {
                key: 'name',
                label: 'Name',
                class: "text-sm text-[#5B5B5B]"
            }, {
                key: 'desc',
                label: 'Description',
                class: "text-sm text-[#5B5B5B] w-[80%]"
            }, {
                key: 'actions',
                class: "w-[40px]"
            }],
        }
    },
    methods: {
        truncate(str, len) {
            if (str.length > len) {
                return str.slice(0, len) + "...";
            } else {
                return str;
            }
        }
    }
}
</script>