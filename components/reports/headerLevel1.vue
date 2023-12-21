<template>
    <div class="flex flex-wrap items-center justify-between px-[40px] py-[16px]">
        <span class="ht-20">{{ title }}</span>
        <div class="flex items-center">
            <UButton class="ml-auto px-2 py-2 rounded-md text-white  bg-[#757575] hover:bg-[#757575]"
                @click="fetchReport()">
                Generate Report</UButton>
        </div>
    </div>
</template>

<script>
export default {
    name: "ReportsInnerHeader",
    props: {
        title: {
            type: String,
            default: ""
        },
        fetchReport: Function,
    },
}
</script>