<template>
    <div class="flex w-full flex-col">
        <span class="ht-20 mb-[32px] font-semibold text-[#101828]">Manage Your Team</span>

        <div class="group relative mb-[16px] flex h-full w-36 items-center lg:w-[320px]">
            <svg
                class="pointer-events-none absolute left-0 ml-4 hidden h-4 w-4 fill-current text-gray-500 group-hover:text-gray-400 sm:block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
            >
                <path
                    d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
                />
            </svg>
            <input
                v-model="query"
                type="text"
                class="block w-full rounded-[8px] border border-[#D0D5DD] bg-white py-[10px] pl-10 pr-[14px] leading-normal text-gray-400 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.1)] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search Users"
            />
        </div>

        <div class="flex border-t-[2px] border-t-[#EAECF0] py-[16px]">
            <div class="flex basis-3/12 flex-col pr-[24px]">
                <span class="ht-16 text-[#1D2939]">Admins</span>
                <span class="ht-14 text-[#475467]">Admins can add, remove, invite, and manage organization level settings</span>
            </div>
            <div class="basis-9/12">
                <UTable v-model="selectedRows" class="rounded-lg" :rows="filteredAdmins" :columns="columns"
                            sort-asc-icon="i-heroicons-arrow-up-20-solid" sort-desc-icon="i-heroicons-arrow-down-20-solid"
                            :sort-button="{ icon: 'i-heroicons-arrows-up-down', size: 'sm' }"  @select="selectRow">
                    <template #user-data="{ row }">
                        <div class="flex items-center">
                            <div class="mr-4 h-12 w-12 rounded-full bg-[#CACACA]">
                                <img v-if="row.avatar" :src="row.avatar" alt="avatar" class="h-full w-full rounded-full object-cover"/>
                            </div>
                            <div class="flex flex-col">
                                <p class="ht-14 text-[#344054]">{{ row.fullname }}</p>
                                <p class="ht-12 text-[#344054]">{{ row.email }}</p>
                            </div>
                        </div>
                    </template>
                    <template #status-data="{ row }">
                        <div class="flex items-center">
                            <div class="mr-[6px] h-[12px] w-[12px] rounded-full" :class="{'bg-[#32D583]':row.status=='Active', 'bg-[#EAECF0]':row.status!='Active'}"></div>
                            <span>{{ row.status }}</span>
                        </div>
                    </template>
                    <template #actions-data="{ row }">
                        <div class="relative flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-[#e9e9e9]">
                            <UDropdown :items="items(row)">
                                <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" class="hover:bg-gray-200 "/>
                            </UDropdown>
                        </div>
                    </template>
                </UTable>
            </div>
        </div>
        <div class="flex border-t-[2px] border-t-[#EAECF0] py-[16px]">
            <div class="flex basis-3/12 flex-col pr-[24px]">
                <span class="ht-16 text-[#1D2939]">Users</span>
                <span class="ht-14 text-[#475467]">These users have access to your tracking lists, all bills, and notes.</span>
            </div>
            <div class="basis-9/12">
                <UTable v-model="selectedRowUsers" class="rounded-lg" :rows="filteredUsers" :columns="columns"
                            sort-asc-icon="i-heroicons-arrow-up-20-solid" sort-desc-icon="i-heroicons-arrow-down-20-solid"
                            :sort-button="{ icon: 'i-heroicons-arrows-up-down', size: 'sm' }"  @select="selectRowUsers">
                    <template #user-data="{ row }">
                        <div class="flex items-center">
                            <div class="mr-4 h-12 w-12 rounded-full bg-[#CACACA]">
                                <img v-if="row.avatar" :src="row.avatar" alt="avatar" class="h-full w-full rounded-full object-cover"/>
                            </div>
                            <div class="flex flex-col">
                                <p class="ht-14 text-[#344054]">{{ row.fullname }}</p>
                                <p class="ht-12 text-[#344054]">{{ row.email }}</p>
                            </div>
                        </div>
                    </template>
                    <template #status-data="{ row }">
                        <div class="flex items-center">
                            <div class="mr-[6px] h-[12px] w-[12px] rounded-full" :class="{'bg-[#32D583]':row.status=='Active', 'bg-[#EAECF0]':row.status!='Active'}"></div>
                            <span>{{ row.status }}</span>
                        </div>
                    </template>
                    <template #actions-data="{ row }">
                        <div class="relative flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-[#e9e9e9]">
                            <UDropdown :items="items(row)">
                                <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" class="hover:bg-gray-200 "/>
                            </UDropdown>
                        </div>
                    </template>
                </UTable>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SettingsTeam",
    props: {
        admins: {
            type: Array,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: []
        },
        users: {
            type: Array,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: []
        }
    },
    data() {
        return {
            query: "",
            columns: [{
                key: 'user',
                label: 'User',
                class: "text-left text-sm text-[#344054] w-[50%]",
            }, {
                key: 'date',
                label: 'Date Added',
                class: "text-left text-sm text-[#344054]",
                sortable: true,
            }, {
                key: 'actions',
                class: "w-[40px]"
            }],
            selectedRows: [],
            selectedRowUsers: [],
            selectedItems: [],
        }
    },
    computed: {
        filteredAdmins() {
            if (this.query === "") {
                return this.admins
            } 

            return this.admins.filter((admin) => {
                return String(admin.email).toLowerCase().includes(this.query.toLowerCase())
            })
        },
        filteredUsers() {
            if (this.query === "") {
                return this.users
            } 

            return this.users.filter((user) => {
                return String(user.email).toLowerCase().includes(this.query.toLowerCase())
            })
        }
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
        },
        selectRowUsers(row) {
            const index = this.selectedRowUsers.findIndex((item) => item.id === row.id)
            if (index === -1) {
                this.selectedRowUsers.push(row)
            } else {
                this.selectedRowUsers.splice(index, 1)
            }
        },
        items(row) {
            return [
                [{
                    label: 'Edit',
                    icon: 'i-heroicons-pencil-square-20-solid',
                    click: () => console.log('Edit', row.id)
                }], [{
                    label: 'Delete',
                    icon: 'i-heroicons-trash-20-solid'
                }]
            ]
        } 
    }
}
</script>