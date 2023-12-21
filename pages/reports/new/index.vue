<template>
    <div class="relative flex h-screen w-full flex-col overflow-x-hidden">
        <ReportSettingsHeader title="New Report">
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
                    <sub class="text-gray-400">Upload the logo of your choice. This will be shown at the top of the report.</sub>
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
                    <sub class="text-gray-400">Theses additional pages can add more context and help your clients navigate the
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
                            <p class="m-0 font-semibold mt-1">{{ trackingList.title }}</p>
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
            recipientLogo: '',    
            clientfiles: [],
            clientLogo: '',
            trackingLists: this.$route.query.data ? JSON.parse(this.$route.query.data) : [],
            excel_selected: false,
            pdf_report_selected: false,
            csv_selected: false,
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
        this.showList(),
        console.log('files', this.files)
        const userData = useCookie('userData'); // get token from cookies
         console.log('userData', userData.value)
        if (userData.value) {
            this.clientLogo = userData.value.avatar;
        }
    },
    methods: {
        createCoverPage() {
            const date = new Date().toLocaleDateString(); // Format the date as needed

            return [
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `${this.generated_settings.first_name} ${this.generated_settings.last_name}`,
                            size: 36, // Larger font size
                            break: 1  // Adds a line break after this text
                        }),
                    ],
                    alignment: AlignmentType.CENTER
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `${this.generated_settings.report_title}`,
                            size: 32, // Slightly smaller than the name, but still large
                            break: 1  // Adds a line break after this text
                        }),
                    ],
                    alignment: AlignmentType.CENTER,
                    spacing: {
                        before: 200, // Adjust spacing as needed
                    }
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `${date}`,
                            size: 24, // Size for the date
                        }),
                    ],
                    alignment: AlignmentType.CENTER,
                    spacing: {
                        before: 200, // Adjust spacing as needed
                    }
                }),
                new Paragraph({
                    // This paragraph acts as a page break to start new content on the next page
                    children: [new TextRun('')],
                    pageBreakBefore: true
                })
            ];
        },
        createContentSections() {
            return this.contents.map(report => {
                const sections = [
                    new Paragraph({
                        text: `${report[0]} - ${report[2]}`,
                        heading: HeadingLevel.HEADING_1
                    })
                ];

                if (this.generated_settings.add_sponsors == 1) {
                    sections.push(...this.convertHTMLToParagraphs(`Sponsors: ${this.parseSponsors(report[1])}`));
                }

                if (this.generated_settings.add_summary == 1) {
                    sections.push(...this.convertHTMLToParagraphs(`Summary: ${report[3]}`));
                }

                if (this.generated_settings.add_notes == 1) {
                    sections.push(...this.convertHTMLToParagraphs(`Notes: ${report[4]}`));
                }

                return sections;
            }).flat();
        },
        createTableOfContent(){
            let content_list = [];

            let first_para = new Paragraph({
                children: [
                    new TextRun({
                        text: `Table of Contents`,
                        size: 36, // Larger font size
                        break: 1  // Adds a line break after this text
                    }),
                ],
                alignment: AlignmentType.CENTER
            });
            content_list.push(first_para);

            for (const report of this.contents){
                let paragraph = new Paragraph({
                    children: [
                        new TextRun({
                            text: `${report[0]} - ${report[2]}`,
                            size: 24, // Size for the title
                        }),
                    ],
                    alignment: AlignmentType.CENTER,
                    spacing: {
                        before: 200, // Adjust spacing as needed
                    }
                });
                content_list.push(paragraph);
            }

            let final = new Paragraph({
                // This paragraph acts as a page break to start new content on the next page
                children: [new TextRun('')],
                pageBreakBefore: true
            });

            content_list.push(final);

            return content_list;
        },
        convertHTMLToParagraphs(htmlString) {
            // Basic conversion: split by line breaks and make new paragraphs
            return htmlString.split('<br/>').map(text => {
                // Handle other HTML tags like <strong> if needed
                return new Paragraph(text.replace(/<[^>]+>/g, '')); // Strips HTML tags
            });
        },
        async fetchImageAsBase64(url) {
            //if url is https and main url is http then it will not work so we need to change the url to http
            if(url.includes('https') && !this.apiURL.includes('https')){
                url = url.replace('https', 'http');
            }
            
            console.log('fetching image', url)
            const options = {
                method: 'GET',
                mode: 'cors', // This ensures that CORS is handled correctly
                headers: {
                    'Content-Type': 'image/jpeg', // Adjust as necessary for the file type
                },
            };

            const response = await fetch(url, options);
            if (!response.ok) {
                console.error('HTTP error! status: ', response.status);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log('response', response)
            const blob = await response.blob();
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        },
        async generateDoc() {
            let cover = null;
            if(this.generated_settings.add_cover_page == 1){
                cover = this.createCoverPage();
            }

            let table_of_content = null;
            if(this.generated_settings.add_table_of_contents == 1){
                table_of_content = this.createTableOfContent();
            }

            let contentSections = null;
            if(this.generated_settings.add_committe_hearings_cal_page == 1){
                contentSections = this.createContentSections();
            }

            const clientLogoBase64 = await this.fetchImageAsBase64(this.clientLogo);
            console.log('clientLogoBase64', clientLogoBase64)
            const recipientLogoBase64 = await this.fetchImageAsBase64(this.recipientLogo);
            console.log('recipientLogoBase64', recipientLogoBase64)

            const doc = new Document({
                sections: [{
                    properties: {},
                    children: [
                        ...cover,
                        ...table_of_content,
                        new Paragraph({
                            children: [
                                new ImageRun({
                                    data: clientLogoBase64,
                                    transformation: {
                                        width: 100,  // Set width as required
                                        height: 100, // Set height as required
                                    },
                                }),
                                // You guys can add additional content or spacing here
                                new ImageRun({
                                    data: recipientLogoBase64,
                                    transformation: {
                                        width: 100,  // Set width as required
                                        height: 100, // Set height as required
                                    },
                                }),
                            ],
                        }),
                        ...contentSections
                    ],
                }],
            });

            const blob = await Packer.toBlob(doc);
            this.downloadBlob(blob, "Report" + this.generated_settings.report_title + ".docx");
        },

        downloadBlob(blob, filename) {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
            setTimeout(() => {
                this.$toast.info('Report Generated Successfully');
                this.$router.push('/report/');
            }, 2000);

        },
        showList(){
            console.log('tracking list new', this.trackingLists)
            //remove items from url
            this.$router.replace({ query: {} })
            console.log('tracking list new', this.trackingLists)
            
        },
        parseSponsors(sponsorsJson) {
            console.log('Parsing sponsors:', sponsorsJson);
            try {
                // Replace single quotes with double quotes and escape internal double quotes
                let jsonString = sponsorsJson.replace(/'/g, '"');
                jsonString = jsonString.replace(/"([^"]+)":\s*"([^"]+)"/g, (match, p1, p2) => {
                // Escape internal double quotes
                p2 = p2.replace(/"/g, '\\"');
                return `"${p1}": "${p2}"`;
                });
                
                const sponsorsData = JSON.parse(jsonString);
                console.log('Parsed sponsors:', sponsorsData);
                
                // Check if SPONSOR is an array, if not, make it an array
                const sponsorsArray = Array.isArray(sponsorsData.SPONSOR) ? sponsorsData.SPONSOR : [sponsorsData.SPONSOR];
                
                return sponsorsArray.map(sponsor => {
                return `<strong>${sponsor['@Display_Order']}. ${sponsor['@Member_Name']}</strong><br/>`;
                }).join('');
            } catch (e) {
                console.error('Error parsing sponsors:', e);
                return '';
            }
        },
        deleteTrackingList(id){
            // Filter the trackingLists array to remove the trackingList with the id passed in
            this.trackingLists = this.trackingLists.filter(trackingList => trackingList.id !== id)
        },
        async uploadImage(file) {
            console.log('file', file)
            const formData = new FormData();
            formData.append('image', file);

            try {
                // Send the formData to the server using $fetch
                const response = await this.$fetch(`${this.apiURL}/upload_recipient_logo`, {
                    method: 'POST',
                    body: formData
                    // Note: $fetch automatically sets the correct Content-Type for FormData
                });

                // Handle success
                console.log('response', response);
                this.recipientLogo = response.url;
            } catch (error) {
                console.error('Error uploading the image', error);
            }
        },
        handleFileChange(event) {
            // The event here is the native input event, which contains the file list
            const newFiles = event.target.files || event.dataTransfer.files;
            if (newFiles.length > 0) {
                this.uploadImage(newFiles[0]); // Assuming you want to upload the first file
            }
        },
        async saveReport(){
            console.log(this.trackingLists)
            let newReport = {
                app_user_id: this.$store?.state?.user?.id ? this.$store?.state?.user?.id : 1,
                report_title: this.reportTitle,
                recipient_emails: this.recipientList,
                recipient_logo: this.recipientLogo ? this.recipientLogo : '',
                is_report_type_live_weblink: this.weblink_selected,
                is_report_type_pdf: this.pdf_report_selected,
                is_report_type_excel: this.excel_selected,
                is_report_type_csv: this.csv_selected,
                add_cover_page: this.coverpage_selected,
                add_table_of_contents: this.contents_selected,
                add_committe_hearings_cal_page: this.comitte_selected,
                organize_by_tag: this.tag_selected,
                add_sponsors: this.sponsorsstate.toggleState,
                add_sponsors_display_order: 1,
                add_summary: this.summarystate.toggleState,
                add_summary_display_order: 2,
                add_notes: this.notestate.toggleState,
                add_notes_display_order: 3,
                add_actions: this.actionstate.toggleState,
                add_actions_display_order: 4,
                add_actions_type: this.action_selected,
                lists: this.trackingLists,
            };

            //if title is empty return
            if(!newReport.report_title){
                console.log('title is empty')
                return
            }

            console.log('newReport', newReport)

            const newId = await $fetch(`${this.apiURL}/reports`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newReport)
            });

            const report_settings = await fetch(`${this.apiURL}/reports_settings/${newId}`);
            console.log(report_settings);
            const report_settings_data = await report_settings.json();
            console.log(report_settings_data);
            this.generated_settings = report_settings_data;

            const getResponse = await fetch(`${this.apiURL}/weblinkreport/${newId}`);
            this.contents = await getResponse.json();
            console.log(this.contents);
            if(this.contents.length > 0 && this.generated_settings.is_report_type_excel && this.generated_settings.is_report_type_pdf){
                //open a new tab with the report at /pdfreport/id
                window.open(`/pdfreport/${newId}`, '_blank');
                this.generateDoc();
            }

            else if (this.contents.length > 0 && this.generated_settings.is_report_type_excel) {
                this.generateDoc();
            }
            else if(this.contents.length > 0 ){
                this.$toast.info('Report Generated Successfully');
                this.$router.push('/report/');
            }
        }
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
        files(newFiles) {
            console.log('newFiles', newFiles)
            if (newFiles.length > 0) {
                this.uploadImage(newFiles[0]); // we only will care about 1 file
            }
        },
        trackingLists(newTrackingLists){
            console.log('newTrackingLists', newTrackingLists)
        },
        requiredFields(newRequiredFields){
            console.log('newRequiredFields', newRequiredFields)
            this.buttonStatus = newRequiredFields
        }
    }
    
}

</script>