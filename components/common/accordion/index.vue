<template>
    <dl class="accordion box w-full pb-[18px]" role="presentation">
        <CommonAccordionItem 
            v-for="item in content"
            :key="item.id"
            :multiple="multiple"
            :item="item"
            :group-id=groupId
            :select-all=selectAll
        />
    </dl>
</template>


<script>
export default {
    name: "CommonAccordion",
    props: {
        content: {
            type: Array,
            required: true
        },
        multiple: {
            type: Boolean,
            default: false
        },
        selectAll: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            groupId: ""
        }
    },
    mounted() {
        this.groupId = this.$el.id
    }
}
</script>
