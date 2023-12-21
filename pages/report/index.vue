<template>
    <div class="relative flex h-screen w-full flex-col overflow-x-hidden">
        <ReportHeader title="Reports" @on-query-change="(query) => updatedQuery(query)" />
        <hr>
        <div class="w-full px-[40px] pb-[24px] pt-[18px]">
            <div class="flex flex-wrap">
                <!--<div class="flex items-center justify-start">
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
                </div>-->
                <div class="ml-auto flex items-center">
                    <!-- <UBadge class="ht-14 mx-1 bg-transparent text-black">
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
                        Card
                    </UButton> -->
                    <UButton variant="ghost"
                        class="invisible mr-6 rounded-lg rounded-l-[0] border border-[#D9D9D9] px-4 py-2 text-black"
                        @click="toggleView(1)">
                        <img src="/images/card.svg" alt="list" width="20" height="20" />
                        Card
                    </UButton>
                    <UButton v-if="selectedRows.length > 0" color="transparent" variant="solid"
                        class="ml-auto  w-fit rounded-none border border-[#98A2B3] px-[14px] py-[8px] text-[#344054] shadow-md ring-0"
                        @click="deleteMutipleReports">
                        Delete selected
                    </UButton>
                </div>
            </div>
        </div>

        <div class="report-list-table flex flex-col overflow-auto px-[40px] ">
            <UTable v-if="!tabIndex" v-model="selectedRows" class="rounded-lg border border-[#EAECF0]" :rows="filteredData"
                :columns="columns" sort-asc-icon="i-heroicons-arrow-up-20-solid"
                sort-desc-icon="i-heroicons-arrow-down-20-solid"
                :sort-button="{ icon: 'i-heroicons-arrows-up-down', size: 'sm' }" @select="selectRow">

                <!-- Scoped Slot for reports.name -->
                <template #name-data="{ row }">
                    <span class="cursor-pointer" @click="onReportNameClick(row)">
                        {{ row.name }}
                    </span>
                </template>

                <!-- Other columns and template slots -->
                <template #action-data="{ row }">
                    <div class="house-cmte relative block h-full">
                        <!-- <p class="text-sm text-black">{{ row.house_cmte }}</p> -->
                        <div class="inline-grid grid-cols-3 items-center gap-2">
                            <!-- if row.is_report_type_live_weblink is 0 add "disabled-link" class -->
                            <UButton color="white" variant="solid" icon="i-mdi-link" class="!border-none ring-0"
                                :class="{ 'disabled-link': row?.is_report_type_live_weblink === 0 }"
                                @click="showWebReport(row)" />
                            <UButton color="white" variant="solid" icon="i-heroicons-trash" class="!border-none ring-0"
                                @click="deleteReport(row.id)" />
                            <UButton color="white" variant="solid" icon="i-heroicons-chevron-right"
                                class="!border-none ring-0" @click="reportDetailed(row.id, row)" />
                        </div>
                    </div>
                </template>
                <template #recipient-data="{ row }">
                    <span v-for="(recipient, index) in row.recipient" :key="index">
                        {{ recipient }}<span v-if="index < row.recipient.length - 1">, </span>
                    </span>
                </template>
            </UTable>
            <div v-else class="flex w-full flex-col">
                <div v-for="item, index in filteredData" :key="index" class="mb-[24px] w-full">
                    <ReportCard :report="item" :index="index" @report-detailed="() => reportDetailed(item.id, item)" />
                </div>
            </div>
        </div>
        <div class="z-1 absolute top-0 h-full w-[700px] border-l bg-white transition-[right] delay-150 ease-in-out"
            :class="{ 'right-[-100%]': !selectedReportId, 'right-0': selectedReportId }">
            <ReportRight :report="selectedReport" @on-close-pane="() => closePane()" />
        </div>
    </div>
</template>

<script>
// get_report

export default {
    name: "Report",
    data() {
        return {
            query: '',
            tabIndex: 0,
            filter: ['Type: House Bills', 'Status: First Read'],
            selectedItems: [],
            columns: [{
                key: 'name',
                label: 'Report Name',
                sortable: true,
            }, {
                key: 'contents',
                label: 'Contents',
                class: "text-sm text-[#5B5B5B]"
            }, {
                key: 'recipient',
                label: 'Recipient',
                class: "text-sm text-[#5B5B5B]"
            },
            {
                key: 'action',
                label: '',
                class: "text-sm text-[#5B5B5B]  w-[100px]"
            }],
            reports: [],

            selectedRows: [],
            selectedReportId: 0,
            selectedReport: {},
            loading: false,
        }
    },
    computed: {
        apiURL() {
            const { public: config } = useRuntimeConfig();
            return config.BACKEND_API_URL;
        },
        filteredData() {
            if (!this.query) {
                return this.reports;
            } 

            return this.reports.filter((item) => {
                return String(item.name).toLowerCase().includes(this.query.toLowerCase())
            })
        }
    },
    async mounted() {
        await this.fetchReports()
    },
    methods: {
        updatedQuery(query) {
            this.query = query
        },  
        async fetchReports() {
            this.loading = true;
            try {
                const reportsData = await $fetch(`${this.apiURL}/reports/1`);
                this.reports = reportsData;
                console.log('reports', this.reports)
            } catch (error) {
                console.error('Error fetching reports:', error);
                // Handle error appropriately
            } finally {
                console.log('Done fetching reports');
                this.loading = false;
            }

        },
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
        },
        toggleView(idx) {
            this.tabIndex = idx;
        },
        reportDetailed(id, obj) {
            // console.log(id, id, id)
            this.selectedReportId = id;
            this.selectedReport = obj
        },
        closePane() {
            this.selectedReportId = 0;
        },
        async deleteReport(id) {
            /* confirm with user */
            if (confirm("Are you sure you want to delete this report?")) {
                /* inactive this report using fetch */
                await $fetch(`${this.apiURL}/reports/${id}`, {
                    method: 'DELETE',
                });
                /* remove this report from the list */
                this.reports = this.reports.filter((report) => report.id !== id);
            }
        },
        async deleteMutipleReports() {
            const reportIds = []
            this.selectedRows.forEach(item => {
                reportIds.push(item?.id)
            })
            // Confirm with user
            if (confirm("Are you sure you want to delete these reports?")) {
                // Inactive these reports using fetch
                await $fetch(`${this.apiURL}/reports/multiple/`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "report_ids": reportIds }) // Send the array of IDs as JSON
                });

                // Remove these reports from the list
                this.reports = this.reports.filter(report => !reportIds.includes(report.id));
            }
        },
        showWebReport(report) {
            if (report.is_report_type_live_weblink === 1) {
                // open new tab
                window.open("/weblinkreport/" + report.id, "_blank");
            }
        },
        onReportNameClick(report) {
            this.$router.push(`/reports/edit/${report.id}`);
        }
    }
}
</script>
<style>
.report-list-table table tbody tr td:last-child {
    display: none;
    position: absolute;
    right: 0;
}

.report-list-table table tbody tr:hover td:last-child {
    display: block;
}
</style>