<template>
    <div class="flex w-full flex-col">
        <div class="mb-[56px] flex items-center">
            <div class="mr-[40px] h-[150px] w-[150px] rounded-full">
                <img v-if="profile?.userInfo?.avata" :src="profile?.userInfo?.avata"
                    alt="avata" class="h-[150px] w-[150px] rounded-full object-cover object-top shadow-[0px_0px_10px_1px_#00000030]" />
            </div>
            <div class="flex flex-col">
                <span class="ht-20 mb-[8px] text-black">{{ profile?.userInfo?.fullName }}</span>
                <span class="ht-14 mb-[24px] text-[#363636]">{{ profile?.userInfo?.address }}</span>
                <div class="flex flex-wrap items-center">
                    <div v-if="profile.contact.facebook"
                        class="mr-[4px] flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#00000020]">
                        <a :href="profile?.contact?.facebook" target="_blank">
                            <img src="/images/facebook.svg" alt="social">
                        </a>
                    </div>
                    <div v-if="profile.contact.linkedin"
                        class="mr-[4px] flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#00000020]">
                        <a :href="profile?.contact?.linkedin" target="_blank">
                            <img src="/images/linkedin.svg" alt="social">
                        </a>
                    </div>
                    <div v-if="profile.contact.pinterest"
                        class="mr-[4px] flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#00000020]">
                        <a :href="profile?.contact?.pinterest" target="_blank">
                            <img src="/images/pinterest.svg" alt="social">
                        </a>
                    </div>
                    <div v-if="profile.contact.tumblr"
                        class="mr-[4px] flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#00000020]">
                        <a :href="profile?.contact?.tumblr" target="_blank">
                            <img src="/images/tumblr.svg" alt="social">
                        </a>
                    </div>
                    <div v-if="profile.contact.twitter_x"
                        class="mr-[4px] flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#00000020]">
                        <a :href="profile?.contact?.twitter_x" target="_blank">
                            <img src="/images/twitter_x.svg" alt="social">
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex flex-wrap">
            <div v-if="profile?.member?.email"
                class="mr-[16px] flex w-[320px] flex-col rounded-[8px] border-[1px] border-solid border-[#D9D9D9]">
                <div class="rounded-t-[8px] bg-[#D9D9D9] px-[24px] py-[8px] text-[#363636]">
                    Member Contact
                </div>

                <div class="flex items-center px-[24px] pb-[6px] pt-[12px]">
                    <img src="/images/email.svg" alt="email" class="mr-[16px] h-[20px] w-[20px]">
                    <span class="ht-14 lowercase text-[#363636]">{{ profile?.member?.email }}</span>
                </div>
                <div class="flex items-center px-[24px] py-[6px]">
                    <img src="/images/phone.svg" alt="email" class="mr-[16px] h-[20px] w-[20px]">
                    <span class="ht-14 text-[#363636]">{{ profile?.member?.phone }}</span>
                </div>
                <div class="flex items-center px-[24px] pb-[12px] pt-[6px]">
                    <img src="/images/location.svg" alt="email" class="mr-[16px] h-[20px] w-[20px]">
                    <span class="ht-14 text-[#363636]">{{ profile?.member?.location }}</span>
                </div>
            </div>

            <div v-if="profile?.assistant?.email"
                class="flex w-[320px] flex-col rounded-[8px] border-[1px] border-solid border-[#D9D9D9]">
                <div class="rounded-t-[8px] bg-[#D9D9D9] px-[24px] py-[8px] text-[#363636]">
                    Assistant Contact
                </div>
                <div class="flex items-center px-[24px] py-[6px]">
                    <img src="/images/person.svg" alt="email" class="mr-[16px] h-[20px] w-[20px]">
                    <span class="ht-14 text-[#363636]">{{ profile?.assistant?.location }}</span>
                </div>
                <div class="flex items-center px-[24px] pb-[6px] pt-[12px]">
                    <img src="/images/email.svg" alt="email" class="mr-[16px] h-[20px] w-[20px]">
                    <span class="ht-14 lowercase text-[#363636]">{{ profile?.assistant?.email }}</span>
                </div>
                <div class="flex items-center px-[24px] pb-[12px] pt-[6px]">
                    <img src="/images/phone.svg" alt="email" class="mr-[16px] h-[20px] w-[20px]">
                    <span class="ht-14 text-[#363636]">{{ profile?.assistant?.phone }}</span>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "LegislatureProfileCard",
    props: {
        profile: {
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