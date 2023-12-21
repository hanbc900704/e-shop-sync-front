<template>
    <div class="flex h-screen w-full flex-col">
        <TrackingHeader :title="'TrackingList (' + people.length + ')'" />
        <hr>
        <div class="w-full px-[40px] pb-[24px] pt-[18px] ">
            <div class="flex flex-wrap">
                <div class="flex items-center justify-start">
                    <USelectMenu v-model="selectedItems" class="custom-select-menu" variant="ghost" :options="filter"
                        icon="null" multiple>
                        <UButton class="bg-transparent pl-0 text-black shadow-none hover:bg-transparent">
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
                <div class="ml-auto">
                    
                    <UButton v-if="selectedRows.length > 0" variant="ghost" 
                        class="mx-1 rounded-sm border border-[#D9D9D9] px-4 py-2 text-black" 
                        @click="removeSelected()">
                        Remove Selected
                    </UButton>
                    <UButton variant="ghost" class="mx-1 rounded-sm border border-[#D9D9D9] px-4 py-2 text-black"
                        @click="createReport()">
                        Create Report
                    </UButton>
                    <UButton variant="ghost" class="mx-1 rounded-sm border border-[#D9D9D9] px-4 py-2 text-black">
                        Mark Read
                    </UButton>
                    <UButton variant="ghost"
                        class="after:content after-mr-2 relative mx-1 rounded-sm border border-[#D9D9D9] px-4 py-2 text-black after:absolute after:-right-5 after:block after:h-full after:w-0.5 after:bg-[#E1E0E1]">
                        Export CSV
                    </UButton>
                    <UButton icon="i-heroicons-folder-plus" variant="ghost"
                        class="relative top-1 ml-6 self-center rounded-sm text-[#5C5C5C]" @click="toggleAddTracking">
                        New List
                    </UButton>
                </div>
            </div>
        </div>
        <UTable v-model="selectedRows" class="rounded-lg border border-[#EAECF0] px-[40px]" :rows="people"
            :columns="columns" sort-asc-icon="i-heroicons-arrow-up-20-solid"
            sort-desc-icon="i-heroicons-arrow-down-20-solid"
            :sort-button="{ icon: 'i-heroicons-arrows-up-down', size: 'sm' }" @select="selectRow">

            <template #title-data="{ row }">
                <div class="flex items-center gap-4">
                    <div v-if="row.avata" class="h-12 w-12 rounded-full bg-[#CACACA]">
                        <img :src="row.avata" alt="avata" class="h-full w-full rounded-full object-cover" />
                    </div>
                    <p class="font-medium text-[#101828]">{{ row.title }}</p>
                </div>
            </template>
            <template #insert_date-data="{ row }">
                {{ formatDate(row.insert_date) }}
            </template>
            <template #actions-data="{ row }">
                <UDropdown>
                    <RouterLink :to="'/trackinglists/' + row.id">
                        <UButton color="white" variant="solid" icon="i-heroicons-chevron-right"
                            class="!border-none ring-0" />
                    </RouterLink>
                </UDropdown>
            </template>
        </UTable>
        <div class="z-1 absolute top-0 h-full w-[700px] border-l bg-white transition-[right] delay-150 ease-in-out"
            :class="{ 'right-[-100%]': !istrackingPaneOpen, 'right-0': istrackingPaneOpen }">
            <TrackingAddTrackingListPane @on-close-pane="() => toggleAddTracking()" @form-success="handleFormSuccess"
                @form-failure="handleFormFailure" />
        </div>
    </div>
</template>
<script>
export default {
    name: "TrackingLists",
    data() {

        return {
            columns: [{
                key: 'title',
                label: 'Tracking Lists',
                sortable: true,
            }, {
                key: 'insert_date',
                label: 'Create Date',
                class: "text-sm text-[#5B5B5B]"
            }, {
                key: 'bill_count',
                label: 'Bills Tracked',
                class: "text-sm text-[#5B5B5B]"
            }, {
                key: 'actions',
                class: "w-[40px]"
            }],
            people: [],
            istrackingPaneOpen: false,
            filter: ['Type: House Bills', 'Status: First Read'],
            selectedItems: [],
            selectedRows: [],
        }
    },
    computed: {
        apiURL() {
            const { public: config } = useRuntimeConfig();
            return config.BACKEND_API_URL;
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        formatDate(dateString) {
            const options = { day: 'numeric', month: 'short', year: 'numeric' };
            return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
        },
        async fetchData(){
            const appUserId = 1;
            const data = await $fetch(`${this.apiURL}/tracking_list/${appUserId}`);
            // Assuming the data is an object with keys, and each key has an object as its value
            const result = Object.keys(data).map(key => data[key]);

            this.people = result;
            console.log('people', this.people)
            
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
            this.$router.push('/trackinglists/' + row.id)
        },
        toggleAddTracking() {
            this.istrackingPaneOpen = !this.istrackingPaneOpen
        },
        async handleFormSuccess() {
            await this.fetchData();
            this.$toast.success('Successfully created new tracking list', {
                position: 'top-right'
            })
        },
        handleFormFailure() {
            this.$toast.error('Error submitting the form', {
                position: 'top-right'
            })
        },
        createReport() {
            this.$toast.success('Adding this tracking list to a new report...', {
                position: 'top-right'
            })
            const trackingListInfo = this.selectedRows.map((item) => {
                return {
                    title: item.title,
                    id: item.id
                }
            })
            setTimeout(() => {
                this.$router.push({ path: '/reports/new', query: { data: JSON.stringify(trackingListInfo) } });
                // this.$route.query.data
            }, 2000)
        },
        async removeSelected() {
            this.$toast.info('Processing...', {
                position: 'top-right',
                autoClose: 500
            })
            
            try {
                const selectedLists = this.selectedRows.map(item => {
                    return item.id
                })
                console.log('selectedLists... remove...', selectedLists);

                await $fetch(`${this.apiURL}/tracking_list/remove`,  {
                // await $fetch(`http://localhost:8000/python/tracking_list/remove`,  {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        lists: selectedLists
                    })
                });
                await this.fetchData();
                this.$toast.success('Successfully removed the selected List(s).', {
                    position: 'top-right'
                })
            } catch(err) {
                console.error('Error occurred during remove tracking lists', err)
            }

        }
    }
}
</script>
