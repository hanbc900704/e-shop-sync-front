<template>
    <div class="flex w-full flex-col">
        <span class="ht-20 mb-[32px] font-semibold text-[#101828]">Manage Subscription</span>
    </div>

    <div class="flex border-t-[2px] border-t-[#EAECF0] py-[16px] justify-between">
        <div class="flex max-w-[280px] flex-col pr-[24px]">
            <span class="ht-16 text-[#1D2939]">Current Plan</span>
            <span class="ht-14 text-[#475467]">For information on how to upgrade or cancel your subscription please contact
                us.</span>
            <button
                class="w-fit px-[14px] py-[8px] mt-[48px] rounded-[8px] border border-[#FEA3B4] bg-[#FFF5F6] text-[#F63D68]">Contact
                Support</button>
        </div>
        <div class="flex flex-col w-[360px]">
            <span class="mb-[8px] ht-14 text-[#1D2939]">Organization Plan</span>
            <span class="mb-[8px] ht-14 text-[#1D2939]">5 Seats</span>
            <span class="mb-[8px] ht-12 text-[#475467]">Jan 1, 2024 - Dec 31, 2024</span>
            <span class="mb-[8px] ht-12 text-[#475467]">$5000.00</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "SettingsPlan",
    data() {
        return {

        }
    },
}
</script>