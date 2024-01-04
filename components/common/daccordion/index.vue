<template>
    <dl class="accordion box w-full pb-[18px]" role="presentation">
        <CommonDaccordionItem 
            v-for="item in content"
            :key="item.id"
            :multiple="multiple"
            :item="item"
            :group-id=groupId
            :path="path"
            :count-list="countList"
        />
    </dl>
</template>


<script>
export default {
    name: "CommonDaccordion",
    props: {
        content: {
            type: Array,
            required: true
        },
        multiple: {
            type: Boolean,
            default: false
        },
        path: {
            type: String,
            default: ""
        },
        countList: {
            type: Object,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: {}
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
