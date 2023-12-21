<template>
    <div class="flex h-screen w-full flex-col">
        <TrackingHeaderLevel1 :title="title" to="/trackinglists" />
        <hr>
        <div class="w-full px-[40px] pb-[24px] pt-[18px]">
            <div class="flex flex-wrap">
                <div class="flex items-center justify-start">
                    <USelectMenu v-model="selectedItems" class="custom-select-menu" variant="ghost" :options="filter"
                        icon="null" multiple>
                        <UButton class=" bg-transparent pl-0 text-black shadow-none hover:bg-transparent">
                            <div class="flex gap-1 text-sm font-semibold text-black">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
                                    <path fill="currentColor"
                                        d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                                </svg>
                                Filter
                            </div>
                        </UButton>
                        <template #option="{ option: filter }">
                            <span class="truncate">{{ filter }}</span>
                        </template>
                    </USelectMenu>
                    <UBadge class="h-[25px] w-[25px] rounded-full border border-[#D0D5DD] !bg-[#F2F4F7] text-[#344054]">
                        {{ selectedItems.length }}
                    </UBadge>
                    <div v-if="selectedItems.length">
                        <span v-for="(item, index) in selectedItems" :key="index" variant="ghost"
                            class="mx-1 truncate rounded-[5px] border border-[#D0D5DD] !bg-[#F2F4F7] px-2 py-1 text-xs font-semibold text-[#344054]">
                            {{ item }}
                            <UButton variant="ghost" icon="i-heroicons-x-mark"
                                class="p-0 align-middle text-[#767676] hover:bg-transparent" @click="removeItem(index)" />
                        </span>
                    </div>
                </div>
                <div class="ml-auto flex items-center">
                    <UBadge class="ht-14 mx-1 bg-transparent text-black">
                        Views
                    </UBadge>
                    <UButton variant="ghost"
                        class="ml-1 rounded-lg rounded-r-[0] border border-r-[0] border-[#D9D9D9] px-4 py-2 text-black"
                        @click="toggleView(0)">
                        <img src="/images/list.svg" alt="list" width="20" height="20" />
                        List
                    </UButton>
                    <UButton variant="ghost"
                        class="mr-6 rounded-lg rounded-l-[0] border border-[#D9D9D9] px-4 py-2 text-black"
                        @click="toggleView(1)">
                        <img src="/images/card.svg" alt="list" width="20" height="20" />
                        Summary
                    </UButton>
                    <UButton variant="ghost"
                        class="after:content after-ml-2 relative mx-1 rounded-sm border border-[#D9D9D9] px-4 py-2 text-black after:absolute after:-left-4 after:block after:h-full after:w-0.5 after:bg-[#E1E0E1]">
                        Export CSV
                    </UButton>
                    <UButton v-if="selectedRows.length > 0" variant="ghost" 
                        class="mx-1 rounded-sm border border-[#D9D9D9] px-4 py-2 text-black" @click="isConfirmOpen=true">
                        Remove from List
                    </UButton>
                </div>
            </div>
        </div>
        <div class="tracking-list-table flex flex-col overflow-auto px-[40px] ">
            <div v-if="tabIndex" class="flex w-full flex-col">
                <div v-for="item, index in bills" :key="index" class="mb-[24px] w-full">
                    <BillCard :title="item.bill_no" :sub-title="item.short_title" :desc="item.desc" :alert="item.alertList"
                        :user-avata="item.sponsors.avatar" :user-name="item.sponsors.sponsors"
                        :user-ref="item.sponsors.count" :titles="item.titleList" :action-name="item.actionName"
                        :action-date="item.actionDate" :progress-level="item.progressLevel" :list="item.list"
                        :url="'/bills'" :parent-param="param" :param="item.idx" />
                </div>
            </div>

            <UTable v-else v-model="selectedRows" class="rounded-lg border border-[#EAECF0]" :rows="bills"
                :columns="columns" sort-asc-icon="i-heroicons-arrow-up-20-solid"
                sort-desc-icon="i-heroicons-arrow-down-20-solid"
                :sort-button="{ icon: 'i-heroicons-arrows-up-down', size: 'sm' }" @select="selectRow">
                <template #sponsors-data="{ row }">
                    <div class="flex items-center gap-2">
                        <div class="h-8 w-8 rounded-full bg-gray-500">
                            <img class="h-full w-full rounded-full object-cover object-top" :src="row.sponsors.avatar" alt="avatar" />
                        </div>
                        <p class="text-sm text-black">{{ row.sponsors.sponsors }}</p>
                        <span v-if="row.sponsors.count > 1"
                            class="rounded-full border border-[#BCBCBC] px-1 py-[2px] text-xs font-semibold">
                            +{{ row.sponsors.count - 1 }}
                        </span>
                    </div>
                </template>
                <template #alert-data="{ row }">
                    <div class="flex w-fit items-center gap-2 rounded-[8px] bg-[#FFF6ED] px-[8px] py-[2px]">
                        <UIcon v-if="row.alert" name="i-mdi-alert-outline" class="text-sm text-[#C4320A]" />
                        <p class="text-sm text-[#C4320A]">{{ row.alert }}</p>
                    </div>
                </template>
                <template #house_cmte-data="{ row }">
                    <div class="house-cmte relative block h-full">
                        <!-- <p class="text-sm text-black">{{ row.house_cmte }}</p> -->
                        <div class="house-btns inline-grid grid-cols-3 items-center gap-2">
                            <UButton color="white" variant="solid" icon="i-mdi-file-download" class="!border-none ring-0" />
                            <UButton color="white" variant="solid" icon="i-heroicons-folder-plus"
                                class="!border-none ring-0" />
                            <RouterLink :to="'/bills/' + row.idx" class="ml-0">
                                <UButton color="white" variant="solid" icon="i-heroicons-chevron-right"
                                    class="!border-none ring-0" />
                            </RouterLink>
                        </div>
                    </div>
                </template>
            </UTable>
        </div>
        <UModal v-model="isConfirmOpen" prevent-close>
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Confirm
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isConfirmOpen = false" />
                </div>
                </template>

                <Placeholder class="h-32">
                    <div class="flex w-full flex-col">
                        <span>Confirm to remove the selected bills from this list?</span>
                        <div class="mt-[24px] flex flex-wrap justify-center">
                            <UButton v-if="selectedRows.length > 0" variant="ghost" color="green"
                                class="mx-1 rounded-sm border border-[#D9D9D9] px-4 py-2" @click="removeBillProcess()">
                                Confirm
                            </UButton>
                            <UButton v-if="selectedRows.length > 0" variant="ghost" color="red"
                                class="mx-1 rounded-sm border border-[#D9D9D9] px-4 py-2" @click="isConfirmOpen = false">
                                Cancel
                            </UButton>
                        </div>
                    </div>
                </Placeholder>
            </UCard>
        </UModal>
    </div>
</template>

<script>

export default {
    name: "TrackingLists",
    data() {
        return {
            title: "Pharmaceutical Research Manufacturers of America",
            tabIndex: 0,
            columns: [{
                key: 'bill_no',
                label: 'Bill #',
                sortable: true,
            }, {
                key: 'short_title',
                label: 'Title',
                class: "text-sm text-[#5B5B5B]"
            }, {
                key: 'alert',
                label: 'Alert',
                class: "text-sm text-[#5B5B5B]"
            },
            {
                key: 'titles',
                label: 'Titles',
                class: "text-sm text-[#5B5B5B]"
            },
            {
                key: 'last_action',
                label: 'Last Action',
                class: "text-sm text-[#5B5B5B]"
            },
            {
                key: 'sponsors',
                label: 'Sponsors',
                class: "text-sm text-[#5B5B5B]"
            },
            {
                key: 'house_cmte',
                label: '',
                class: "text-sm text-[#5B5B5B]"
            }],
            bills: [
            ],
            selectedRows: [],
            filter: ['Type: House Bills', 'Status: First Read'],
            selectedItems: [],
            isConfirmOpen: false
        }
    },
    computed: {
        param() {
            return this.$route.params.id;
        },
        apiURL() {
            const { public: config } = useRuntimeConfig();
            return config.BACKEND_API_URL;
        },
        filteredData() {
            return this.bills;
        }
    },
    mounted() {
        this.fetchBillsTracked();
    },
    methods: {
        removeItem(index) {
            this.selectedItems.splice(index, 1)
        },
        selectRow(row) {
            const index = this.selectedRows.findIndex((item) => item.id === row.id)
            if (index === -1) {
                this.selectedRows.push(row)
            } else {
                this.selectedRows.splice(index, 1)
            }
            this.$router.push('/bills/' + row.idx);
        },
        toggleView(idx) {
            this.tabIndex = idx;
        },
        async fetchBillsTracked() {
            try {
                // console.log(this.$route.params.id)
                // Fetch data from the specified URL using the ID
                const response = await fetch(`${this.apiURL}/tracking_list_bills/${this.$route.params.id}`);
                // Store the fetched data in the 'detailDocument.info' property
                const data = await response.json();
                // console.log("data", data)
                this.bills = data.bills;
                this.title = data.title;
            } catch (error) {
                // Handle errors, if any
                console.error('An error occurred while fetching documents:', error);
            }
        },
        async removeBillProcess() {
            const selectedBillIds = this.selectedRows.map(item => {
                return item.idx;
            })

            try {
                await $fetch(`${this.apiURL}/tracking_list_bill/remove`, {
                // await $fetch(`http://localhost:8000/python/tracking_list_bill/remove`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        tracking_list_id: this.$route.params.id,
                        "bills": selectedBillIds,
                    }),
                });
                this.selectedRows = [];
                await this.fetchBillsTracked();
                this.$toast.success('Successfully Removed from List', {
                    position: 'top-right'
                })
            } catch (err) {
                // Handle errors, if any
                console.error('An error occurred while fetching documents:', err);
            }
            this.isConfirmOpen = false;
        }
    }
}
</script>

<style>
.tracking-list-table table tbody tr td:last-child {
    display: none;
    position: absolute;
    right: 0;
}

.tracking-list-table table tbody tr:hover td:last-child {
    display: block;
}
</style>