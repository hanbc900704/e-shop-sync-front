<template>
  <div class="container">
    <div class="report_header">
      <img :src="imageURL" class="w-20 h-20 object-cover rounded-lg" />
      <div class="report_titleBlock" v-if="current_settings.add_cover_page == 1">
        <div class="client_name">{{ client_name }}</div>
        <div class="report_title">{{ report_name }}</div>
        <div class="report_date">{{ current_date }}</div>
      </div>
      <img :src="clientimageURL" class="w-20 h-20 object-cover rounded-lg" />
    </div>
    <div class="header_content"><h4>CONTENTS</h4></div>
    <div class="report_content">
      
      <div class="report_leftColumn">
        <!-- List of bills -->
        <div class="report_section">
          
          <ul> <!-- we ignore the rule of table_of_contents otherwise we cannot select -->
            <li v-for="(report, index) in contents" :key="index" @click="selectReport(index)">
              <a href="#" class="bill-item">{{ report[0] }} - {{ report[2] }}</a>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="report_rightColumn">
        <!-- Dynamic content based on selected bill -->
        <div class="report_section" v-if="selectedReportIndex !== null">
          <h2 class="maintitle">{{ selectedReport[0] }} - {{ selectedReport[2] }}</h2>
          <div class="row" v-if="current_settings.add_sponsors == 1">
            <div class="cols-2">
              <h2>Sponsor</h2>
            </div>
            <div class="cols-10">
              <div v-html="parseSponsors(selectedReport[1])"></div>
            </div>
          </div>
          <div class="row" v-if="current_settings.add_summary == 1">
            <div class="cols-2">
              <h2>Summary</h2>
            </div>
            <div class="cols-10">
              <p v-html="selectedReport[3]"></p>
            </div>
          </div>
          <div class="row" v-if="current_settings.add_notes == 1">
            <div class="cols-2">
              <h2>Notes</h2>
            </div>
            <div class="cols-10">
              <div v-html="selectedReport[4]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
		definePageMeta({
			layout: "custom"
		})
	},
  data() {
    return {
      imageURL: "",
      client_name: "Client Name",
      report_name: "54th Legislature - Report Title",
      current_date: "Monday, Mar 2, 2020 | 9:46 am",
      contents: [],
      clientimageURL: "",
      selectedReportIndex: null, // To keep track of the selected report
      userInfo: {},
      current_settings: {}
    };
  },
  computed: {
    selectedReport() {
      if (this.selectedReportIndex !== null) {
        return this.contents[this.selectedReportIndex];
      }
      return null;
    },
    apiURL() {
        const { public: config } = useRuntimeConfig();
        return config.BACKEND_API_URL;
    }
  },
  methods: {
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
    selectReport(index) {
      this.selectedReportIndex = index;
      //ADD class to selector active and remove from others
      const list = document.querySelectorAll('.bill-item');
      list.forEach((item) => {
        item.classList.remove('active');
      });
      list[index].classList.add('active');

    },
    async fetchData() {
      console.log('Fetching data...');
      const id = window.location.pathname.split('/').pop();
      console.log(id);

      const report_settings = await fetch(`${this.apiURL}/reports_settings/${id}`);
      console.log(report_settings);
      const report_settings_data = await report_settings.json();
      console.log(report_settings_data);
      this.client_name = report_settings_data.first_name + ' ' + report_settings_data.last_name;
      this.imageURL = report_settings_data.recipient_logo;
      this.clientimageURL = this.userInfo.avatar;
      this.report_name = report_settings_data.report_title;
      this.current_settings = report_settings_data;
      this.current_date = new Date().toLocaleString('en-US', { timeZone: 'America/Phoenix' });

      const response = await fetch(`${this.apiURL}/weblinkreport/${id}`);
      this.contents = await response.json();
      console.log(this.contents);
    }
  },
  created() {
    this.fetchData().then(() => {
      console.log('Done fetching data');
      if(this.contents.length > 0) {
        this.selectedReportIndex = 0;
        const list = document.querySelectorAll('.bill-item');
        list.forEach((item) => {
          item.classList.remove('active');
        });
        list[0].classList.add('active');
      }
    });
    const userData = useCookie('userData'); // get token from cookies
    // console.log('userData', userData.value)
    if (userData.value) {
      this.userInfo = userData.value
    }
  },
});
</script>

<style>
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 20px;
    box-sizing: border-box;
  }
  .report_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .report_logo {
    width: 120px; /* Logo size */
    height: auto;
  }
  .report_titleBlock {
    text-align: center;
    flex-grow: 1;
  }
  .report_title {
    font-size: 24px;
    font-weight: bold;
    margin: 0;
  }
  .report_date {
    font-size: 18px;
    margin: 0;
  }
  .report_lobbyistLabel {
    font-size: 16px;
    text-align: right;
  }
  .report_content {
    display: flex;
  }
  
  .report_leftColumn {
    flex: 1;
    margin-right: 20px;
    max-width: 25%;
  }
  .report_rightColumn {
    flex: 2;
  }
  .report_section {
    background: #FFF;
    padding: 15px;
    margin-bottom: 20px;
  }
  .report_table {
    width: 100%;
    margin-top: 20px;
  }
  .report_table th, .report_table td {
    padding: 8px;
    text-align: left;
  }
  .report_notes {
    font-style: italic;
  }
  .bill-item {
    cursor: pointer;
    display: block;
    padding: 5px;
    border-radius: 4px;
    transition: background-color 0.3s;
  }
  .bill-item:hover {
    background-color: #f0f0f0;
  }
  .container{
    margin: 0 auto;
    padding: 10px;

  }
  .client_name{
    font-size: 2em;
    font-weight: 700;
  }
  .bill-item{
    color: #5A5A5A;
    text-align: left;
    font-size: 1em;
    margin-bottom: 10px;
  }

  .active{
    background-color: #f0f0f0;
    font-weight: 700;
    color: black;
  }

  .header_content{
    font-size: 0.5em;
    font-weight: 700;
    margin: 0 auto;
  }
  .header_content h4{
    font-size: 2em;
    font-weight: 700;
    padding: 15px;
  }

  .header_content::after{
    /* add a line after the header */
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background: #d1d1d1;
    margin: 0 auto;

  }
  .report_section h2{
    font-size: 1em;
    font-weight: 700;
  }

  .row{
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
  }
  .cols-1{
    flex: 1;
  }
  .cols-2{
    flex: 2;
  }
  .cols-3{
    flex: 3;
  }
  .cols-4{
    flex: 4;
  }
  .cols-5{
    flex: 5;
  }
  .cols-6{
    flex: 6;
  }
  .cols-7{
    flex: 7;
  }
  .cols-8{
    flex: 8;
  }
  .cols-9{
    flex: 9;
  }
  .cols-10{
    flex: 10;
  }
  .cols-11{
    flex: 11;
  }
  .cols-12{
    flex: 12;
  }

  .cols-2 h2{
    font-size: 1em;
    font-weight: 700;
  }
  .maintitle{
    margin-bottom: 30px;
  }
</style>
