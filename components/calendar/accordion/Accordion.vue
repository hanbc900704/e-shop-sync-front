<template>
    <dl class="accordion box" role="presentation">
        <CalendarAccordionItem
            v-for="item in content"
            :key="item.id"
            :multiple="multiple"
            :item="item"
            :group-id="groupId">
        </CalendarAccordionItem>
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
