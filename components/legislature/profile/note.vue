<template>
    <div class="flex w-full flex-col">
        <div class="relative mb-[16px] flex flex-wrap items-center justify-between">
            <div class="relative flex items-center">
                <span class="ht-14 relative mr-[10px] text-[#6C6C6C]">{{ data.sendDate }}</span>
            </div>
            <div class="relative flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-[#e9e9e9]">
                <UDropdown :items="items(row)">
                    <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" class="hover:bg-gray-200 "/>
                </UDropdown>
            </div>
        </div>
        <div v-if="!editContent" class="ht-14 flex flex-wrap p-[12px] text-black">
            <p v-html="data.content" >
            </p>
        </div>
        <div v-else class="ht-14 flex flex-col p-[12px] text-black">
            <Editor v-model="content" api-key="no-api-key" :init="{
                    toolbar_mode: 'sliding',
                    plugins: ['advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'],
                    toolbar: 'undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help',
                    menubar: false,
                }" initial-value="Please describe the Bill Details Notes to add">
            </Editor>
            <div class="flex flex-wrap justify-end py-[16px]">
                <UButton variant="solid" label="Publish"
                    class="mr-[12px] bg-gradient-to-r from-[#757575] to-[#949494]" :trailing="false" @click="updateNoteProcess()"/>
                <UButton variant="solid" label="Cancel"
                    class="bg-gradient-to-r from-[#757575] to-[#949494]" :trailing="false" @click="editContent=false" />
            </div>
        </div>
    </div>
</template>

<script setup>
import Editor from '@tinymce/tinymce-vue'
</script>


<script>
export default {
    name: "ProfileNote",
    props: {
        data: {
            type: Object,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: {}
        },
        idx: {
            type: Number,
            default: 0
        }
    },
    emits: ["updateNote", "deleteNote"],
    data() {
        return {
            showCollapse: false,
            editContent: false,
            content: this.data?.content || ''
        }
    },
    computed: {
        noteId() {
            return this.data?.note_id || "";
        }
    },
    methods: {
        items(row) {
            return [
                [{
                    label: 'Edit',
                    icon: 'i-heroicons-pencil-square-20-solid',
                    click: () => {
                        this.editContent = true;
                    }
                }], [{
                    label: 'Delete',
                    icon: 'i-heroicons-trash-20-solid',
                    click: () => {
                        this.$emit("deleteNote", this.noteId, this.idx)
                    }
                }]
            ]
        },
        updateNoteProcess() {
            this.$emit("updateNote", this.noteId, this.content, this.idx)
            this.content = this.data?.content || '';
            this.editContent = false;
        }
    }
}
</script>
