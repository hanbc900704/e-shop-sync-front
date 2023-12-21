<template>
    <div>
        <div v-if="!addState" class="flex w-full cursor-pointer items-center justify-center rounded-[8px] bg-[#E9E9E9] py-[12px] active:translate-x-[1px] active:translate-y-[1px]" @click="addState=true">
            <img src="/images/document.svg" alt="document" width="20" height="20" />
            <span class="ht-14 ml-[8px] text-[#000000A0]">New Note</span> 
        </div>
        <section v-show="addState" class="rounded-lg border border-[#cdcdcd] bg-[rgb(0,0,0,0.03)] px-8 py-5">
            <div class="mb-[12px] flex items-center justify-between">
                <div class="flex items-center">
                    <div class="mr-[12px] block h-[40px] w-[40px] rounded-full bg-[#FFFFFFA0]">
                        <img v-if="userData.avatar" :src="userData.avatar" alt="avatar" class="h-full w-full rounded-full object-cover">
                    </div>
                    <div class="flex flex-col">
                        <span class="ht-14">{{ userData.first_name + " " + userData.last_name }}</span>
                        <span class="ht-14 text-[#00000080]">{{ new Date().toLocaleDateString() }}</span>
                    </div>
                </div>
            </div>
            <hr class="mb-[12px]">
            <Editor v-model="content" api-key="no-api-key" :init="{
                    toolbar_mode: 'sliding',
                    plugins: ['advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'],
                    toolbar: 'undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help',
                    menubar: false,
                }" initial-value="Please describe the Bill Details Note">
            </Editor>
            <div class="mt-5 flex">
                <UButton class="ml-auto bg-gradient-to-r from-[#757575] to-[#949494]" variant="solid" @click="publishNote()">Publish</UButton>
                <UButton class="ml-[24px] bg-gradient-to-r from-[#757575] to-[#949494]" variant="solid" @click="cancelPublishNote()">Cancel</UButton>
            </div>
        </section>
        
        <div class="h-divider my-[24px] bg-gray-300"></div>

        <div v-for="item, index in billNote" :key="index" class="mb-[24px] w-full border-b">
            <BillNoteEdit :display-order="item.displayOrder" :idx="item.id" 
                        :sender-name="userData.first_name + '' + userData.last_name" 
                        :send-date="item.last_updated" :sender-avata="item.avatar"
                        :content="item.bill_notes" @publish-note="(content) => onPublishEdited(content)"
                        @remove-note="(idx) => onRemoveNote(idx)" />
        </div>
    </div>
    
</template>

<script setup>
import Editor from '@tinymce/tinymce-vue'
</script>

<script>
export default {
    name: "BillContent",
    props: {
        billNote: {
            type: Array,   
            // eslint-disable-next-line vue/require-valid-default-prop
            default: []
        },
        billId: {
            type: String,
            default: ''
        }
    },
    emits: ['publishNote', 'publishEvent'],
    data() {
        return {
            addState: false,
            content: '',
        }
    },
    computed: {
        apiURL() {
            const { public: config } = useRuntimeConfig();
            return config.BACKEND_API_URL;
        },
        billID() {
            return this.$route.params.id
        },
        userData() {
            const userData = useCookie('userData'); // get token from cookies
            // console.log(userData.value)
            return userData.value
        }
    },
    methods: {
        publishNote() {
            const contents = {
                bill_notes: this.content,
                display_order: this.billNote.length + 1,
                app_user_id: this.userData.app_user_id || 1
            }
            this.$emit("publishNote", contents)
            this.addState = false;
        },
        cancelPublishNote() {
            this.content = "";
            this.addState = false;
        },
        async onPublishEdited(content) {
            const updated = content;
            updated.app_user_id = this.userData.app_user_id || 1
            updated.bill_id = this.billID;

            try {
                // Fetch data from the specified URL using the ID
                this.$toast.info('Publishing Bill Note', {
					position: 'top-right'
				});
                await $fetch(`${this.apiURL}/bill_notes`, {
                // await $fetch(`http://localhost:8000/python/bill_notes`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updated)
                });
                this.$toast.success('Bill Note Updated Successfully', {
					position: 'top-right'
				});
            } catch (error) {
                // Handle errors, if any
                console.error('An error occurred while fetching note:', error);
            }

            this.$emit('publishEvent')

        },
        async onRemoveNote(idx) {
            try {
                // Fetch data from the specified URL using the ID
                await fetch(`${this.apiURL}/bill_notes/${idx}`, {
                    method: 'DELETE'
                });
                this.$toast.success('Bill Note Deleted Successfully', {
					position: 'top-right'
				});
                // Store the fetched data in the 'detailDocument.info' property
            } catch (error) {
                // Handle errors, if any
                console.error('An error occurred while fetching note:', error);
            }
            this.$emit('publishEvent')
        }
    },
}
</script>