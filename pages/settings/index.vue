<template>
    <SettingsHeader title="Settings" />
    <hr>
    <div class="flex flex-col px-[40px] py-[20px]">
        <div class="mb-[30px] inline-flex w-fit rounded-lg bg-[#EAECF0] p-2">
            <div v-for="item, index in tabList" :key="index" class="mr-[8px] cursor-pointer rounded-lg px-[12px] py-[8px] text-[#667085]"
                :class="{'bg-white' : tabIndex === index}"
                @click="tabIndex = index">
                {{ item }}
            </div>
        </div>
        <div class="flex w-full pt-[18px]">
            <div v-if="tabIndex == 0" class="w-full">
                <SettingsUser :user-info="userInfo" 
                    @update-avatar="(file) => onUpdateAvatar(file)" 
                    @update-user-info="(info) => onUpdateUserInfo(info)" 
                    @update-pwd="(pwd) => onUpdateUserPwd(pwd)"/>
            </div>
            <div v-else-if="tabIndex == 1" class="w-full">
                <SettingsAlert />
            </div>
            <div v-else-if="tabIndex == 2" class="w-full">
                <SettingsTeam :admins="teams.admins" :users="teams.users" />
            </div>
            <div v-else-if="tabIndex == 3" class="w-full">
                <SettingsPlan />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Settings",
    data() {
        return {
            tabIndex: 0,
            tabList: ['User Settings', 'Alert Settings', 'Your Team', 'Subscription'],
            userInfo: {
                avatar: "/images/9.jpg",
                first_name: "Briana",
                last_name: "Roy",
                title: "Lobbyist",
                email: "jane.smith@gmail.org",
                phone_number: "555-222-1278",
                pwd_update_date: "10/10/2023"
            },
            teams: {
                admins: [{
                    avatar: "/images/9.jpg",
                    fullname: "Brianna Roy",
                    email: "b.roy@company.org",
                    date: "Today",
                    login: "Today",
                    status: "Active"
                }],
                users: [{
                        avatar: "/images/9.jpg",
                        fullname: "India Blake",
                        email: "i.blake@company.org",
                        date: "Today",
                        login: "Today",
                        status: "Active"
                    },
                    {
                        avatar: "/images/9.jpg",
                        fullname: "Kaitlin Mathis",
                        email: "k.mathis@company.org",
                        date: "-",
                        login: "-",
                        status: "Invited"
                }]
            }
        }
    },
    computed: {
        apiURL() {
            const { public: config } = useRuntimeConfig();
            return config.BACKEND_API_URL;
        },
    },
    created() {
        const userData = useCookie('userData'); // get token from cookies
        // console.log('userData', userData.value)
        if (userData.value) {
            this.userInfo = userData.value
        }
    },
    async mounted() {
        await this.getAllTeammembers();
    },
    methods: {
        async onUpdateAvatar(file) {
            try {
                const formData = new FormData();
                formData.append('file', file)
                
                const response = await $fetch(`${this.apiURL}/auth/updateAvatar/${this.userInfo?.id || 3}`, {
                // const response = await $fetch(`http://localhost:8000/python/auth/updateAvatar/${this.userInfo?.id || 3}`, {
                    method: 'POST',
                    body: formData
                });
                this.userInfo.avatar = response?.filename
                // console.log('this.userInfo', this.userInfo)
                const userData = useCookie('userData'); // get token from cookies
                userData.value = this.userInfo; // set token to cookie
            } catch (error) {
                // Handle errors, if any
                console.error('An error occurred while update avatar:', error);
            }
        },
        async onUpdateUserInfo(info) {
            try {
                const response = await $fetch(`${this.apiURL}/auth/updateUserSetting/${this.userInfo?.id || 3}`, {
                // const response = await $fetch(`http://localhost:8000/python/auth/updateUserSetting/${this.userInfo?.id || 3}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(info)
                });
                this.userInfo = response;
                const userData = useCookie('userData'); // get token from cookies
                userData.value = response; // set token to cookie
            } catch (error) {
                // Handle errors, if any
                console.error('An error occurred while update password:', error);
            }
        },
        async onUpdateUserPwd(pwd) {
            try {
                await $fetch(`${this.apiURL}/auth/updatePwd/${this.userInfo?.id || 3}`, {
                // await $fetch(`http://localhost:8000/python/auth/updatePwd/${this.userInfo?.id || 3}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({pwd, email: this.userInfo.email})
                });
            } catch (error) {
                // Handle errors, if any
                console.error('An error occurred while update password:', error);
            }
        },
        async getAllTeammembers() {
            try {
                const response = await $fetch(`${this.apiURL}/setting/getAllTeams`, {
                // await $fetch(`http://localhost:8000/python/auth/updatePwd/${this.userInfo?.id || 3}`, {
                });

                this.teams = response.teams
            } catch (error) {
                // Handle errors, if any
                console.error('An error occurred while update password:', error);
            }
        }
    }
}
</script>