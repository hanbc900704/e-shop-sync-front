<template>
    <div class="flex w-full flex-col px-[24px] py-[12px]">
        <div class="mb-[18px] flex flex-wrap items-center justify-between">
            <span class="ht-18 text-[#1D2939]">Report Details</span>
            <UButton variant="ghost" class="ht-18 !border-none bg-transparent text-[#1D2939] hover:bg-transparent" @click="closePane">
                <UIcon name="i-heroicons-x-mark" class="ml-1 text-[18px] font-semibold text-[#1D2939]" />
            </UButton>
            <!-- <button class="ht-18 !border-none bg-transparent text-[#1D2939]" @click="closePane">x</button> -->
        </div>

        <div class="flex w-full flex-col py-[16px]">
            <div class="mb-[18px] flex flex-wrap items-center justify-between">
                <div class="flex w-[500px] flex-col">
                    <span class="ht-18 mb-[16px] text-[#1D2939]">{{ report?.name || "" }}</span>
                    <div class="mb-[8px] flex w-full flex-wrap">
                        <span class="ht-14 mr-[16px] w-[100px] text-[#667085]">Recipients: </span>
                        <span class="ht-14 text-[#667085]">{{ recipients }}</span>
                    </div>
                    <div class="flex w-full flex-wrap">
                        <span class="ht-14 mr-[16px] w-[100px] text-[#667085]">Lists: </span>
                        <span class="ht-14 text-[#667085]">{{ listCnt }} Lists</span>
                    </div>
                </div>
                <div class="inline-grid grid-cols-2 items-center gap-2">
                    <UButton color="white" variant="solid" icon="i-mdi-link"
                        class="!border-none bg-transparent ring-0" />
                    <UButton color="white" variant="solid" icon="i-heroicons-trash"
                        class="!border-none bg-transparent ring-0" />
                </div>
            </div>
        </div>

        <div class="flex w-full flex-wrap items-end justify-between border-b-2 py-[12px] pt-[24px]">
            <div class="group relative mr-[14px] flex h-full w-36 items-center lg:w-64">
                <svg
                    class="pointer-events-none absolute left-0 ml-4 hidden h-4 w-4 fill-current text-gray-500 group-hover:text-gray-400 sm:block"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                >
                    <path
                        d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
                    />
                </svg>
                <input v-model="query"
                    type="text"
                    class="block w-full rounded-[8px] border bg-white py-1.5 pl-10 pr-4 leading-normal text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search Lists"
                />
            </div>

            <UButton color="white"
                class="!border-none bg-transparent px-[14px] py-[8px] text-[#A11043] ring-0">
                Add Lists
            </UButton>
        </div>

        <div v-if="report.tracking_lists" class="w-full pt-[24px]">
            <UTable v-model="selectedRows" class="rounded-lg border border-[#EAECF0]" :rows="filteredRows" :columns="columns"
                sort-asc-icon="i-heroicons-arrow-up-20-solid" sort-desc-icon="i-heroicons-arrow-down-20-solid"
                :sort-button="{ icon: 'i-heroicons-arrows-up-down', size: 'sm' }" @select="selectRow" >
                <template #action-data="{ row }">
                    <div class="house-cmte relative block h-full">
                        <!-- <p class="text-sm text-black">{{ row.house_cmte }}</p> -->
                        <div class="inline-grid grid-cols-2 items-center gap-2">
                            <UButton color="white" variant="solid" icon="i-heroicons-trash"
                                class="!border-none ring-0" />
                            <UButton color="white" variant="solid" icon="i-heroicons-chevron-right"
                                class="!border-none ring-0" @click="showTrackingList(row.id)" /> 
                        </div>
                    </div>
                </template>
            </UTable>
        </div>
    </div>
</template>

<script>
export default {
    name: "ReportRight",
    props: {
        report: {
            type: Object,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: {}
        }
    },
    emits: ['onClosePane'],
    data() {
        return {
            columns: [{
                key: 'name',
                label: 'Lists',
                sortable: true,
            }, {
                key: 'bills',
                label: 'Tracked Bills',
                class: "text-sm text-[#5B5B5B]"
            },
            {
                key: 'action',
                label: '',
                class: "text-sm text-[#5B5B5B]  w-[100px]"
            }],
            selectedRows: [],
            query: ""
        }
    },
    computed: {
        recipients() {
            console.log("recipients")
            if (this.report.recipient) {
                return Array.from(this.report.recipient).join(", ");
            } 
            return ""
        },
        listCnt() {
            //return this.report.tracking_lists && Array.from(this.report.recipient).length || 0
            //number of lists
            console.log(this.report.tracking_lists)
            return this.report.tracking_lists && this.report.tracking_lists.length || 0
        },
        filteredRows() {
            console.log("filteredRows");
            console.log("this.report.tracking_lists", this.report.tracking_lists);
            if (this.report.tracking_lists) {
                if (!this.query) {
                    console.log("no query")
                    return this.report?.tracking_lists;
                }
                console.log("will filter")
                return this.report.tracking_lists.filter(list => {
                    return Object.values(list).some(value => {
                        return String(value).toLocaleLowerCase().includes(this.query.toLowerCase())
                    })
                })
            }
            return []
        }
    },
    methods: {
        closePane() {
            this.$emit('onClosePane');
        },
        selectRow(row) {
            console.log("selectRow", row)
            const index = this.selectedRows.findIndex((item) => item.id === row.id)
            console.log("index", index)
            if (index === -1) {
                this.selectedRows.push(row)
            } else {
                this.selectedRows.splice(index, 1)
            }
        },
        showTrackingList(id) {
            console.log("showTrackingList", id)
            this.$router.push(`/trackinglists/${id}`)
        }
    }
}
</script>