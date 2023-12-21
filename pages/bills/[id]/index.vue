<template>
    <div class="relative flex h-screen w-full flex-col overflow-x-hidden">
        <BillHeaderLevel1 :title="title" :to="'/bills'" :added-info="15" :infos="infos"
            @on-toggle-tracking="() => toggleTrackingPane()" />
        <hr>
        <div class="flex w-full">
            <div class="basis-9/12 border-r-[1px] border-solid border-[#E1E0E1] p-[24px]">
                <div class="flex flex-col">
                    <div class="mb-[30px] inline-flex w-fit rounded-lg bg-[#EAECF0] p-2">
                        <div v-for="item, index in tabList" :key="index"
                            class="mr-[8px] cursor-pointer rounded-lg px-[12px] py-[8px] text-[#667085]"
                            :class="{ 'bg-white': tabIndex === index }" @click="tabIndex = index">
                            {{ item.name }}
                        </div>
                    </div>
                    <div v-if="tabIndex == 0">
                        <BillContent :bill-summary="detailSummary" :bill-id="billID"
                            @publish-summary="(contents) => onPublishSummary(contents)"
                            @publish-event="() => fetchDetailSummary()" />
                    </div>
                    <div v-else-if="tabIndex == 1">
                        <BillNote :bill-note="detailNote" :bill-id="billID"
                            @publish-note="(contents) => onPublishNote(contents)" 
                            @publish-event="() => fetchDetailNotes()"/>
                    </div>
                    <div v-else-if="tabIndex == 2">
                        <BillHistory :histories="detailHistories" />
                    </div>
                    <div v-else-if="tabIndex == 3">
                        <BillDocuments :data="detailDocument" />
                    </div>
                    <div v-else-if="tabIndex == 4">
                        <BillSponsors :data="detailSponsors" />
                    </div>
                    <div v-else-if="tabIndex == 6">
                        <BillSponsors :data="detailCommittee" />
                    </div>
                    <div v-else-if="tabIndex == 5">
                        <BillCalendar :data="detailCalendar" />
                    </div>
                </div>
            </div>
            <div class="basis-3/12 p-[24px]">
                <TrackingRightPane :title="detailInfo.title" :sub-title="detailInfo.subTitle"
                    :sponsor-avata="detailInfo.sponsorAvata" :sponsor-name="detailInfo.sponsorName"
                    :sponsor-info="detailInfo.sponsorInfo" :title-list="detailInfo.titleList"
                    :action-name="detailInfo.actionName" :action-date="detailInfo.actionDate"
                    :progress-level="detailInfo.progressLevel" :assign-avata="detailInfo.assignAvata"
                    :assign-name="detailInfo.assignName" :session="detailInfo.session" :house-cmte="detailInfo.houseCmte"
                    :senate-cmte="detailInfo.senateCmte" :tags="detailInfo.tags" :list="detailInfo.list"
                    :alert-state="detailInfo?.alertState || false" :document="detailDocument.info">
                </TrackingRightPane>
            </div>
        </div>
        <BillTaskDetail :id="trackDetails.id" class="absolute right-0 top-0 max-w-[640px] border-b-2 border-l-2"
            :class="{ 'hideRightPane': showTrack === false }" :items="trackDetails.items" :title="trackDetails.title"
            :affected="trackDetails.affected" :action="trackDetails.action" :action-date="trackDetails.actionDate"
            :progress="trackDetails.progress" @on-toggle-tracking="() => toggleTrackingPane()" />
    </div>
</template>



<script>
export default {
    name: "BillsIDParam",
    data() {
        return {
            title: `${this.$route.params.id}`,
            infos: [
                // { 
                //     name: "Striker",
                //     type: "Alert"
                // },
                // { 
                //     name: "Amd. Adopted",
                //     type: ""
                // }
            ],
            tabList: [
                {
                    name: "Summary",
                },
                {
                    name: "Notes",
                },
                {
                    name: "History",
                },
                {
                    name: "Documents",
                },
                {
                    name: "Sponsors",
                },
                // {
                //     name: "Committees",
                // },
                {
                    name: "Calendar",
                }
            ],
            tabIndex: 0,
            detailSummary: [],
            detailNote: [],
            detailHistories: [],
            detailDocument: {
                columns: [
                    {
                        key: 'congress_person',
                        label: 'File Name'
                    },
                    {
                        key: 'chamber',
                        label: 'Format'
                    },
                    // {
                    //     key: 'district',
                    //     label: 'URL'
                    // },
                ],
                info: []
            },
            detailSponsors: {
                columns: [
                    {
                        key: 'congress_person',
                        label: 'Legislator',
                        // sortable: true,
                    },
                    {
                        key: 'chamber',
                        label: 'Chamber',
                        sortable: true,
                    },
                    {
                        key: 'district',
                        label: 'District',
                        sortable: true,
                    },
                ],
                info: []
            },
            detailCommittee: {
                columns: [
                    {
                        key: 'chamber',
                        label: 'Chamber'
                    },
                    {
                        key: 'committee',
                        label: 'Committee'
                    },
                ],
                info: []
            },
            detailInfo: [],
            showTrack: false,
            trackDetails: {
                // items: [
                //     { avata: "/images/9.jpg", clients: "Pharmaceutical Research Manufacturers of America", tbs: "101" },
                //     { avata: "/images/9.jpg", clients: "American Hospital Association", tbs: "3251" },
                //     { avata: "/images/9.jpg", clients: "Blue Cross/Blue Shield", tbs: "62" },
                //     { avata: "/images/9.jpg", clients: "Business Roundtable", tbs: "456" },
                //     { avata: "/images/9.jpg", clients: "NCTA The Internet Television Association", tbs: "99" },
                //     { avata: "/images/9.jpg", clients: "American Chamber of Commerce", tbs: "744" },
                //     { avata: "/images/9.jpg", clients: "National Association of Realtors", tbs: "653" },
                //     { avata: "/images/9.jpg", clients: "National Association of Realtors", tbs: "653" },
                // ],
                // id: "HB2003",
                // title: "corporate income tax; rates",
                // affected: ['9', '11', '33', '42'],
                // action: "Amendments",
                // actionDate: "Jul 9, 2023",
                // progress: 6
            },
            detailCalendar: []

        }
    },
    computed: {
        apiURL() {
            const { public: config } = useRuntimeConfig();
            return config.BACKEND_API_URL;
        },
        billID() {
            return this.$route.params.id
        }
    },
    async mounted() {
        await this.fetchDetailSummary();
        await this.fetchDetailNotes();
        await this.fetchDetailDocuments();
        await this.fetchDetailSponsors();
        await this.fetchDetailCommittees();
        await this.fetchDetailCalendar();
        await this.fetchDetailRightSideBar();
        await this.fetchDetailHistories();
    },
    methods: {
        toggleTrackingPane() {
            this.showTrack = !this.showTrack;
        },
        async fetchDetailNotes() {
            try {
                // Fetch data from the specified URL using the ID
                const response = await fetch(`${this.apiURL}/bill_notes/${this.billID}`);
                // const response = await fetch(`http://localhost:8000/python/bill_notes/${this.billID}`);
                // Store the fetched data in the 'detailDocument.info' property
                this.detailNote = await response.json();
                // console.log('this.detailNote', this.detailNote)
            } catch (error) {
                // Handle errors, if any
                console.error('An error occurred while fetching document:', error);
            }
        },
        async onPublishNote(contents) {
            try {
                const bodyContent = contents;
                bodyContent.bill_id = this.billID;
                bodyContent.id = 0;
                // Fetch data from the specified URL using the ID
                this.$toast.info('Publishing Bill Note', {
                    position: 'top-right'
                });

                // Fetch data from the specified URL using the ID
                await $fetch(`${this.apiURL}/bill_notes`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bodyContent)
                });

                await this.fetchDetailNotes();

                this.$toast.success('Bill Note Updated Successfully', {
                    position: 'top-right'
                });
            } catch (error) {
                // Handle errors, if any
                console.error('An error occurred while fetching note:', error);
            }
        },
        async fetchDetailDocuments() {
            try {
                // Fetch data from the specified URL using the ID
                const response = await fetch(`${this.apiURL}/bill_documents/${this.billID}`);
                // Store the fetched data in the 'detailDocument.info' property
                this.detailDocument.info = await response.json();
            } catch (error) {
                // Handle errors, if any
                console.error('An error occurred while fetching documents:', error);
            }
        },
        async fetchDetailSponsors() {
            try {
                // Fetch data from the specified URL using the ID
                const response = await fetch(`${this.apiURL}/bill_sponsors/${this.billID}`);
                // Store the fetched data in the 'detailSponsors.info' property
                this.detailSponsors.info = await response.json();
            } catch (error) {
                // Handle errors, if any
                console.error('An error occurred while fetching sponsors:', error);
            }
        },
        async fetchDetailCommittees() {
            try {
                // Fetch data from the specified URL using the ID
                const response = await fetch(`${this.apiURL}/bill_committee/${this.billID}`);
                // Store the fetched data in the 'detailCommittee.info' property
                this.detailCommittee.info = await response.json();
            } catch (error) {
                // Handle errors, if any
                console.error('An error occurred while fetching committees:', error);
            }
        },
        async fetchDetailCalendar() {
            try {
                // Fetch data from the specified URL using the ID
                const response = await fetch(`${this.apiURL}/bill_calendar/${this.billID}`);
                // Store the fetched data in the 'detailCalendar' property
                this.detailCalendar = await response.json();
            } catch (error) {
                // Handle errors, if any
                console.error('An error occurred while fetching calendar:', error);
            }
        },
        async fetchDetailRightSideBar() {
            try {

                // Fetch data from the specified URL using the ID
                const response = await fetch(`${this.apiURL}/right_side_bar/${this.billID}`);
                // Store the fetched data in the 'detailInfo' property
                this.detailInfo = await response.json();
                this.title = this.billID + ' ' + this.detailInfo.subTitle;

            } catch (error) {
                // Handle errors, if any
                console.error('An error occurred while fetching right sidebar data:', error);
            }
        },
        async fetchDetailHistories() {
            try {
                // Fetch data from the specified URL using the ID
                const response = await fetch(`${this.apiURL}/bill_history/${this.billID}`);
                // Store the fetched data in the 'detailHistories' property
                this.detailHistories = await response.json();
                // console.log('*************************************************************', this.detailHistories)
            } catch (error) {
                // Handle errors, if any
                console.error('An error occurred while fetching histories:', error);
            }
        },
        async fetchDetailSummary() {
            try {
                // Fetch data from the specified URL using the ID
                const response = await fetch(`${this.apiURL}/bill_summary/${this.billID}`);
                // const response = await fetch(`${this.apiURL}/bill_summary_latest/${this.billID}`);
                // Store the fetched data in the 'detailDocument.info' property
                this.detailSummary = await response.json();
                console.log('this.detailSummary', this.detailSummary);
            } catch (error) {
                // Handle errors, if any
                console.error('An error occurred while fetching summary:', error);
            }
        },
        async onPublishSummary(contents) {
            try {
                const bodyContent = contents;
                bodyContent.bill_id = this.billID;
                bodyContent.id = 0;
                // Fetch data from the specified URL using the ID
                this.$toast.info('Publishing Bill Summary', {
                    position: 'top-right'
                });
                await $fetch(`${this.apiURL}/bill_summary`, {
                    // await $fetch(`http://localhost:8000/python/bill_summary`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bodyContent)
                });
                await this.fetchDetailSummary();
                this.$toast.success('Bill Summary Updated Successfully', {
                    position: 'top-right'
                });
            } catch (error) {
                // Handle errors, if any
                console.error('An error occurred while fetching summary:', error);
            }
        }
    }
}
</script>

<style scoped>
.hideRightPane {
    width: 0 !important;
    height: 100vh;
    overflow: hidden;
    padding-left: 0 !important;
    padding-right: 0 !important;
    -webkit-transition: width 0.2s ease-in-out, padding 0.2s ease-in-out;
    -moz-transition: width 0.2s ease-in-out, padding 0.2s ease-in-out;
    -o-transition: width 0.2s ease-in-out, padding 0.2s ease-in-out;
    transition: width 0.2s ease-in-out, padding 0.2s ease-in-out;
}
</style>
