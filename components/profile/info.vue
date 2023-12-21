<template>
    <div class="flex w-full flex-col rounded-[8px] border-[1px] border-solid px-[40px] py-[24px]
         shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)]">

        <span class="ht-20 mb-[24px]">Update User Information Here</span>
        
        <div class="mb-[16px] grid w-full grid-cols-2 items-center gap-[24px]">
            <div class="flex flex-col">
                <label for="fname" class="ht-14 mb-[12px]">First Name</label>
                <input id="fname" class="w-full" placeholder="First Name" />
            </div>
            <div class="flex flex-col">
                <label for="lname" class="ht-14 mb-[12px]">Last Name</label>
                <input id="lname" class="w-full" placeholder="Last Name" />
            </div>
        </div>

        <div class="mb-[16px] grid w-full grid-cols-2 items-center gap-[24px]">
            <div class="flex flex-col">
                <label for="email" class="ht-14 mb-[12px]">Email</label>
                <input id="email" class="w-full" placeholder="Email" />
            </div>
            <div class="flex flex-col">
                <label for="company" class="ht-14 mb-[12px]">Company Name</label>
                <input id="company" class="w-full" placeholder="Company Name" />
            </div>
        </div>

        <div class="mb-[16px] grid w-full grid-cols-2 items-center gap-[24px]">
            <div class="flex flex-col">
                <label for="address" class="ht-14 mb-[12px]">Address</label>
                <input id="address" class="w-full" placeholder="Address" />
            </div>
            <div class="flex flex-col">
                <label for="phone" class="ht-14 mb-[12px]">Phone</label>
                <input id="phone" class="w-full" placeholder="Phone Number" />
            </div>
        </div>

        <hr class="mb-[24px] border-[#D0D5DD]">

        <div class="mb-[16px] grid w-full grid-cols-2 items-center gap-[24px]">
            <div class="flex flex-col">
                <label for="b-address" class="ht-14 mb-[12px]">Billing Address</label>
                <input id="b-address" class="w-full" placeholder="Billing Address" />
            </div>
            <div class="flex flex-col">
                <label for="b-state" class="ht-14 mb-[12px]">Billing State</label>
                <input id="b-state" class="w-full" placeholder="Billing State" />
            </div>
        </div>

        <div class="mb-[16px] grid w-full grid-cols-4 items-center gap-[8px]">
            <div class="flex flex-col">
                <label for="b-p-code" class="ht-14 mb-[12px]">Billing Postal Code</label>
                <input id="b-p-code" class="w-full" placeholder="Billing Postal Code" />
            </div>

            <div class="flex flex-col">
                <label for="b-cc" class="ht-14 mb-[12px]">cc</label>
                <input id="b-cc" class="w-full" placeholder="cc" />
            </div>

            <div class="flex flex-col">
                <label for="b-cvv" class="ht-14 mb-[12px]">cvv</label>
                <input id="b-cvv" class="w-full" placeholder="cvv" />
            </div>
            
            <div class="flex flex-col">
                <label for="b-exp-date" class="ht-14 mb-[12px]">Expiration date</label>
                <input id="b-exp-date" class="w-full" placeholder="Expiration date" />
            </div>
        </div>

        <UButton variant="ghost" size="2xs" block class="ml-1 rounded-lg border border-[#D9D9D9] bg-[#32D583] px-4 py-2 text-center text-black">
            Update Information
        </UButton>
    </div>
</template>

<script>
export default {
    name: "ProfileInfo",
    props: {
        info: {
            type: Object,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: {}
        }
    }
}
</script>

<style scoped>
input {
    border: solid 1px #00000020;
    padding: 8px 16px;
    border-radius: 8px;
}
</style>