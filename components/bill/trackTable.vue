<template>
  <div class="container flex w-full flex-col">
    <div class="form-group relative mb-[12px] flex w-full items-center">
      <input v-model="search" type="text" class="form-control relative mr-[14px] w-[calc(100%-160px)] rounded-[4px] border-[1px] border-solid border-[#EAECF0] bg-white py-[12px] pl-[40px] pr-[12px] text-black" placeholder="Search Lists"/>
      <img src="/images/zoom.svg" alt="zoomIcon" class="width-[16px] height-[16x] absolute left-[16px] top-[16px]"/>
      <button class="w-[160px] rounded-[8px] border-[1px] border-solid border-black bg-[#EAECF0] px-[16px] py-[8px] hover:bg-gray-300">Create New List</button>
    </div>
    <div class="w-full">
      <table class="w-full rounded-[8px]">
        <thead class="bg-[#EaECF0] text-[#5B5B5B]">
          <tr>
            <th class="text-left">
              <div class="align-center flex cursor-pointer" @click="sortRow('clients')">
                <span class=" mr-[4px]">Clients</span>
                <img src="/images/arrow-down.svg" alt="arrow" class="sort-arrow "/>
              </div>
            </th>
            <th class="w-[170px]">
              <span class="mr-[12px] cursor-pointer">Tracked Bills</span>
            </th>
            <th class="w-[80px]"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item,index in filterItems" :key="index">
            <td class="flex items-center"><img :src="item.avata" alt="avata" class="mr-[12px] h-[40px] w-[40px] rounded-[50%]"/> <span>{{ item.clients }}</span></td>
            <td class="text-right">{{ item.tbs }}</td>
            <td class="text-right">
              <div class="cursor-pointer border-[1px] border-solid border-transparent p-[12px] hover:rounded-[8px] hover:border-gray-300"><img src="/images/trash.svg" alt="edit" class="h-[20px] w-[20px] max-w-[20px]"/></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { dynamicSort } from "@/helpers/sort-data"

export default {
  name: "BillTrackTable",
  props: {
    items : {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  },
  data() {
    return {
      search: '',
      sortOrder: 1,
    }
  },
  computed: {
      filterItems: function(){
        return this.items.filter((item) => {
          return item.clients.match(this.search);
        });
      }   
    },
  methods: {
    // Sort columns
    sortRow(columnName){
          
      // sort column
      // eslint-disable-next-line vue/no-mutating-props
      this.items.sort(dynamicSort(columnName, this.sortOrder))

      if( this.sortOrder === 1 ){

        this.sortOrder = -1;

      } else if( this.sortOrder === -1 ){

        this.sortOrder = 1;

      }
    }
  }
}
</script>

<style scoped>
table {
  box-shadow: 0px 2px 4px -2px #1018280F;
  box-shadow: 0px 4px 8px -2px #1018281A;
}

table th {
  padding: 13px 24px;
  border-bottom: 1px solid #EAECF0;
}
table td {
  padding: 16px 24px;
  border-bottom: 1px solid #EAECF0;
}
</style>