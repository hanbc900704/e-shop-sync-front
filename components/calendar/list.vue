<template>
    <div class="overflow-y-auto px-[40px] pb-[18px]">
        <CalendarAccordion v-if="!loading && content.length > 0" :content="content" :multiple=true></CalendarAccordion>
        <div v-if="loading" class="flex w-full justify-center py-[40px]">
            <CommonLoading class="h-[40px] w-[40px]" />
        </div>
        <!-- Empty state -->
        <div v-if="!loading && content.length === 0" class="">
            <img alt="logo" src="/images/cal_empty_state.png" class="mx-auto h-auto w-[450px]" />
        </div>
    </div>
</template>

<script>
export default {
    name: "CalendarList",
    props: {
        content: {
            type: Array,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: []
        },
        loading: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {

        }
    }
}
</script>
