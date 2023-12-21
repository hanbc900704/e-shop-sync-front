<template>
    <div class="flex h-screen flex-col">
        <CalendarHeader title="Calendar" @on-query-change="(query) => queryChange(query)"/>
        <hr class="border-[#D0D5DD]" />
        <CalendarFilter />
        <CalendarList :content="filteredTrackings" :loading="loading"/>
        <div class="mt-auto flex justify-end border-t border-gray-200 px-3 py-3.5 dark:border-gray-700">
            <UPagination v-model="page" :page-count="pageCount" :total="totalCount" />
        </div>
    </div>
</template>

<script>
export default {
    name: "Calendar",
    data() {
        return {
            query: '',
            pageCount: 25,
            page: 1 ,
            totalCount: 0,

            schedule_data:[],
            tlists: [
            {
                    "id": "16298",
                    "active": true,
                    "title": {
                        "date": "Tuesday, 12/19/2023",
                        "time": "9:00 A.M.",
                        "event": "HHR 4",
                        "status": true,
                        "content": "House Ethics Committee",
                        "url": "https://www.azleg.gov/iagenda/House/12192023houseethicscommittee.1.1r.pdf",
                        "data": "Agenda",
                        "data2": "https://www.azleg.gov/videoplayer/?clientID=6361162879&eventID=2023121010"
                    },
                    "details": {
                        "agenda": [
                            {
                                "id": "SB1053",
                                "desc": "1. Call to Order",
                                "listCnt": "",
                                "event": ""
                            },
                            {
                                "id": "SB1053",
                                "desc": "2. Roll Call ",
                                "listCnt": "",
                                "event": ""
                            },
                            {
                                "id": "SB1053",
                                "desc": "3. Ethics Matter Regarding Representative Leezah Sun ",
                                "listCnt": "",
                                "event": ""
                            },
                            {
                                "id": "SB1053",
                                "desc": "4. Adjournment ",
                                "listCnt": "",
                                "event": ""
                            }
                        ],
                        "members": {
                            "text": "House Ethics Committee ",
                            "republicans": [
                                {
                                    "avata": "https://arizonalegislatorsmembersphotos.s3.amazonaws.com/Grantham, Travis.jpeg",
                                    "name": "Rep. Travis Grantham",
                                    "role": "Chairman",
                                    "email": ["JWilmeth@azleg.gov"]
                                },
                                {
                                    "avata": "https://arizonalegislatorsmembersphotos.s3.amazonaws.com/Griffin, Gail.jpeg",
                                    "name": "Rep. Gail Griffin",
                                    "role": "Vice-Chairman",
                                    "email": ["NCarter@azleg.gov"]
                                },
                                {
                                    "avata": "https://arizonalegislatorsmembersphotos.s3.amazonaws.com/Chaplik, Joseph.jpeg",
                                    "name": "Rep. Joseph Chaplik",
                                    "role": "Representative",
                                    "email": ["SMontenegro@azleg.gov"]
                                }
                            ],
                            "democrats": [
                                {
                                    "avata": "https://arizonalegislatorsmembersphotos.s3.amazonaws.com/Mathis, Christopher.jpeg",
                                    "name": "Rep. Christopher Mathis",
                                    "role": "Representative",
                                    "email": ["JWilmeth@azleg.gov"]
                                },
                                {
                                    "avata": "https://arizonalegislatorsmembersphotos.s3.amazonaws.com/Longdon%2C+Jennifer.jpeg",
                                    "name": "Rep. Jennifer L Longdon",
                                    "role": "Representative",
                                    "email": ["NCarter@azleg.gov"]
                                }
                            ]
                        }
                    }
                },
                {
                    "id": "16299",
                    "active": true,
                    "title": {
                        "date": "Thursday, 01/04/2024",
                        "time": "8:00 A.M",
                        "event": "SHR 1",
                        "status": true,
                        "content": "Senate Transportation and Technology Committee of Reference and House Transportation and Infrastructure Committee of Reference for the Sunset Review of the Arizona Department of Transportation",
                        "url": "https://www.azleg.gov/iagenda/Senate/01042024senatetransportationtechnologycommitteereference.1.1r.pdf",
                        "data": "Agenda",
                        "data2": "https://www.azleg.gov/videoplayer/?clientID=6361162879&eventID=2024011000"
                    },
                    "details": {
                        "agenda": [
                            {
                                "id": "SB1016",
                                "desc": "1. Call to Order",
                                "listCnt": "",
                                "event": ""
                            },
                            {
                                "id": "SB1016",
                                "desc": "2. Roll Call",
                                "listCnt": "",
                                "event": ""
                            },
                            {
                                "id": "SB1016",
                                "desc": "3. Opening Remarks ",
                                "listCnt": "",
                                "event": ""
                            },
                            {
                                "id": "SB1016",
                                "desc": "4. Sunset Review of the Arizona Department of Transportation<br> <ul><li><span>Presentation by the Arizona Office of the Auditor General </span></li><li><span>Response by the Arizona Department of Transportation </span></li><li><span>Public Testimony</span></li><li><span>Discussion and Recommendations </span></li></ul>",
                                "listCnt": "",
                                "event": ""
                            },
                            
                        ],
                        "members": {
                            "text": "Senate Transportation and Technology Committee of Reference and House Transportation and Infrastructure Committee of Reference for the Sunset Review of the Arizona Department of Transportation",
                            "republicans": [
                                {
                                    "avata": "https://arizonalegislatorsmembersphotos.s3.amazonaws.com/Cook%2C+David.jpeg",
                                    "name": "Rep. David L. Cook",
                                    "role": "Co-Chair Representative",
                                    "email": ["SMontenegro@azleg.gov"]
                                },
                                {
                                    "avata": "https://arizonalegislatorsmembersphotos.s3.amazonaws.com/Gillette, John.jpeg",
                                    "name": "Rep. John Gillette",
                                    "role": "Representative",
                                    "email": ["SMontenegro1@azleg.gov"]
                                },
                                {
                                    "avata": "https://arizonalegislatorsmembersphotos.s3.amazonaws.com/Wilmeth, Justin.jpeg",
                                    "name": "Rep. Justin Wilmeth",
                                    "role": "Representative",
                                    "email": ["SMontenegro2@azleg.gov"]
                                },
                                {
                                    "avata": "https://arizonalegislatorsmembersphotos.s3.amazonaws.com/Carter, Neal.jpeg",
                                    "name": "Rep. Neal Carter",
                                    "role": "Representative",
                                    "email": ["SMontenegro3@azleg.gov"]
                                },
                                {
                                    "avata": "https://arizonalegislatorsmembersphotos.s3.amazonaws.com/Montenegro, Steve.jpeg",
                                    "name": "Rep. Steve Montenegro",
                                    "role": "Representative",
                                    "email": ["SMontenegro12@azleg.gov"]
                                },
                                {
                                    "avata": "https://arizonalegislatorsmembersphotos.s3.amazonaws.com/Martinez, Teresa.jpeg",
                                    "name": "Rep. Teresa Martinez",
                                    "role": "Representative",
                                    "email": ["SMontenegro13@azleg.gov"]
                                },
                                {
                                    "avata": "https://arizonalegislatorsmembersphotos.s3.amazonaws.com/Kern, Anthony.gif",
                                    "name": "Sen. Anthony Kern",
                                    "role": "Senator",
                                    "email": ["SMontenegro11@azleg.gov"]
                                },
                                {
                                    "avata": "https://arizonalegislatorsmembersphotos.s3.amazonaws.com/Farnsworth%2C+David.jpeg",
                                    "name": "Sen. David C. Farnsworth",
                                    "role": "Senator",
                                    "email": ["SMontenegro112@azleg.gov"]
                                },
                                {
                                    "avata": "https://arizonalegislatorsmembersphotos.s3.amazonaws.com/Carroll, Frank.jpeg",
                                    "name": "Sen. Frank Carroll",
                                    "role": "Co-Chair Senator",
                                    "email": ["SMontenegro11@azleg.gov"]
                                },
                                {
                                    "avata": "https://arizonalegislatorsmembersphotos.s3.amazonaws.com/Hoffman, Jake.jpeg",
                                    "name": "Sen. Jake Hoffman",
                                    "role": "Senator",
                                    "email": ["SMontenegro12@azleg.gov"]
                                }
                            ],
                            "democrats": [
                                {
                                    "avata": "https://arizonalegislatorsmembersphotos.s3.amazonaws.com/Hernandez, Consuelo.jpeg",
                                    "name": "Rep. Consuelo Hernandez",
                                    "role": "Representative",
                                    "email": ["SMontenegro1@azleg.gov"]
                                },
                                {
                                    "avata": "https://arizonalegislatorsmembersphotos.s3.amazonaws.com/Seaman, Keith.jpeg",
                                    "name": "Rep. Keith Seaman",
                                    "role": "Representative",
                                    "email": ["SMontenegro11@azleg.gov"]
                                },
                                {
                                    "avata": "https://arizonalegislatorsmembersphotos.s3.amazonaws.com/Sun%2C+Leezah.jpeg",
                                    "name": "Rep. Leezah Elsa Sun",
                                    "role": "Representative",
                                    "email": ["SMontenegro12@azleg.gov"]
                                },
                                {
                                    "avata": "https://arizonalegislatorsmembersphotos.s3.amazonaws.com/Tsosie, Myron.jpeg",
                                    "name": "Rep. Myron Tsosie",
                                    "role": "Representative",
                                    "email": ["SMontenegro13@azleg.gov"]
                                },
                                {
                                    "avata": "https://arizonalegislatorsmembersphotos.s3.amazonaws.com/Contreras, Patricia.jpeg",
                                    "name": "Rep. Patricia Contreras",
                                    "role": "Representative",
                                    "email": ["SMontenegro14@azleg.gov"]
                                },
                                {
                                    "avata": "https://arizonalegislatorsmembersphotos.s3.amazonaws.com/Marsh, Christine.jpeg",
                                    "name": "Sen. Christine Marsh",
                                    "role": "Senator",
                                    "email": ["SMontenegro15@azleg.gov"]
                                },
                                {
                                    "avata": "https://arizonalegislatorsmembersphotos.s3.amazonaws.com/Gabaldón, Rosanna.jpeg",
                                    "name": "Sen. Rosanna Gabaldón",
                                    "role": "Senator ",
                                    "email": ["SMontenegro16@azleg.gov"]
                                },
                                {
                                    "avata": "https://arizonalegislatorsmembersphotos.s3.amazonaws.com/Hatathlie, Theresa.jpeg",
                                    "name": "Sen. Theresa Hatathlie",
                                    "role": "Senator",
                                    "email": ["SMontenegro1@azleg.gov"]
                                }
                            ]
                        }
                    }
                }
               
            ],
            loading: false,
        }
    },
    computed: {
        apiURL() {
            const { public: config } = useRuntimeConfig();
            return config.BACKEND_API_URL;
        },
        filteredTrackings() {
            let filtered = this.tlists;
            if (this.query !== '') {
                filtered = this.tlists.filter((list) => {
                    return String(list?.title?.content).toLowerCase().includes(this.query.toLowerCase())
                })
            } 
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.totalCount = filtered.length;
            return filtered.slice((this.page - 1) * this.pageCount, (this.page) * this.pageCount)
        },
        router() {
			return useRouter();
		},
    },
    created() {
        const userData = useCookie('userData'); // get token from cookies
        if (!userData.value) {
            const token = useCookie('token'); // get token from cookies
            token.value = ''
            
            this.router.push('/login')
        }
    },
    async mounted() {
        await this.getCalendarData();
    },
    methods: {
        /* Create method that will grab the latest bill agenda schedule data from the python based backend */
        async getCalendarData() {
            this.loading = true;
            const url = `${this.apiURL}/schedule/`;
            // const url = `${this.apiURL}/schedule/${this.pageCount}/${page}`;
            // console.log('url', url)
            const {data, error} = await useFetch(url);
            if (error.value) {
                console.log('fetch calendar [agenda list] api error', error)
            } else {
                // for the demo, just use the static data here.
                // in the future, we just need to update this part. 
                // this.tlists = data.value;
                // console.log('this.tlists', this.tlists )
            }
            this.loading = false;
        },
        queryChange(q) {
            this.page = 1;
            this.query = q;
        }      
    },
}
</script>