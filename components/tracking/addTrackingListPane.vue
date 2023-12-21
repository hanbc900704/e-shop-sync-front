<template>
    <div class="flex w-full flex-col p-[24px]">
        <div class="mb-[18px] flex flex-wrap items-center justify-between">
            <span class="ht-18 text-[#1D2939]">Create New Tracking List</span>
            <UButton variant="ghost" class="ht-18 !border-none bg-transparent text-[#1D2939] hover:bg-transparent"
                @click="closePane">
                <UIcon name="i-heroicons-x-mark" class="ml-1 text-[18px] font-semibold text-[#1D2939]" />
            </UButton>
            <!-- <button class="ht-18 !border-none bg-transparent text-[#1D2939]" @click="closePane">x</button> -->
        </div>

        <form @submit.prevent="handleSubmit">
            <div class="flex w-full flex-col items-start py-[16px]">
                <input v-model="title" class="w-full rounded-[8px] border px-[24px] py-[12px] text-gray-500" 
                    required placeholder="Title of the new tracking list"/>
                <!-- <UButton variant="solid" class="bg-[#EAECF0] text-[#344054]">Create List</UButton> -->
                <div class="self-center text-center">
                    <UButton icon="i-heroicons-folder-plus" label="Create List" variant="ghost" type="submit" 
                        class="mx-1 mt-6 rounded-sm border border-[#D9D9D9] px-4 py-2 text-black" :disabled="isLoading" />
                </div>
            </div>
        </form>

    </div>
</template>

<script>
export default {
    name: "AddTrackingListPane",
    props: {
        report: {
            type: Object,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: {}
        }
    },
    emits: ['onClosePane', 'form-success', 'form-failure'],
    // emits: ['onClosePane'],
    data() {
        return {
            columns: [{
                key: 'name',
                label: 'Lists',
                sortable: true,
            }, {
                key: 'bills',
                label: 'Tracked Billed',
                class: "text-sm text-[#5B5B5B]"
            },
            {
                key: 'action',
                label: '',
                class: "text-sm text-[#5B5B5B]  w-[100px]"
            }],
            selectedRows: [],
            query: "",
            title: "",
            isLoading: false,
        }
    },
    computed: {
        apiURL() {
            const { public: config } = useRuntimeConfig();
            return config.BACKEND_API_URL;
        },
        recipients() {
            if (this.report.recipient) {
                return Array.from(this.report.recipient).join(", ");
            }
            return ""
        },
        listCnt() {
            return this.report.lists && Array.from(this.report.recipient).length || 0
        },
        filteredRows() {
            if (this.report.lists) {
                if (!this.query) {
                    return this.report?.lists;
                }

                return this.report.lists.filter(list => {
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
            this.$emit('onClosePane')
        },
        selectRow(row) {
            const index = this.selectedRows.findIndex((item) => item.id === row.id)
            if (index === -1) {
                this.selectedRows.push(row)
            } else {
                this.selectedRows.splice(index, 1)
            }
        },
        async handleSubmit() {
            this.isLoading = true;
            try {
                const { data, error } = await useFetch(`${this.apiURL}/tracking_list/create/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ title: this.title }),
                });

                if (error.value) {
                    this.isLoading = false
                    this.$emit('form-failure')
                    console.error('Error submitting form:', error.value)
                } else {
                    this.isLoading = false
                    this.closePane()
                    console.log('Form submitted successfully:', data.value)
                    // Reset the form or perform other actions upon successful submission
                    this.title = ''
                    this.$emit('form-success')
                }
            } catch (err) {
                console.error('Error in form submission:', err)
            }
        }
    }
}
</script>