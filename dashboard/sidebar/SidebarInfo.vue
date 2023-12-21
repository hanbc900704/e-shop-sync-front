<template>
  <div class="flex flex-col px-3 py-2">
    <div class="mb-4 flex flex-col">
      <span class="text-[#FFFFFF] font-semibold">{{ userMenu?.name || "" }}</span>
      <span class="text-xs text-[#98A2B3]">{{ userMenu?.date || "" }}</span>
    </div>
    <div class="mb-4 flex flex-col">
      <span class="text-[#FFFFFF] font-semibold">{{ companyMenu?.name || "" }}</span>
      <span class="text-xs text-[#98A2B3]">{{ companyMenu?.date || "" }}</span>
    </div>

    <div class="flex flex-col">
      <div v-for="item in Object.keys(userProfile)" :key="item" class="mb-1 flex justify-between">
        <span class="text-xs text-[#98A2B3]">{{ item }}</span>
        <span class="text-xs text-[#98A2B3]">{{ userProfile[item] }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userMenu: {
        name: "House Reconvenes",
        date: "Mon, Jul 31, 2023 | 1:15 PM"
      },
      companyMenu: {
        name: "Senate Reconvenes",
        date: "Mon, Jul 31, 2023 | 1:15 PM"
      },
      userProfile: {
        "Session Days" : "201",
        "Bills Posted" : "1672",
        "Bills Passed" : "345",
        "Bills Vetoed" : "143",
        "Bills Signed" : "202",
        "Mem, Res Posted" : "110",
        "Mem, Res Passed" : "32",
      }
    }
  },
  async mounted() {
        await this.fetchSideBarInfo();
  },
  computed: {
        apiURL() {
            const { public: config } = useRuntimeConfig();
            return config.BACKEND_API_URL;
        },
      },
  methods: {
    async fetchSideBarInfo() {
            try {
                // Fetch data from the specified URL using the ID
                const response = await fetch(`${this.apiURL}/side_bar_nav_data`);
                // const response = await fetch(`http://localhost:8000/python/bill_notes/${this.billID}`);
                // Store the fetched data in the 'detailDocument.info' property
                const json_response = await response.json();
                this.userMenu = json_response.userMenu;
                this.companyMenu = json_response.companyMenu;
                this.userProfile = json_response.userProfile;

            } catch (error) {
                // Handle errors, if any
                console.error('An error occurred while fetching summary:', error);
            }
        },
  }
}
</script>