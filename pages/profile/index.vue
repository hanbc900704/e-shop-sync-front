<template>
    <ProfileHeader title="Profile" />
    <hr> 

    <div class="flex w-full px-[40px] py-[32px]">
        <div class="flex basis-4/12 flex-col pr-[24px]">
            <div v-for="item, index in settingItems" :key="index" class="mb-[12px] w-full">
                <ProfileSettingItem :title="item.title" :sub-title="item.subTitle" :active="!index ?? true" />
            </div>
        </div>
        <div class="flex w-full basis-8/12 flex-col">
            <ProfileAvata :info="info" class="mb-[12px] "/>
            <ProfileInfo />
        </div>
		
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            settingItems: [
                {
                    title: "Account Setting",
                    subTitle: "Details about your personal information"
                },
                {
                    title: "Notification",
                    subTitle: "Details about your personal information"
                },
                {
                    title: "Membership Plan",
                    subTitle: "Details about your personal information"
                },
                {
                    title: "Password & Security",
                    subTitle: "Details about your personal information"
                }
            ],
            info: {
                avata: "/images/9.jpg"
            }
        }
    },
}
</script>