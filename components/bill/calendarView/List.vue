<template>
  <BillCalendarViewAccordion :content="content" :multiple=true></BillCalendarViewAccordion>
  <!-- Empty state -->
  <div v-if="content.length === 0" class="">
    <img alt="logo" src="/images/cal_empty_state.png" class="mx-auto h-auto w-[450px]" />
  </div>
</template>

<script>
export default {
  name: "BillCalendarViewList",
  props: {
    content: {
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
