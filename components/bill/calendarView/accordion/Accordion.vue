<template>
  <dl class="accordion box px-[40px] pb-[18px]" role="presentation">
    <BillCalendarViewAccordionItem v-for="item in content" :key="item.id" :multiple="multiple" :item="item"
      :group-id="groupId">
    </BillCalendarViewAccordionItem>
  </dl>
</template>


<script>
export default {
  name: "CalendarAccordion",
  props: {
    content: {
      type: Array,
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      groupId: null
    }
  },
  mounted() {
    this.groupId = this.$el.id
  }
}
</script>
