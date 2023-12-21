<template>
  <div class="flex w-full cursor-pointer items-center justify-center rounded-[8px] bg-[#E9E9E9] py-[12px] active:translate-x-[1px] active:translate-y-[1px]" @click="newSummary">
    <img src="/images/document.svg" alt="document" width="20" height="20" />
    <span class="ht-14 ml-[8px] text-[#000000A0]">New Summary</span> 
  </div>
</template>

<script>
export default {
  name: "BillSummary",
  setup() {
    
  },
  methods: {
    newSummary() {
      console.log("Clicked New Summary Btn")
    }
  }
}
</script>