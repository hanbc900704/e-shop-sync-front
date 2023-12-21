<template>
    <div class="flex h-screen w-full flex-col">
        <BillHeader :title="'Bills (' + bills.length + ')'" @on-query-change="(query) => queryChange(query)" />
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
                    <UBadge class="h-[25px] w-[25px] rounded-full border  border-[#D0D5DD] !bg-[#F2F4F7] text-[#344054]">
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
                        class="after:content after-ml-2 relative mx-1 rounded-sm border border-[#D9D9D9] px-4 py-2 text-black after:absolute after:-left-4 after:block after:h-full after:w-0.5 after:bg-[#E1E0E1]"
                        @click="showAddListPane()">
                        Add to List
                    </UButton>
                    <UButton variant="ghost" class="mx-1 rounded-sm border border-[#D9D9D9] px-4 py-2 text-black">
                        Export CSV
                    </UButton>
                    <UButton v-if="selectedRows.length > 0" variant="ghost"
                        class="mx-1 rounded-sm border border-[#D9D9D9] px-4 py-2 text-black" @click="removeNewFlag">
                        Mark as read
                    </UButton>
                </div>
            </div>
        </div>
        <div v-if="!loading" class=" flex flex-col overflow-y-auto px-[40px]">
            <div v-if="tabIndex" class="flex w-full flex-col">
                <div v-for="item, index in filteredBills" :key="index" class="mb-[24px] w-full">
                    <BillCard :title="item.bill_no" :sub-title="item.short_title" :is-new="item.is_new" :desc="item.desc"
                        :alert="item.alertList" :user-avata="item.sponsors.avatar" :user-name="item.sponsors.sponsors"
                        :user-ref="item.sponsors.count" :titles="item.titleList" :action-name="item.actionName"
                        :action-date="item.actionDate" :progress-level="item.progressLevel" :list="item.list"
                        :url="'/bills'" :parent-param="item.idx" :param="''" :alert-state="item?.alertState || false" />
                </div>
            </div>

            <UTable v-else v-model="selectedRows" class="rounded-lg border border-[#EAECF0]" :rows="filteredBills"
                :columns="columns" sort-asc-icon="i-heroicons-arrow-up-20-solid"
                sort-desc-icon="i-heroicons-arrow-down-20-solid"
                :sort-button="{ icon: 'i-heroicons-arrows-up-down', size: 'sm' }" :loading="loading"
                :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }" @select="selectRow">
                <template #short_title-data="{ row }">
                    <p class="relative h-full w-full">
                        {{ row.short_title }}
                        <span v-if="row.is_new"
                            class="rounded-full bg-[#f9f5ff] px-2 py-[2px] text-xs text-[#6941c6]">New</span>


                    </p>
                </template>
                <template #sponsors-data="{ row }">
                    <div class="flex items-center gap-2">
                        <!-- <UAvatar :src=row.sponsors.avatar alt="Avatar"  style="max-width: 100%; max-height: 100%; object-fit: contain;"/> -->
                        <div class="block h-[40px] w-[40px]">
                            <img :src="row.sponsors.avatar" alt="Avatar"
                                class="h-full w-full rounded-full object-cover object-top">
                        </div>

                        <p class="text-sm text-black">{{ row.sponsors.sponsors }}</p>
                        <span v-if="row.sponsors.count > 1"
                            class="rounded-full border border-[#BCBCBC] px-1 py-[2px] text-xs font-semibold">
                            +{{ row.sponsors.count - 1 }}
                        </span>
                    </div>
                </template>
                <template #titles-data="{ row }">
                    <p class="w-25 whitespace-normal">{{ row.titles.replace(/\[|\]|'|"| /g, '').split(',').join(', ') }}
                    </p>
                </template>
                <template #alert-data="{ row }">
                    <div v-if="row.alert"
                        class="flex w-fit items-center gap-2 rounded-[8px] bg-[#FFF6ED] px-[8px] py-[2px]">
                        <!-- <UIcon v-if="row.alert" name="i-mdi-alert-outline" class="text-sm" /> -->
                        <p class="text-sm text-[#C4320A]">{{ row.alert }}</p>
                    </div>
                </template>
                <template #house_cmte-data="{ row }">
                    <div class="house-cmte relative block h-full">
                        <!-- <p class="text-sm text-black">{{ row.house_cmte }}</p> -->
                        <div class="inline-grid grid-cols-3 items-center gap-2">
                            <UButton color="white" variant="solid" icon="i-mdi-file-download" class="!border-none ring-0" />
                            <!-- <UButton color="white" variant="solid" icon="i-heroicons-folder-plus"
                                class="!border-none ring-0" @click="openPane(row)" /> -->
                            <RouterLink :to="'/bills/' + row.idx" class="ml-0">
                                <UButton color="white" variant="solid" icon="i-heroicons-chevron-right"
                                    class="!border-none ring-0" />
                            </RouterLink>
                        </div>
                    </div>
                </template>
            </UTable>
        </div>
        <div v-else class="bill-list-table flex flex-col items-center p-[40px]">
            <CommonLoading class="h-[40px] w-[40px]" />
        </div>
        <div class="flex justify-end border-t border-gray-200 px-[40px] py-3.5 dark:border-gray-700">
            <UPagination v-model="page" :page-count="pageCount" :total="totalCount" />
        </div>

        <!-- add to the list for the individual Bill -->
        <div class="absolute top-0 z-10 h-full w-[700px] border-l bg-white transition-[right] delay-150 ease-in-out"
            :class="{ 'right-[-100%]': !showRightDetailPane, 'right-0': showRightDetailPane }">
            <BillRight :bill="selectedBill" @on-close-pane="() => closePane()" />
        </div>

        <!-- add to the list for the multi-selected Bills -->
        <div class="absolute top-0 z-10 h-full w-[700px] border-l bg-white transition-[right] delay-150 ease-in-out"
            :class="{ 'right-[-100%]': !showSelectListPane, 'right-0': showSelectListPane }">
            <BillCreateList :selected-bills="selectedBillIds" :tracking-lists="trackingLists"
                @on-close-pane="showSelectListPane = false" />
        </div>
    </div>
</template>

<script>
export default {
    name: "Bills",
    data() {
        return {
            // query and pagination
            query: '',
            page: 1,
            pageCount: 100,
            totalCount: 0,
            loading: false,

            // list view or card view
            tabIndex: 0,

            // table view elements
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
                label: 'Striker',
                class: "text-sm text-[#5B5B5B]"
            },
            {
                key: 'titles',
                label: 'Titles',
                class: "text-sm text-[#5B5B5B]"
            },
            {
                key: 'sponsors',
                label: 'Sponsors',
                class: "text-sm text-[#5B5B5B]"
            },
            {
                key: 'last_action',
                label: 'Last Action',
                class: "text-sm text-[#5B5B5B]"
            },
            {
                key: 'house_cmte',
                label: '',
                class: "text-sm text-[#5B5B5B]"
            }],
            bills: [],
            trackingLists: [],
            selectedRows: [],
            selectedBill: {},
            showRightDetailPane: false,
            showSelectListPane: false,

            // navigation filter
            selectedItems: [],
            filter: ['Type: House Bills', 'Status: First Read'],
        }
    },
    computed: {
        apiURL() {
            const { public: config } = useRuntimeConfig();
            return config.BACKEND_API_URL;
        },
        filteredBills() {
            let filtered = this.bills;
            if (this.query !== '') {
                filtered = this.bills.filter((bill) => {
                    return (String(bill.bill_no).toLowerCase().includes(this.query.toLowerCase()) || String(bill.short_title).toLowerCase().includes(this.query.toLowerCase()))
                })
            }
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.totalCount = filtered.length;
            return filtered.slice((this.page - 1) * this.pageCount, (this.page) * this.pageCount)
        },
        selectedBillIds() {
            const rows = [];
            this.selectedRows.forEach(item => {
                rows.push(item?.idx)
            })

            return rows;
        }
    },
    async mounted() {
        await this.getBillData();
        await this.getTrackingLists();
    },
    methods: {
        async getBillData() {
            this.loading = true;
            try {
                this.bills = await $fetch(`${this.apiURL}/bill_list/all`)
            } catch (error) {
                console.log('fetch [bills] api error', error)
            }

            this.loading = false;
        },
        async getTrackingLists() {
            console.log('getTrackingLists')
            const appUserId = 1;
            try {
                this.trackingLists = await $fetch(`${this.apiURL}/tracking_list/${appUserId}`);

                console.log('trackingLists', this.trackingLists)

            } catch (error) {
                console.log('fetch [tracking list] api error', error)
            }
        },
        removeItem(index) {
            this.selectedItems.splice(index, 1)
        },
        selectRow(row) {
            const index = this.selectedRows.findIndex((item) => item.idx === row.idx)
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
        closePane() {
            this.showRightDetailPane = false;
            
        },
        openPane(row) {
            this.selectedRows = [];

            this.showRightDetailPane = true;
            this.selectedBill = row;
        },
        queryChange(q) {
            this.page = 1;
            this.query = q;
        },
        showAddListPane() {
            if (this.selectedBillIds.length === 0) {
                this.$toast.error('Please Select the Bills', {
                    position: 'top-right',
                    autoClose: 3000,
                })
                return;
            }
            this.showSelectListPane = true;
        },
        async removeNewFlag() {
            const billIds = []

            this.selectedRows.forEach(item => {
                billIds.push(item?.idx)
            })
            const response = await fetch(`${this.apiURL}/update_new_flag/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "bill_ids": billIds,
                    "app_user_id": 1
                }),
            });

            const data = await response.json()
            // reponse = {"message":"Bills status updated successfully","updated_bills":["HB2053"]}
            const message = data.message;
            if (message === "Bills status updated successfully") {
                this.$toast.success(message, {
                    position: 'top-right',
                    autoClose: 1000,
                })
                this.getBillData();
            } else {
                this.$toast.error("There was an error while updating the bills", {
                    position: 'top-right',
                    autoClose: 3000,
                })
            }
        }
    }
}
</script>

<style>
.bill-list-table table tbody tr td:last-child {
    display: none;
    position: absolute;
    right: 0;
}

.bill-list-table table tbody tr:hover td:last-child {
    display: block;
}
</style>