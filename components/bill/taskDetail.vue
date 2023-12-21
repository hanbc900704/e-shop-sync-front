<template>
  <div class="container flex w-full flex-col bg-white px-[24px] py-[20px]">
    <div class="mb-[24px] flex items-center justify-between">
      <span class="ht-18 text-black">Track Bill</span>
      <button @click="() => toggleRightPane()"><img src="/images/close.svg" alt="close" width="24" height="24" class="max-w-[auto]" /></button>
    </div>
    <div class="h-divider mb-[24px] bg-[#D9D9D9]" />
    <div class="mb-[24px] flex items-center justify-between">
      <div class="text-black">
        <span class="ht-18 mr-[16px]">{{ id }}</span>
        <span class="ht-18">{{ title }}</span>
      </div>
      <button class="w-[160px] rounded-[8px] border-[1px] border-solid border-black bg-[#EAECF0] px-[16px] py-[8px] hover:bg-gray-300">Clear All Lists</button>
    </div>
    <div class="mb-[8px] flex items-center">
      <span class="mr-[16px] text-[#6C6C6C]">Affected Titles</span>
      <span class="text-black">{{ affectedItems }}</span>
    </div>
    <div class="mb-[8px] flex items-center">
      <span class="mr-[16px] text-[#6C6C6C]">Last Action</span>
      <span class="mr-[8px] text-black">{{ action }} <span class="text-[#6C6C6C]">{{ actionDate }}</span></span>
    </div>
    <div class="mb-[34px] flex items-center">
      <span class="mr-[16px] text-[#6C6C6C]">Progress</span>
      <span v-for="item, index in progressList" :key="index" class="mr-[8px] h-[16px] w-[16px] rounded-[50%] text-black" :style="`background: ${progressColors[index]}`"></span>
    </div>
    <BillTrackTable :items="items" />
  </div>
</template>

<script>
export default {
  name: "BillTaskDetail",
  props: {
    id: {
      type: String,
      default: "HB2003"
    },
    title: {
      type: String,
      default: "corporate income tax; rates"
    },
    affected: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: ['9', '11', '33', '42']
    },
    action: {
      type: String,
      default: "Amendments"
    },
    actionDate: {
      type: String,
      default: "Jul 9, 2023"
    },
    progress: {
      type: Number,
      default: 6
    },
    items: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  },
  emits: ['onToggleTracking'],
  data() {
    return {
      
      progressColors: [
        "#027A48", "#027A48", "#F04438", "#F04438", "#E9E9E9", "#E9E9E9", "E9E9E9"
      ]
    }
  },
  computed: {
    progressList() {
      const data = Array(this.progress).fill(1);
      return data;
    },
    affectedItems() {

      let val = "";
            Array.from(this.affected).forEach(item => {
                val += item + ", "
            })
            val = val.slice(0, -2);
            return val;
    }
  },
  methods: {
    toggleRightPane() {
        this.$emit('onToggleTracking');
    }
  }
}
</script>