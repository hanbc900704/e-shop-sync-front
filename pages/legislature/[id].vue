<template>
    <div>
    <LegislatureProfileHeader to="/legislature" :title="title" />
    <hr>
    <div v-if="profile?.details" class="flex flex-col px-[40px] py-[20px]">
        <div class="mb-[24px] inline-flex w-fit rounded-lg bg-[#EAECF0] p-2">
            <div v-for="item, index in tabList" :key="index" class="mr-[8px] cursor-pointer rounded-lg px-[12px] py-[8px] text-[#667085]"
                :class="{'bg-white' : tabIndex === index}"
                @click="tabIndex = index">
                {{ item }}
            </div>
        </div>
        <div class="mb-[24px] flex flex-wrap">
            <div class="basis-8/12 pr-[18px]">
                <LegislatureProfileCard :profile="profile" />
            </div>
            <div class="basis-4/12 pl-[18px]">
                <LegislatureProfileLocation :location="profile?.userInfo?.location"/>
            </div>
        </div>
        <hr>
        <div v-if="tabIndex==0" class="mt-[24px] flex w-full flex-col">
            <LegislatureProfileCommittee :info="profile?.details.committees" class="mb-[24px]"/>
            <hr>
            <LazyLegislatureProfileBill :info="profile?.details.bills" class="mt-[24px]" />
        </div>
        <div v-else class="mt-[24px] flex w-full flex-col">
            <div class="flex w-full flex-col py-[12px]">
                <UButton v-if="!addNoteState" icon="i-heroicons-document-plus" variant="solid"
                    label="Add New Note" class="w-full bg-[#e2e2e2] py-[12px] font-medium text-black hover:bg-[#d8d8d8] active:translate-x-[1px] active:translate-y-[1px]" :trailing="false" block
                    @click="addNoteState=true"
                    />
                <div v-show="addNoteState" class="flex w-full flex-col">
                    <Editor v-model="addNoteValue" api-key="no-api-key" :init="{
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
                    <div class="flex flex-wrap justify-end py-[16px]">
                        <CommonLoading v-if="isloading" class="mr-[12px] h-[24px] w-[24px]" />
                        <UButton variant="solid" label="Publish"
                            class="mr-[12px] bg-[#e2e2e2] font-medium text-black hover:bg-[#d8d8d8]" :trailing="false" @click="addNoteToMember()"/>
                        <UButton variant="solid" label="Cancel"
                            class="bg-[#e2e2e2] font-medium text-black hover:bg-[#d8d8d8]" :trailing="false" @click="addNoteState=false" />
                    </div>
                </div>
            </div>
            <div v-for="item, index in profile?.note" :key="index" class="flex w-full flex-col py-[12px]">
                <LegislatureProfileNote :data="item" :idx="index"
                    @update-note="(noteId, content, idx) => updateNote(noteId, content, idx)" @delete-note="(noteId, idx) => deleteNote(noteId, idx)" />
            </div>
        </div>
    </div>
    </div>
</template>

<script setup>
import Editor from '@tinymce/tinymce-vue'
</script>

<script>
export default {
    name: "LegislatureProfile",
    data() {
        return {
            title: "Joseph Chaplik",
            tabList: ['Details', 'Notes'],
            tabIndex: 0,
            profile: {
            },
            addNoteState: false,
            addNoteValue: '',
            isloading: false
        }
    },
    computed: {
        apiURL() {
            const { public: config } = useRuntimeConfig();
            return config.BACKEND_API_URL;
        },
        memberId() {
            return this.$route.params.id;
        }
    },
     async mounted() {
        await this.fetchDetailLegislator();
    },
    methods: {
        async fetchDetailLegislator() {
            try {
                // Fetch data from the specified URL using the ID
                const response = await fetch(`${this.apiURL}/legislator_profile/${this.memberId}`);
                // const response = await fetch(`http://localhost:8000/python/legislator_profile/${this.memberId}`);
                // Store the fetched data in the 'detailDocument.info' property
                
                this.profile= await response.json();
                this.title = this.profile.userInfo.fullName;
                // console.log(this.profile);
            } catch (error) {
                // Handle errors, if any
                console.error('An error occurred while fetching documents:', error);
            }
        },
        async addNoteToMember() {
            // console.log(this.addNoteValue)
            if (!this.addNoteValue) {
                this.$toast.info('Please fill in the data',{
					position: 'top-right'
				})
                return;
            }
            this.isloading = true;
            try {
                const body = {
                    type: 'create',
                    note_id: 0,
                    member_id: this.memberId,
                    note: this.addNoteValue
                }
                await fetch(`${this.apiURL}/legislator_profile`,
                // await fetch(`http://localhost:8000/python/legislator_profile`, 
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body)
                });

                await this.fetchDetailLegislator();

                this.$toast.success('Create Successfull',{
					position: 'top-right'
				})
            } catch (error) {
                // Handle errors, if any
                console.error('An error occurred while publishing notes:', error);
                this.$toast.error('Publish Error',{
					position: 'top-right'
				})
            }
            this.addNoteValue = ''
            this.addNoteState = false
            this.isloading = false;
        },
        async updateNote(noteId, content, idx) {
            try {
                const body = {
                    type: 'update',
                    note_id: noteId,
                    member_id: this.memberId,
                    note: content
                }
                await fetch(`${this.apiURL}/legislator_profile`,
                // await fetch(`http://localhost:8000/python/legislator_profile`, 
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body)
                });
                console.log('update...', this.profile.note, this.profile.note[idx], idx)
                this.profile.note[idx].content = content;
                await this.fetchDetailLegislator();

                this.$toast.success('Update Note Successfull',{
					position: 'top-right'
				})
            } catch (error) {
                // Handle errors, if any
                console.error('An error occurred while publishing notes:', error);
                this.$toast.error('Publish Error',{
					position: 'top-right'
				})
            }
        },
        async deleteNote(noteId, idx) {
            try {
                await fetch(`${this.apiURL}/legislator_profile/${noteId}`, 
                // await fetch(`http://localhost:8000/python/legislator_profile/${noteId}`, 
                {
                    method: "DELETE",
                });
                this.profile.note.splice(idx, 1);

                await this.fetchDetailLegislator();
            } catch (error) {
                // Handle errors, if any
                console.error('An error occurred while deleting notes:', error);
                this.$toast.error('Publish Error',{
					position: 'top-right'
				})
            }
        }
    }
}
</script>