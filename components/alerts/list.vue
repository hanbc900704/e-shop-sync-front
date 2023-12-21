<template>
  <div v-if="data.length > 0" class="flex w-full flex-col px-[40px] py-[24px]">
    <AlertsItem v-for="item, index in data" :key="index" :date="item.date" :alerts="item.alerts" />
  </div>
  <div v-else class="flex w-full flex-col px-[40px] py-[24px]">
    <span>There isn't any alert.</span>
</div>
</template>

<script>
export default {
  name: "AlertsList",
  props: {
    data: {
        type: Array,
        // eslint-disable-next-line vue/require-valid-default-prop
        default: []
    }
  },
  data() {
    return {

    }
  }
}
</script>