<template>
    <div class="relative flex h-screen w-full flex-col overflow-x-hidden">
        <ReportSettingsHeader title="Edit Report">
            <template v-slot:button>
                <UButton color="transparent" variant="solid"
                :class="buttonStatus ? 'mb-[18px] ml-auto mr-[52px] w-fit rounded-[8px] border border-[#98A2B3] px-[14px] py-[8px] text-[#344054] shadow-md ring-0' : 'mb-[18px] ml-auto mr-[52px] w-fit rounded-[8px] border border-[#98A2B3] px-[14px] py-[8px] text-[#344054] shadow-md ring-0 disabled-button'" @click="saveReport()">
                Save Report
                </UButton>
            </template>
        </ReportSettingsHeader>
        <hr>
        <div class="flex h-screen w-full flex flex-col overflow-y-auto px-[40px]">
            <ReportsInnerHeader :title="'New report'" :fetch-report="fetchReport" />
            <hr>
            <div class="flex items-center p-5">
                <div class="basis-60 gap-5">
                    <h6 class="font-semibold">Report Title*</h6>
                    <sub class="text-gray-400">The report title will show up on the client report</sub>
                </div>
                <div class="mx-3 flex-1">
                    <UInput color="white" variant="outline" v-model="reportTitle" />
                </div>
            </div>
            <hr class="mx-5 border-gray-300 border border-t-[1px]">
            <div class="flex items-center p-5">
                <div class="basis-60 gap-5">
                    <h6 class="font-semibold">Recipients*</h6>
                    <sub class="text-gray-400">Enter recipients emails individually, or paste several separated by commas.</sub>
                </div>
                <div class="mx-3 flex-1">
                    <UInput color="white" variant="outline" v-model="recipientList" />
                </div>
            </div>
            <hr class="mx-5 border-gray-300 border border-t-[1px]">
            <div class="flex items-center p-5">
                <div class="basis-60 gap-5">
                    <h6 class="font-semibold">Recipient Logo*</h6>
                    <sub class="text-gray-400">Upload the logo of your recipient if available. This will be shown at the top of the report.</sub>
                </div>
                <div class="mx-3 flex-1">
                    <!-- files is an array of objects not empty show the image else show the upload button -->
                    <center>
                        <img v-if="recipientLogo" :src="recipientLogo" class="w-20 h-20 object-cover rounded-lg" />
                    </center>
                    <UiFileDropArea v-model="files" class="w-full h-20"  @change="handleFileChange"/>

                    
                </div>
            </div>
            <div class="flex items-center p-5">
                <div class="basis-60 gap-5">
                    <h6 class="font-semibold">Senders Logo*</h6>
                    <sub class="text-gray-400">Upload your logo. This will be shown at the top of the report.</sub>
                </div>
                <div class="mx-3 flex-1">
                    <!-- files is an array of objects not empty show the image else show the upload button -->
                    <center>
                        <img v-if="clientLogo" :src="clientLogo" class="w-20 h-20 object-cover rounded-lg" />
                    </center>
                    <UiFileDropArea v-model="clientfiles" class="w-full h-20"  @change="handleFileChange"/>

                    
                </div>
            </div>
            <hr class="mx-5 border-gray-300 border border-t-[1px]">
            <div class="flex p-5">
                <div class="basis-60 gap-5">
                    <h6 class="font-semibold">Generated Reports*</h6>
                    <sub class="text-gray-400">Select the types of reports you would like to generate.</sub>
                </div>
                <div class="mx-3 flex-1">
                    <div :class="weblink_selected ? 'p-4 rounded-lg bg-[rgb(0,0,0,0.05)] flex-1 border border-[rgb(0,0,0,0.3)] my-2' : 'p-4 rounded-lg flex-1 border my-2 bg-white'">
                        <UCheckbox v-model="weblink_selected" name="notifications" class="bg-transparent" color="gray">
                            <template #label>
                                <p>Live Weblink</p>
                                <p class="font-normal">This link will reflect real time changes to allow users to stay up to
                                    date
                                    throughout the
                                    legislative cycle.</p>
                            </template>
                        </UCheckbox>
                    </div>

                    <div :class="pdf_report_selected ? 'p-4 rounded-lg bg-[rgb(0,0,0,0.05)] flex-1 border border-[rgb(0,0,0,0.3)] my-2' : 'p-4 rounded-lg flex-1 border my-2 bg-white'">                    
                        <UCheckbox v-model="pdf_report_selected" name="notifications" class="bg-transparent" color="gray">
                            <template #label>
                                <p>PDF Report</p>
                                <p class="font-normal">Send a PDF report to the recipients.</p>
                            </template>
                        </UCheckbox>
                    </div>
                    <div :class="excel_selected ? 'p-4 rounded-lg bg-[rgb(0,0,0,0.05)] flex-1 border border-[rgb(0,0,0,0.3)] my-2' : 'p-4 rounded-lg flex-1 border my-2 bg-white'">
                        <UCheckbox v-model="excel_selected" name="notifications" class="bg-transparent" color="gray">
                            <template #label>
                                <p>DOC Report</p>
                                <p class="font-normal">Download a Doc File report.</p>
                            </template>
                        </UCheckbox>
                    </div>
                    <!--
                    <div :class="csv_selected ? 'p-4 rounded-lg bg-[rgb(0,0,0,0.05)] flex-1 border border-[rgb(0,0,0,0.3)] my-2' : 'p-4 rounded-lg flex-1 border my-2 bg-white'">
                        <UCheckbox v-model="csv_selected" name="notifications" class="bg-transparent" color="gray">
                            <template #label>
                                <p>CSV Report</p>
                                <p class="font-normal">Send a Excel report to the recipients.</p>
                            </template>
                        </UCheckbox>
                    </div>-->
                </div>
            </div>
            <hr class="mx-5 border-gray-300 border border-t-[1px]">
            <div class="flex p-5">
                <div class="basis-60 gap-5">
                    <h6 class="font-semibold">Custom Pages*</h6>
                    <sub class="text-gray-400">Theses additional pages can add more cotnext and help your clients navigate the
                        report.</sub>
                </div>
                <div class="mx-3 flex-1">
                    <div :class="coverpage_selected ? 'p-4 rounded-lg bg-[rgb(0,0,0,0.05)] flex-1 border border-[rgb(0,0,0,0.3)] my-2' : 'p-4 rounded-lg flex-1 border my-2 bg-white'">
                        <UCheckbox v-model="coverpage_selected" name="notifications" class="bg-transparent" color="gray">
                            <template #label>
                                <p>Cover Page</p>
                                <p class="font-normal">Includes Report name, your logo, the session and today’s date.</p>
                            </template>
                        </UCheckbox>
                    </div>
                    <div :class="contents_selected ? 'p-4 rounded-lg bg-[rgb(0,0,0,0.05)] flex-1 border border-[rgb(0,0,0,0.3)] my-2' : 'p-4 rounded-lg flex-1 border my-2 bg-white'">
                        <UCheckbox v-model="contents_selected" name="notifications" class="bg-transparent" color="gray">
                            <template #label>
                                <p>Table of Contents</p>
                                <p class="font-normal">Lists tracked bills and the page they where they can be found.</p>
                            </template>
                        </UCheckbox>
                    </div>
                    <div :class="comitte_selected ? 'p-4 rounded-lg bg-[rgb(0,0,0,0.05)] flex-1 border border-[rgb(0,0,0,0.3)] my-2' : 'p-4 rounded-lg flex-1 border my-2 bg-white'">
                        <UCheckbox v-model="comitte_selected" name="notifications" class="bg-transparent" color="gray">
                            <template #label>
                                <p>Committee Hearings and Calendars Page</p>
                                <p class="font-normal">Lists all selected bills that have been added to a calendar or are
                                    scheduled for a hearing.</p>
                            </template>
                        </UCheckbox>
                    </div>
                    <!--<div class=" p-4 rounded-lg bg-[rgb(0,0,0,0.05)] flex-1 border  border-[rgb(0,0,0,0.3)] my-2">
                        <UCheckbox v-model="selected" name="notifications" class="bg-transparent" color="gray">
                            <template #label>
                                <p>Separate Page Report</p>
                                <p class="font-normal">Send a separate-page report to the recipients.</p>
                            </template>
                        </UCheckbox>
                    </div>
                    <div class=" p-4 rounded-lg bg-[rgb(0,0,0,0.05)] flex-1 border  border-[rgb(0,0,0,0.3)] my-2">
                        <UCheckbox v-model="selected" name="notifications" class="bg-transparent" color="gray">
                            <template #label>
                                <p>Excel Report</p>
                                <p class="font-normal">Send a Excel report to the recipients.</p>
                            </template>
                        </UCheckbox>
                    </div>
                    <div class=" p-4 rounded-lg flex-1 border my-2 bg-white">
                        <UCheckbox v-model="selected" name="notifications" class="bg-transparent" color="gray">
                            <template #label>
                                <p>CSV Report</p>
                                <p class="font-normal">Send a Excel report to the recipients.</p>
                            </template>
                        </UCheckbox>
                    </div>-->
                </div>
            </div>
            <div class="flex p-5">
                <div class="basis-60 gap-5">
                    <h6 class="font-semibold">Organize By Tag*</h6>
                    <sub class="text-gray-400"></sub>
                </div>
                <div class="mx-3 flex-1">
                    <div :class="tag_selected ? 'p-4 rounded-lg bg-[rgb(0,0,0,0.05)] flex-1 border border-[rgb(0,0,0,0.3)] my-2' : 'p-4 rounded-lg flex-1 border my-2 bg-white'">
                        <UCheckbox v-model="tag_selected" name="notifications" class="bg-transparent" color="gray">
                            <template #label>
                                <p>Organize by Tag</p>
                                <p class="font-normal">Bills will be listed ordered numerically and prioritized by tags.</p>
                            </template>
                        </UCheckbox>
                    </div>
                </div>
            </div>
            <div class="flex p-5">
                <div class="basis-60 gap-5">
                    <h6 class="font-semibold">Bill Details*</h6>
                    <sub class="text-gray-400">Select what information you would like listed in the detailed breakdowns of each
                        bill. Drag to reorganize the sections.</sub>
                </div>
                <div class="mx-3 flex-1">
                    <div class="flex gap-2 p-4 rounded-lg flex-1 border my-2 items-center bg-white">
                        <UToggle v-model="sponsorsstate.toggleState" color="gray" />
                        <div class="mt-[-2px] self-start">
                            <p class="m-0 font-semibold mt-1">Sponsors</p>
                        </div>
                        <div class="ml-auto">
                            <UButton icon="i-mdi-drag-vertical" variant="ghost" class="text-3xl text-gray-700" />
                        </div>
                    </div>
                    <div class="flex gap-2 p-4 rounded-lg flex-1 border my-2 items-center bg-white">
                        <UToggle v-model="summarystate.toggleState" color="gray" />
                        <div class="mt-[-2px] self-start">
                            <p class="m-0 font-semibold mt-1">Summary</p>
                        </div>
                        <div class="ml-auto">
                            <UButton icon="i-mdi-drag-vertical" variant="ghost" class="text-3xl text-gray-700" />
                        </div>
                    </div>
                    <div class="flex gap-2 p-4 rounded-lg flex-1 border my-2 items-center bg-white">
                        <UToggle v-model="notestate.toggleState" color="gray" />
                        <div class="mt-[-2px] self-start">
                            <p class="m-0 font-semibold mt-1">Notes</p>
                        </div>
                        <div class="ml-auto">
                            <UButton icon="i-mdi-drag-vertical" variant="ghost" class="text-3xl text-gray-700" />
                        </div>
                    </div>
                    <div class="p-4 rounded-lg  border my-2  bg-white">
                        <div class="flex gap-2 flex-1 items-center">
                            <UToggle v-model="actionstate.toggleState" color="gray" />
                            <div class="mt-[-2px] self-start">
                                <p class="m-0 font-semibold mt-1">Actions</p>
                            </div>
                            <div class="ml-auto">
                                <UButton icon="i-mdi-drag-vertical" variant="ghost" class="text-3xl text-gray-700" />
                            </div>
                        </div>
                        <URadioGroup v-model="action_selected" class="p-4 rounded-lg flex-1 border my-2 bg-white"
                            :options="[{ value: 'LastAction', label: 'Last action' }]">
                            <template #label="{ option }">
                                <p> {{ option.label }}</p>
                            </template>
                        </URadioGroup>
                        <URadioGroup v-model="action_selected" class="p-4 rounded-lg flex-1 border my-2 bg-white"
                            :options="[{ value: 'FullHistory', label: 'Full History' }]">
                            <template #label="{ option }">
                                <p> {{ option.label }}</p>
                            </template>
                        </URadioGroup>
                        <URadioGroup v-model="action_selected" class="p-4 rounded-lg flex-1 border my-2 bg-white"
                            :options="[{ value: 'DateRange', label: 'DateRange' }]">
                            <template #label="{ option }">
                                <p> {{ option.label }}</p>
                            </template>
                        </URadioGroup>
                        <!-- <URadioGroup v-model="selected"
                            :options="[{ value: 'LastAction', label: 'Last action' }, { value: 'FullHistory', label: 'Full History' }, { value: 'DateRange', label: 'DateRange' }]"
                            model-value="selected">
                            <template #label="{ option }">
                                <p> {{ option.label }}</p>
                            </template>
                        </URadioGroup> -->
                    </div>
                </div>
            </div>

            <div class="flex p-5">
                <div class="basis-60 gap-5">
                    <h6 class="font-semibold">Tracking Lists*</h6>
                    <sub class="text-gray-400">Here are all the tracking lists you have selected to be part of the report. Please verify before generating your report.</sub>
                </div>
                <div class="mx-3 flex-1">
                    <!-- Loop through trackingLists array -->
                    <div v-for="trackingList in trackingLists" :key="trackingList.id" class="flex gap-2 p-4 rounded-lg flex-1 border my-2 items-center bg-white">
                        <div class="mt-[-2px] self-start">
                            <!-- Display the title from trackingList -->
                            <p class="m-0 font-semibold mt-1">{{ trackingList.name }}</p>
                        </div>
                        <div class="ml-auto">
                            <!-- Call deleteTrackingList method with the current trackingList's id -->
                            <UButton color="white" variant="solid" icon="i-heroicons-trash" class="!border-none ring-0" @click="deleteTrackingList(trackingList.id)" />
                        </div>
                    </div>
                </div>
            </div>



        </div>
    </div>
</template>



<script >
import { Document, Packer, Paragraph, TextRun, ImageRun, HeadingLevel, AlignmentType  } from "docx";

export default {
    name: "EditReport",
    data() {
        return {
            reportTitle: '',
            recipientList: '',
            weblink_selected: false,
            pdf_report_selected: false,
            excel_selected: false,
            csv_selected: false,
            coverpage_selected: false,
            contents_selected: false,
            comitte_selected: false,
            tag_selected: false,
            action_selected: '',
            files: [],
            clientfiles: [],
            clientLogo: '',
            recipientLogo: '',    
            trackingLists: [],
            excel_selected: false,
            pdf_report_selected: false,
            csv_selected: false,
            client_logo: '',
            userInfo: {},
            buttonStatus: false,
            generated_settings: {},
            contents: [],
        };
    },
    computed: {
        apiURL() {
            const { public: config } = useRuntimeConfig();
            return config.BACKEND_API_URL;
        },
        requiredFields(){
            //check that the required fields are not empty
            //title, recipient list, at least one report type, at least one custom page, at least one bill detail
            //at least one tracking list
            return (this.reportTitle && this.recipientList 
            && (this.weblink_selected || this.pdf_report_selected || this.excel_selected || this.csv_selected) 
            && (this.coverpage_selected || this.contents_selected || this.comitte_selected) 
            && (this.sponsorsstate.toggleState || this.summarystate.toggleState || this.notestate.toggleState || this.actionstate.toggleState) 
            && this.trackingLists.length > 0)
        }
    },
    created(){
        this.fetchReport()
    },
    methods: {
        deleteTrackingList(id) {
            // console.log(id)
            // Remove the trackingList from the trackingLists array
            this.trackingLists = this.trackingLists.filter(trackingList => trackingList.id !== id)
        },
        async fetchReport(){
            //get id from url
            let id = this.$route.params.id
            // Implement your fetch logic here
            await $fetch(`${this.apiURL}/reports_settings/${id}`) // Ensure apiURL is defined or accessible within setup
                .then(data => {
                    console.log(data)
                    this.reportTitle = data.report_title,
                    this.recipientList = data.recipient_emails,
                    this.recipientLogo = data.recipient_logo,
                    this.weblink_selected = data.is_report_type_live_weblink == 1 ? true : false,
                    this.pdf_report_selected = data.is_report_type_pdf == 1 ? true : false,
                    this.excel_selected = data.is_report_type_excel == 1 ? true : false,
                    this.csv_selected = data.is_report_type_csv == 1 ? true : false,
                    this.coverpage_selected = data.add_cover_page == 1 ? true : false,
                    this.contents_selected = data.add_committe_hearings_cal_page == 1 ? true : false,
                    this.comitte_selected = data.add_committe_hearings_cal_page == 1 ? true : false,
                    this.tag_selected = data.organize_by_tag == 1 ? true : false,
                    this.sponsorsstate.toggleState = data.add_sponsors == 1 ? true : false,
                    this.summarystate.toggleState = data.add_summary == 1 ? true : false,
                    this.notestate.toggleState = data.add_notes == 1 ? true : false,
                    this.actionstate.toggleState = data.add_actions == 1 ? true : false,
                    this.action_selected = data.add_actions_type,
                    this.trackingLists = data.lists,
                    this.clientLogo = data.client_logo
                    
                })
                .catch(error => {
                    console.error('Error fetching the report:', error);
                });
        },
        async saveReport(){
            //get id from url
            let id = this.$route.params.id
            // Implement your fetch logic here
            await $fetch(`${this.apiURL}/reports_settings/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    report_title: this.reportTitle,
                    recipient_emails: this.recipientList,
                    recipient_logo: this.recipientLogo,
                    is_report_type_live_weblink: this.weblink_selected ? 1 : 0,
                    is_report_type_pdf: this.pdf_report_selected ? 1 : 0,
                    is_report_type_excel: this.excel_selected ? 1 : 0,
                    is_report_type_csv: this.csv_selected ? 1 : 0,
                    add_cover_page: this.coverpage_selected ? 1 : 0,
                    add_committe_hearings_cal_page: this.contents_selected ? 1 : 0,
                    add_committe_hearings_cal_page: this.comitte_selected ? 1 : 0,
                    organize_by_tag: this.tag_selected ? 1 : 0,
                    add_sponsors: this.sponsorsstate.toggleState ? 1 : 0,
                    add_summary: this.summarystate.toggleState ? 1 : 0,
                    add_notes: this.notestate.toggleState ? 1 : 0,
                    add_actions: this.actionstate.toggleState ? 1 : 0,
                    add_actions_type: this.action_selected,
                    lists: this.trackingLists,
                    client_logo: this.clientLogo,
                    app_user_id: this.userInfo.id || 1,
                    add_table_of_contents: this.contents_selected ? 1 : 0,
                    add_sponsors_display_order: 1,
                    add_summary_display_order: 2,
                    add_notes_display_order: 3,
                    add_actions_display_order: 4,
                }),
            })
                .then(data => {
                    console.log(data)
                    this.$router.push('/report')
                })
                .catch(error => {
                    console.error('Error fetching the report:', error);
                });
        },
        // ... other methods ...
    },
    setup() {

        // Notes
        const notestate = reactive({
            toggleState: false,
        })
        const notesToggle = () => {
            notestate.toggleState = !notestate.toggleState
        }
        // action
        const actionstate = reactive({
            toggleState: false,
        })
        const actionToggle = () => {
            actionstate.toggleState = !actionstate.toggleState
        }
        // summary state
        const summarystate = reactive({
            toggleState: false,
        })
        const summaryToggle = () => {
            summarystate.toggleState = !summarystate.toggleState
        }
        // sponsor state
        const sponsorsstate = reactive({
            toggleState: false,
        })
        const sponsorToggle = () => {
            sponsorsstate.toggleState = !sponsorsstate.toggleState
        }
        
        return {
            notestate, notesToggle, actionstate, actionToggle, summarystate, summaryToggle,
            sponsorsstate, sponsorToggle
        }
    },
    watch: {
        requiredFields(newRequiredFields){
            console.log('newRequiredFields', newRequiredFields)
            this.buttonStatus = newRequiredFields
        },
        trackingLists(newTrackingLists){
            console.log('newTrackingLists', newTrackingLists)
        }
    }
    
}

</script>