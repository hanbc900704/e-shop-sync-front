<template>
    <UTable class="rounded-lg border border-[#EAECF0] px-[12px]" :rows="filteredData" :columns="columns"
        sort-asc-icon="i-heroicons-arrow-up-20-solid" sort-desc-icon="i-heroicons-arrow-down-20-solid"
        :sort-button="{ icon: 'i-heroicons-arrows-up-down', size: 'sm' }">
        <template #fullname-data="{ row }">
            <div class="flex items-center">
                <div class="mr-4 h-12 w-12 rounded-full bg-[#CACACA]">
                    <img :src="row.avata" alt="avata" class="h-full w-full rounded-full object-cover object-top" />
                </div>
                <!-- <div class="mr-4 h-12 w-12 rounded-full bg-[#CACACA] overflow-hidden">
                    <img :src="row.avatar" alt="avatar" class="h-full w-full rounded-full object-cover"/>
                </div> -->

                <p v-if="row.chamber == 'House'" class="font-medium text-[#101828]"> Rep. {{ row.fullname }}</p>
                <p v-else class="font-medium text-[#101828]"> Sen. {{ row.fullname }}</p> 
            </div>
        </template>
        <!-- <template #contact-data="{ row }">
            <div class="flex items-center">
                <a :href="'tel:' + row.contact.phone" class="flex h-[40px] w-[40px] items-center justify-center">
                    <img src="/images/phone.svg" alt="avata" class="h-[20px] w-[20px]"/>
                </a>
                <a :href="'maleto:' + row.contact.email" class="flex h-[40px] w-[40px] items-center justify-center">
                    <img src="/images/email.svg" alt="avata" class="h-[20px] w-[20px]"/>
                </a>
            </div>
        </template> -->
        <template #district-data="{ row }">
            <div class="w-full text-right">
                {{ row.district }}
            </div>
        </template>
        <template #email-data="{ row }">
            <div class="w-full text-left">
                <a :href="'mailto:' + row.contact.email" style="color: #0066CC;"> {{ row.contact.email }}</a>
            </div>
        </template>
        <template #phone-data="{ row }">
            <div class="w-full text-left">
                <a :href="'tel:' + row.contact.phone" style="color: #0066CC;"> {{ row.contact.phone }} </a>
            </div>
        </template>
        <template #actions-data="{ row }">
            <RouterLink :to="'/legislature/' + row.id">
                <UButton color="white" variant="solid" icon="i-heroicons-chevron-right" class="!border-none ring-0" />
            </RouterLink>
        </template>
    </UTable>
</template>

<script>
export default {
    name: "LegislatureTable",
    props: {
        people: {
            type: Array,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: []
        },
        query: {
            type: String, 
            default: ''
        }
    },
    data() {
        return {
            
            columns: [{
                key: 'fullname',
                label: 'Lawmaker',
                class: "text-sm text-[#5B5B5B] w-[60%]",
                sortable: true,
            }, {
                key: 'party',
                label: 'Party',
                class: "text-sm text-[#5B5B5B]",
                sortable: true,
            }, {

                key: 'chamber',
                label: 'Chamber',
                class: "text-sm text-[#5B5B5B]",
                sortable: true,
            }, {
                key: 'district',
                label: 'District',
                class: "text-sm text-[#5B5B5B] text-right",
                sortable: true,
            }, {
                key: 'email',
                label: 'Email',
                class: "text-sm text-[#5B5B5B]",
                // sortable: true,

            }, {
                key: 'phone',
                label: 'Phone',
                class: "text-sm text-[#5B5B5B]"
            }, {
                key: 'actions',
                class: "w-[40px]"
            }],
            
        }

    },
    computed: {
        filteredData() {
            if (!this.query) {
                return this.people
            }

            return this.people.filter(item => {
                return String(item.fullname).toLowerCase().includes(this.query.toLowerCase())
            })
        }
    }

}
</script>

<style>
.legisture-list-table table tbody tr td:last-child {
    padding-left: 0;
}
</style>