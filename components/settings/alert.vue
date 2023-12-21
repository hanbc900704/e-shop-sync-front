<template>
    <div class="flex w-full max-w-[660px] flex-col">
        <span class="ht-20 mb-[32px] font-semibold text-[#101828]">User Settings</span>
        <div
            class="mb-[16px] flex w-full rounded-[8px] border border-[#EAECF0] p-[24px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.1)]">
            <div class="toggle-button r mr-[12px]">
                <input v-model="enableMessage" type="checkbox" class="checkbox" />
                <div class="knobs"></div>
                <div class="layer"></div>
            </div>
            <div class="flex w-full max-w-[520px] flex-col">
                <span class="ht-[16px] text-[#1D2939]">Text Messages</span>
                <span class="ht-[14px] text-[#475467]">You’ll receive simple notifications directly to your phone regarding
                    updates to selected tracking lists and bills.</span>
            </div>
        </div>
        <div
            class="mb-[16px] flex w-full rounded-[8px] border border-[#EAECF0] p-[24px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.1)]">
            <div class="toggle-button r mr-[12px]">
                <input v-model="enableNotification" type="checkbox" class="checkbox" />
                <div class="knobs"></div>
                <div class="layer"></div>
            </div>
            <div class="flex w-full max-w-[520px] flex-col">
                <span class="ht-[16px] text-[#1D2939]">Push Notifications</span>
                <span class="ht-[14px] text-[#475467]">You’ll receive simple notifications directly to your phone regarding
                    updates to selected tracking lists and bills.</span>
            </div>

        </div>
        <div
            class="mb-[16px] flex w-full flex-wrap rounded-[8px] border border-[#EAECF0] p-[24px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.1)]">
            <div class="toggle-button r mr-[12px]">
                <input v-model="enableEmail" type="checkbox" class="checkbox" />
                <div class="knobs"></div>
                <div class="layer"></div>
            </div>
            <div class="flex w-full max-w-[520px] flex-col">
                <span class="ht-[16px] text-[#1D2939]">Email Notifications</span>
                <span class="ht-[14px] text-[#475467]">You’ll receive email notifications directly to your inbox regarding
                    updates to selected tracking lists and bills.</span>
            </div>

            <div v-if="enableEmail" class="mt-[20px] flex w-full flex-col">
                <div class="radio radio-button mb-[12px] rounded-[8px] border p-[16px]"
                    :class="{ 'border-[#FEA3B4]': emailValue == 'simple', 'bg-[#FFF1F3]': emailValue == 'simple', 'text-[#F63D68]': emailValue == 'simple' }">
                    <input class="bottom-0" id="radio-1" v-model="emailValue" name="email_notify" type="radio"
                        value="simple">
                    <label for="radio-1" class="radio-label flex hover:cursor-pointer">
                        <div class="flex flex-col">
                            <span class="ht-16 text-semibold">Simple</span>
                            <span class="ht-14">These notifications will provide the bill title and relevant changes.</span>
                        </div>
                    </label>
                </div>

                <div class="radio radio-button rounded-[8px] border p-[16px]"
                    :class="{ 'border-[#FEA3B4]': emailValue == 'detail', 'bg-[#FFF1F3]': emailValue == 'detail', 'text-[#F63D68]': emailValue == 'detail' }">
                    <input class="bottom-0" id="radio-2" v-model="emailValue" name="email_notify" type="radio"
                        value="detail">
                    <label for="radio-2" class="radio-label flex hover:cursor-pointer">
                        <div class="flex flex-col">
                            <span class="ht-16 text-semibold">Detailed</span>
                            <span class="ht-14">These will provide the bill title and more details about the latest update.
                            </span>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SettingsAlert",
    data() {
        return {
            enableMessage: true,
            enableNotification: true,
            enableEmail: true,
            emailValue: 'simple'
        }
    },
}
</script>