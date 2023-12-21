<template>
  <AgendaHeader title="Dashboard"/>
  <hr class="border-[#D0D5DD]"/>
  <AgendaFilter />
  <AgendaAccordion :content="content" :multiple=true></AgendaAccordion>
</template>

<script>
export default {
  name: "AgendaList",
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
