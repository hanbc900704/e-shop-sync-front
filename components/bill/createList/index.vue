<template>
    <div class="flex h-full w-full flex-col p-[24px]">
        <div class="mb-[18px] flex flex-wrap items-center justify-between">
            <span class="ht-18 text-[#1D2939]">Add List</span>
            <UButton variant="ghost" class="ht-18 !border-none bg-transparent text-[#1D2939] hover:bg-transparent"
                @click="closePane">
                <UIcon name="i-heroicons-x-mark" class="ml-1 text-[18px] font-semibold text-[#1D2939]" />
            </UButton>
        </div>

        <div class="flex w-full flex-wrap items-center border-b-[1px] py-[12px] pt-[24px]">
            <span class="mr-[12px]">Selected Bills: </span>
            <span>{{ selectedBillIds }}</span>
        </div>
        <div class="flex w-full flex-wrap items-end justify-between border-b-2 py-[12px] pt-[24px]">
            <div class="group relative mr-[14px] flex h-full w-36 items-center lg:w-64">
                <svg class="pointer-events-none absolute left-0 ml-4 hidden h-4 w-4 fill-current text-gray-500 group-hover:text-gray-400 sm:block"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path
                        d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                </svg>
                <input v-model="query" type="text"
                    class="block w-full rounded-[8px] border bg-white py-1.5 pl-10 pr-4 leading-normal text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search Lists" />
            </div>

            <UButton color="white" class="border-1 border-black bg-transparent px-[13px] py-[8px]"
                @click="toggleAddTracking">
                Create New List
            </UButton>
        </div>

        <div class="w-full overflow-y-auto pt-[24px]">
            <UTable class="rounded-lg border border-[#EAECF0]" :rows="filteredRows"
                :columns="columns" sort-asc-icon="i-heroicons-arrow-up-20-solid"
                sort-desc-icon="i-heroicons-arrow-down-20-solid"
                :sort-button="{ icon: 'i-heroicons-arrows-up-down', size: 'sm' }">
                <template #inactive-data="{ row }">
                    <div class="block">
                        <div v-if="row.inactive" class="h-[12px] w-[12px] rounded-full bg-[#00000030]">
                        </div>
                        <div v-else class="h-[12px] w-[12px] rounded-full bg-[#00CC00]">
                        </div>

                    </div>
                </template>
                <template #action-data="{ row }">
                    <div class="house-cmte relative block h-full">
                        <!-- <p class="text-sm text-black">{{ row.house_cmte }}</p> -->
                        <div class="inline-grid grid-cols-1 items-center">
                            <UButton color="white" variant="solid" icon="i-heroicons-plus" class="!border-none ring-0" 
                                @click="addBillsToList(row)" />
                        </div>
                    </div>
                </template>
            </UTable>
        </div>
    </div>
</template>

<script>
export default {
    name: "BillCreateList",
    props: {
        selectedBills: {
            type: Array,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: []
        },
        trackingLists: {
            type: Array,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: []
        }
    },
    emits: ["onClosePane"],
    data() {
        return {
            query: '',
            columns: [{
                key: 'title',
                label: 'Tracking List',
                sortable: true,
            }, {
                key: 'bill_count',
                label: 'Bills Tracked',
                class: "text-sm text-[#5B5B5B]"
            },
            {
                key: 'action',
                label: '',
                class: "text-sm text-[#5B5B5B]  w-[60px]"
            }],
        }
    },
    computed: {
        apiURL() {
            const { public: config } = useRuntimeConfig();
            return config.BACKEND_API_URL;
        },
        filteredRows() {
            if (this.query === '') {
                console.log('filteredRows', this.trackingLists)
                return this.trackingLists
            }
            else {
                return this.trackingLists.filter((list) => {
                    return String(list.title).toLowerCase().includes(this.query.toLowerCase())
                })
            } 
        },
        selectedBillIds() {
            // let idStr = ''
            // this.selectedBillIds.forEach(element => {
            //     idStr += element + ", "
            // });
            // return idStr
            return this.selectedBills.join(", ")
        }
    },
    created() {
        console.log('addlistpane', this.selectedBills, this.trackingLists)
    },
    methods: {
        closePane() {
            this.$emit("onClosePane")
        },
        async addBillsToList(trackingListId) {
            console.log("addBillsToList", trackingListId, this.selectedBills);
            this.$toast.info('Processing...', {
                position: 'top-right',
                autoClose: 500,
            });
            

            try {
                const response = await $fetch(`${this.apiURL}/tracking_list_bills/${trackingListId.id}`);
                const bills = response.bills;

                let containsFlag = false;

                this.selectedBills.forEach(bill => {
                    bills && Array.isArray(bills) && bills.forEach(item => {
                        if (item.bill_no === bill) {
                            containsFlag = true;
                        }
                    })
                })
                if (containsFlag) {
                    this.$toast.error('These(this) bills alreasy exist in this List.\n Please check and try again.', {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                    
                    return;
                }

                await $fetch(`${this.apiURL}/tracking_list_bill/add/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        tracking_list_id: trackingListId.id,
                        bills: this.selectedBills
                    })
                }).then((response) => {
                    console.log('response', response)
                    if (response.success) {
                        this.$toast.success(response.success);
                        // update the tracking list
                        this.closePane();
                    }
                    else {
                        this.$toast.error("Error adding bills to list");
                    }
                })
                
            } catch (error) {
                // Handle error (e.g., show error message)
                console.error("Error adding bills to list:", error);
            }
        }
    }
}
</script>
