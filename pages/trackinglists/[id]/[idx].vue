<template>
    <div class="flex h-screen w-full flex-col">
        <TrackingHeaderLevel2 :title="title" :to="'/trackinglists/' + $route.params.id" :added-info="15" :infos="infos" />
        <hr>
        <div class="flex w-full">
            <div class="basis-9/12 border-r-[1px] border-solid border-[#E1E0E1] p-[24px]">
                <div class="flex flex-col">
                    <div class="mb-[30px] inline-flex w-fit rounded-lg bg-[#EAECF0] p-2">
                        <div v-for="item, index in tabList" :key="index"
                            class="mr-[8px] cursor-pointer rounded-lg px-[12px] py-[8px] text-[#667085]"
                            :class="[tabIndex == index ? 'bg-white' : '']" @click="tabIndex = index">
                            {{ item.name }}
                        </div>
                    </div>
                    <div v-if="tabIndex == 0">
                        <BillContent />
                    </div>
                    <div v-else-if="tabIndex == 1">
                        <BillNote />
                    </div>
                    <div v-else-if="tabIndex == 2">
                        <BillHistory :histories="detailHistories" />
                    </div>
                    <div v-else-if="tabIndex == 3">
                        <BillDocuments :data="detailDocument" />
                    </div>
                    <div v-else-if="tabIndex == 4">
                        <BillDocuments :data="detailDocument" />
                    </div>
                    <div v-else-if="tabIndex == 5">
                        <BillDocuments :data="detailCommittee" />
                    </div>
                    <div v-else-if="tabIndex == 6">
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
                    :senate-cmte="detailInfo.senateCmte" :tags="detailInfo.tags" :lists="detailInfo.lists">
                </TrackingRightPane>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "TrackingListsIDParam",
    data() {
        return {
            title: "HB2003 editable short title for clarity or brevity",
            infos: [
                {
                    name: "Striker",
                    type: "Alert"
                },
                {
                    name: "Amd. Adopted",
                    type: ""
                }
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
                {
                    name: "Committees",
                },
                {
                    name: "Calendar",
                }
            ],
            tabIndex: 0,
            detailSummary: [
                {
                    postInfo: {
                        avatar: '/images/9.jpg',
                        name: 'Jessie Lake',
                        date: 'Jan 4, 2023'
                    },
                    recipients: {
                        isToEveryone: false,
                        accounts: ['Adams', 'User Name1', 'User Name2']
                    },
                    description: 'description1'
                },
                {
                    postInfo: {
                        avatar: '/images/9.jpg',
                        name: 'Poster Name2',
                        date: 'Jan 4, 2023'
                    },
                    recipients: {
                        isToEveryone: false,
                        accounts: ['Adams', 'User Name1', 'User Name2']
                    },
                    description: 'description2'
                },
            ],
            detailNote: [
                {
                    postInfo: {
                        name: 'Jessie Lake',
                        date: 'Jan 4, 2023'
                    },
                    description: 'description1'
                },
                {
                    postInfo: {
                        name: 'Poster Name2',
                        date: 'Jan 4, 2023'
                    },
                    description: 'description2'
                },
            ],
            detailHistories: [
                {
                    name: "Governor Action",
                    date: "Jun 16, 2023",
                    type: "Current Bill",
                    state: [
                        {
                            name: "Vetoed",
                            info: ""
                        }
                    ]
                },
                {
                    name: "Transmit to Governor",
                    date: "Jun 12, 2023",
                    type: "",
                    state: [

                    ]
                },
                {
                    name: "Transmit to Senate",
                    date: "May 15, 2023",
                    type: "",
                    state: [

                    ]
                },
                {
                    name: "House Third Read",
                    date: "May 15, 2023",
                    type: "",
                    state: [
                        {
                            name: "Passed  |  31 - 27 - 1 - 0 - 1",
                            info: ""
                        }
                    ]
                },
                {
                    name: "House Standing Committees",
                    date: "Mar 20, 2023",
                    type: "",
                    state: [
                        {
                            name: "Government: Do Pass",
                            info: "( 5 - 4 - 0 - 0 - 0 - 0 )"
                        },
                        {
                            name: "Rules: Constitutional and in Proper Form",
                            info: "( 5 - 3 - 0 - 0 - 0 - 0 )"
                        },
                    ]
                },
            ],
            detailDocument: {
                columns: [
                    {
                        key: 'congress_person',
                        label: 'Congress Person'

                    },
                    {
                        key: 'chamber',
                        label: 'Chamber'

                    },
                    {
                        key: 'district',
                        label: 'District'

                    },
                ],
                info: [{
                    id: 1,
                    person: {
                        avatar: 'https://avatars.githubusercontent.com/u/739984?v=4',
                        name: 'Congress Person Name'
                    },
                    chamber: 'Senate',
                    district: 'NV 001'
                },
                {
                    id: 2,
                    person: {
                        avatar: 'https://avatars.githubusercontent.com/u/739984?v=4',
                        name: 'Congress Person Name'
                    },
                    chamber: 'Senate',
                    district: 'NV 002'
                },
                {
                    id: 3,
                    person: {
                        avatar: 'https://avatars.githubusercontent.com/u/739984?v=4',
                        name: 'Congress Person Name'
                    },
                    chamber: 'Senate',
                    district: 'NV 003'
                },
                {
                    id: 4,
                    person: {
                        avatar: 'https://avatars.githubusercontent.com/u/739984?v=4',
                        name: 'Congress Person Name'
                    },
                    chamber: 'Senate',
                    district: 'NV 004'
                },
                ]
            },
            detailSponsors: {
                columns: [
                    {
                        key: 'congress_person',
                        label: 'Congress Person'

                    },
                    {
                        key: 'chamber',
                        label: 'Chamber'

                    },
                    {
                        key: 'district',
                        label: 'District'

                    },
                ],
                info: [{
                    id: 1,
                    person: {
                        avatar: 'https://avatars.githubusercontent.com/u/739984?v=4',
                        name: 'Congress Person Name'
                    },
                    chamber: 'Senate',
                    district: 'NV 001'
                },
                {
                    id: 2,
                    person: {
                        avatar: 'https://avatars.githubusercontent.com/u/739984?v=4',
                        name: 'Congress Person Name'
                    },
                    chamber: 'Senate',
                    district: 'NV 002'
                },
                {
                    id: 3,
                    person: {
                        avatar: 'https://avatars.githubusercontent.com/u/739984?v=4',
                        name: 'Congress Person Name'
                    },
                    chamber: 'Senate',
                    district: 'NV 003'
                },
                {
                    id: 4,
                    person: {
                        avatar: 'https://avatars.githubusercontent.com/u/739984?v=4',
                        name: 'Congress Person Name'
                    },
                    chamber: 'Senate',
                    district: 'NV 004'
                },
                ]
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
                info: [{
                    id: 1,
                    chamber: 'Senate',
                    commitee: 'CommitteeName'
                },
                {
                    id: 2,
                    chamber: 'Senate',
                    commitee: 'CommitteeName'
                },
                {
                    id: 3,
                    chamber: 'Senate',
                    commitee: 'CommitteeName'
                },
                {
                    id: 4,
                    chamber: 'Senate',
                    commitee: 'CommitteeName'
                },
                ]
            },
            detailInfo: {
                title: "HB2003",
                subTitle: "Original short title from government website",
                sponsorAvata: "/images/9.jpg",
                sponsorName: "Rep. Adams",
                sponsorInfo: 8,
                titleList: [9, 11, 33, 42],
                actionName: "Amendments",
                actionDate: "Jul 9, 2023",
                progressLevel: 6,
                assignAvata: "/images/9.jpg",
                assignName: "Jean Smart",
                session: "2023 - 56th - 1st Reg",
                houseCmte: "Rules",
                senateCmte: "-",
                tags: [{
                    name: "Labor Laws"
                },
                {
                    name: "Tag Name"
                },
                {
                    name: "Existing Tag"
                },
                {
                    name: "Tag"
                }
                ],
                lists: [
                    {
                        name: "American Hospital Association"
                    },
                    {
                        name: "American Chamber of Commerce"
                    }
                ]
            },
            detailCalendar: [{
                id: 1,
                active: true,
                title: {
                    date: "Today",
                    time: "9:00AM",
                    event: "Senate Rm. 3",
                    status: true,
                    content: "Senate Education Accountability & Reform",
                    url: "",
                    data: "",
                    data2: ""
                },
                details: {
                    agenda: [],
                    members: {
                        text: "Education Committee",
                        republicans: [
                            {
                                avatar: 'https://avatars.githubusercontent.com/u/739984?v=4',
                                name: 'Pengerelli',
                                role: 'Chairman'
                            },
                            {
                                avatar: 'https://avatars.githubusercontent.com/u/739985?v=4',
                                name: 'Marschall',
                                role: 'Vice-Chairman'
                            },
                            {
                                avatar: 'https://avatars.githubusercontent.com/u/739982?v=4',
                                name: 'Cook',
                                role: ''
                            },
                            {
                                avatar: 'https://avatars.githubusercontent.com/u/739987?v=4',
                                name: 'Diaz',
                                role: ''
                            },
                            {
                                avatar: 'https://avatars.githubusercontent.com/u/739974?v=4',
                                name: 'Peña ',
                                role: ''
                            },
                        ],
                        democrats: [
                            {
                                avatar: 'https://avatars.githubusercontent.com/u/739992?v=4',
                                name: 'Schwiebert',
                                role: ''
                            },
                            {
                                avatar: 'https://avatars.githubusercontent.com/u/739993?v=4',
                                name: 'Pawlik',
                                role: ''
                            },
                            {
                                avatar: 'https://avatars.githubusercontent.com/u/739994?v=4',
                                name: 'Gutierrez ',
                                role: ''
                            },
                            {
                                avatar: 'https://avatars.githubusercontent.com/u/739995?v=4',
                                name: 'Terech',
                                role: ''
                            },
                        ]
                    },
                },
            }]
        }
    }
}
</script>