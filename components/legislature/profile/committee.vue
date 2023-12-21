<template>
    <div class="flex w-full flex-col">
        <span class="ht-20 mb-[20px]">
            Committees
        </span>
        
        <div class="flex w-full flex-wrap items-start">
            <div v-for="item, index in info" :key="index" class="mr-[20px] flex w-[280px] flex-col 
                    rounded-[8px] border-[1px] border-solid border-[#D9D9D9] p-[24px]">
                <span class="ht-14 mb-[12px] !font-semibold text-[#363636]">{{ item.name }}</span>
                <span class="ht-14 mb-[12px] text-[#363636]">{{ item.role }}</span>
                <!-- Commented until we get more clarity about what goes here-->
                <!-- <div class="flex flex-wrap items-center">
                    <div class="mr-[12px] flex items-center rounded-[2px] bg-[#E2E2E2] px-[6px] py-[3px]">
                        <img src="/images/person.svg" alt="person" class="mr-[8px] h-[14px] w-[14px]" />
                        <span class="text-[#363636]">{{ item.userCnt }}</span>
                    </div>
                    <div class="mr-[12px] flex items-center rounded-[2px] bg-[#E2E2E2] px-[6px] py-[3px]">
                        <img src="/images/file.svg" alt="person" class="mr-[8px] h-[14px] w-[14px]" />
                        <span class="text-[#363636]">{{ item.fileCnt }}</span>
                    </div>
                    <div class="mr-[12px] flex items-center rounded-[2px] bg-[#E2E2E2] px-[6px] py-[3px]">
                        <img src="/images/calendar_1.svg" alt="person" class="mr-[8px] h-[14px] w-[14px]" />
                        <span class="text-[#363636]">{{ item.calendar }}</span>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "LegislatureProfileCommittee",
    props: {
        info: {
            type: Object, 
            // eslint-disable-next-line vue/require-valid-default-prop
            default: {}
        }
    },
    data() {
        return {

        }
    },
}
</script>