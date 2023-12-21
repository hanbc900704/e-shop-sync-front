<template>
    <div>
    <LegislatureHeader title="Legislature" @query-change="(query) => onQueryChanged(query)"/>
    <hr>
    <LegislatureFilter />
    <div class="flex flex-col px-[40px] py-[20px]">
        
        <!-- <div class="mb-[30px] inline-flex w-fit rounded-lg bg-[#EAECF0] p-2">
            <div v-for="item, index in tabList" :key="index" class="mr-[8px] cursor-pointer rounded-lg px-[12px] py-[8px] text-[#667085]"
                :class="{'bg-white' : tabIndex === index}"
                @click="tabIndex = index">
                {{ item }}
            </div>
        </div> -->
        
        <div class="legisture-list-table">
            <LegislatureTable :people="legislators" :query="query"/>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    name: "Legislature",

    data() {
        return {
            tabIndex: 0,
            query: '',
            // tabList: ['Legislators', 'By County', 'By City'],
            legislators: [
                // {
                //     avata: "/images/9.jpg",
                //     fullname: "Fisrt, Last Name",
                //     contact: {
                //         phone: "+123456789",
                //         email: "test@gmail.com"
                //     },
                //     party: "Democrat",
                //     chamber: "Senate",
                //     district: "1",
                //     id: 1
                // },
                // {
                //     avata: "/images/9.jpg",
                //     fullname: "Fisrt, Last Name",
                //     contact: {
                //         phone: "+123456789",
                //         email: "test@gmail.com"
                //     },
                //     party: "Democrat",
                //     chamber: "Senate",
                //     district: "2",
                //     id: 2
                // },
                // {
                //     avata: "/images/9.jpg",
                //     fullname: "Fisrt, Last Name",
                //     contact: {
                //         phone: "+123456789",
                //         email: "test@gmail.com"
                //     },
                //     party: "Democrat",
                //     chamber: "Senate",
                //     district: "3",
                //     id: 3
                // },
                // {
                //     avata: "/images/9.jpg",
                //     fullname: "Fisrt, Last Name",
                //     contact: {
                //         phone: "+123456789",
                //         email: "test@gmail.com"
                //     },
                //     party: "Democrat",
                //     chamber: "Senate",
                //     district: "4",
                //     id: 4
                // }
            ],
        }
    },
    computed: {
        apiURL() {
            const { public: config } = useRuntimeConfig();
            return config.BACKEND_API_URL;
        },
    },
    mounted() {
        this.fetchDetailLegislators();
    },
    methods: {
        async fetchDetailLegislators() {
            try {
                // Fetch data from the specified URL using the ID
                const response = await fetch(`${this.apiURL}/legislators`);
                // Store the fetched data in the 'detailDocument.info' property
                this.legislators = await response.json();
                console.log(this.legislators);
            } catch (error) {
                // Handle errors, if any
                console.error('An error occurred while fetching documents:', error);
            }
        },
        onQueryChanged(query) {
            this.query = query;
        }
    }
}
</script>