<template>
    <BillCalendarViewList :content="data" />
</template>

<script>
export default {
    name: "BillCalendar",
    props: {
        data: {
            type: Object,
            default: () => { }
        }
    }
    // {
    //     date: {
    //         type: String,
    //         default: ''
    //     },
    //     name: {
    //         type: String,
    //         default: ''
    //     },
    //     memberTitle: {
    //         type: String,
    //         default: ''
    //     },
    //     republicans: {
    //         type: Object,
    //         default: () => { }
    //     },t
    //     democrats: {
    //         type: Object,
    //         default: () => { }
    //     }
    // }
}
</script>