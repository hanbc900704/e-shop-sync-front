<template>
    <div class="bd-wrapper flex w-full flex-col">
        <div class="bd-wrapper-sender relative mb-[16px] flex flex-wrap items-center justify-between">
            <div class="relative flex items-center">
                <img :src="senderAvata" alt="senderAvata" width="40" height="40" class="relative mr-[10px] rounded-[50%]" />
                <span class="ht-14 relative mr-[10px] text-black">{{ senderName }}</span>
                <span class="ht-14 relative mr-[10px] text-[#6C6C6C]">• {{ sendDate }}</span>
            </div>
            <div v-if="!editContent" class="relative flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-[#e9e9e9]">
                <UDropdown :items="items(row)">
                    <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" class="hover:bg-gray-200 "/>
                </UDropdown>
            </div>
        </div>
        <div class="bd-wrapper-recv mb-[24px] flex flex-wrap items-center">
            <span class="ht-14 mr-[16px] text-[#6C6C6C]">To: </span>
            <span class="ht-14 mr-[16px] text-[#6C6C6C]">{{ receiverName }}</span>
        </div>
        <div v-if="!editContent" class="bd-wrapper-content ht-14 flex flex-wrap text-black">
            <p v-html="content">
            </p>
        </div>
        <div v-else class="flex w-full flex-col">
            <Editor v-model="updatedContent" api-key="no-api-key" :init="{
                    toolbar_mode: 'sliding',
                    plugins: ['advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'],
                    toolbar: 'undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help',
                    menubar: false,
                }" initial-value="Please describe the Bill Details Summary">
            </Editor>
            <div class="mt-5 flex">
                <UButton class="ml-auto bg-gradient-to-r from-[#757575] to-[#949494]" variant="solid" @click="publishSummary()">Publish</UButton>
                <UButton class="ml-[24px] bg-gradient-to-r from-[#757575] to-[#949494]" variant="solid" @click="cancelPublishSummary()">Cancel</UButton>
            </div>
        </div>
    </div>
</template>


<script setup>
import Editor from '@tinymce/tinymce-vue'
</script>


<script>
export default {
    name: "BillDetail",
    props: {
        senderName: {
            type: String,
            default: ""
        },
        sendDate: {
            type: String,
            default: ""
        },
        senderAvata: {
            type: String,
            default: "/images/sw-logo.png"
        },
        receiverName: {
            type: String,
            default: ""
        },
        content: {
            type: String,
            default: ""
        }, 
        displayOrder: {
            type: Number, 
            default: 1
        },
        idx: {
            type: Number,
            default: 0
        }
    },
    emits: ['publishSummary', 'removeSummary'],
    data() {
        return {
            showCollapse: false,
            editContent: false,
            updatedContent: this.content
        }
    },
    methods: {
        toggleCollapse() {
            this.showCollapse = !this.showCollapse;
        },
        items(row) {
            return [
                [{
                    label: 'Edit',
                    icon: 'i-heroicons-pencil-square-20-solid',
                    click: () => {this.editContent = true}
                }], [{
                    label: 'Delete',
                    icon: 'i-heroicons-trash-20-solid',
                    click: () => this.removeSummary()
                }]
            ]
        },
        publishSummary() {
            const content = {
                id: this.idx,
                recipient: 'Everyone',
                bill_summary: this.updatedContent,
                display_order: 1
            }
            this.$emit('publishSummary', content)
            this.editContent = false
        },
        cancelPublishSummary() {
            this.updatedContent = this.content;
            this.editContent = false
        },
        removeSummary() {
            this.$emit('removeSummary', this.idx)
        }
    }

}
</script>
