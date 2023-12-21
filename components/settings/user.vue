
<template>
    <div class="flex w-full max-w-[660px] flex-col">
        <span class="ht-20 mb-[32px] font-semibold text-[#101828]">User Settings</span>
        <div class="mb-[20px]">
            <div class="flex items-center justify-between">
                <img :src="userInfo.avatar" alt="avata" class="h-[200px] w-[200px] rounded-full">
                <button class="ht-14 underline" @click="updateImage=!updateImage">{{ updateImage ? 'Cancel': 'Update'}}</button>
            </div>
            <div v-if="updateImage" class="mb-[12px] mt-[20px] flex flex-wrap items-center">
                <label for="upload" class="ht-14 rounded-[4px] bg-[#DD2590] px-[24px] py-[12px] text-white hover:cursor-pointer">☁️ Upload file from your computer</label>
                <input id="upload" type="file" name="file-upload" class="absolute left-0 top-0 h-0 w-0 opacity-0" accept="image/*" @change="(e) => updateAvatar(e)">
            </div>
        </div>
        <div class="flex w-full flex-col border-y border-[#D9D9D9] py-[24px]">
            <div class="flex items-center justify-between">
                <div class="flex flex-col">
                    <span class="ht-16 text-[#101828]">Email</span>
                    <span v-if="!updateEmail" class="ht-14 text-[#344054]">{{ userInfo?.email || "" }}</span>
                    <span v-else class="ht-14 max-w-[450px] text-[#344054]">Use your work email. It’s important for verification.</span>
                </div>
                <!-- <button class="ht-14 underline" @click="updateEmail=!updateEmail">{{ updateEmail ? 'Cancel': 'Update'}}</button> -->
            </div>
            <div v-if="updateEmail" class="mt-[16px] flex w-full flex-col">
                <input v-model="email" placeholder="jane.smith@gmail.org" class="mb-[16px] w-full rounded-[8px] border border-[#D0D5DD] bg-white px-[14px] py-[10px]">
                <button class="ht-14 w-fit rounded-[4px] bg-[#DD2590] px-[24px] py-[12px] text-white hover:cursor-pointer">Save</button>
            </div> 
            
        </div>
        <div class="flex w-full flex-col border-y border-[#D9D9D9] py-[24px]">
            <div class="flex items-center justify-between">
                <div class="flex flex-col">
                    <span class="ht-16 text-[#101828]">Title</span>
                    <span v-if="!updateTitle" class="ht-14 text-[#344054]">{{ userInfo?.title || "" }}</span>
                    <span v-else class="ht-14 max-w-[450px] text-[#344054]">What position do hold at this company?</span>
                </div>
                <button class="ht-14 underline" @click="updateTitle=!updateTitle">{{ updateTitle ? 'Cancel': 'Update'}}</button>
            </div>
            <div v-if="updateTitle" class="mt-[16px] flex w-full flex-col">
                <input v-model="title" placeholder="Lobbyist" class="mb-[16px] w-full rounded-[8px] border border-[#D0D5DD] bg-white px-[14px] py-[10px]">
                <button class="ht-14 w-fit rounded-[4px] bg-[#DD2590] px-[24px] py-[12px] text-white hover:cursor-pointer" @click="updateSetting('title')">Save</button>
            </div> 
        </div>
        <div class="flex w-full flex-col border-y border-[#D9D9D9] py-[24px]">
            <div class="flex items-center justify-between">
                <div class="flex flex-col">
                    <span class="ht-16 text-[#101828]">Name</span>
                    <span v-if="!updateName" class="ht-14 text-[#344054]">{{ userInfo?.first_name + " " + userInfo?.last_name || "" }}</span>
                    <span v-else class="ht-14 max-w-[450px] text-[#344054]">What would you like us to call you? </span>
                </div>
                <button class="ht-14 underline" @click="updateName=!updateName">{{ updateName ? 'Cancel': 'Update'}}</button>
            </div>
            <div v-if="updateName" class="mt-[16px] flex w-full flex-col">
                <label for="firstName">First Name</label>
                <input id="firstName" v-model="first_name" placeholder="First Name" class="mb-[16px] w-full rounded-[8px] border border-[#D0D5DD] bg-white px-[14px] py-[10px]">
                <label for="lastName">Last Name</label>
                <input id="lastName" v-model="last_name" placeholder="Last Name" class="mb-[16px] w-full rounded-[8px] border border-[#D0D5DD] bg-white px-[14px] py-[10px]">
                <button class="ht-14 w-fit rounded-[4px] bg-[#DD2590] px-[24px] py-[12px] text-white hover:cursor-pointer" @click="updateSetting('name')">Save</button>
            </div> 
        </div>
        <div class="flex w-full flex-col border-y border-[#D9D9D9] py-[24px]">
            <div class="flex items-center justify-between">
                <div class="flex flex-col">
                    <span class="ht-16 text-[#101828]">Phone Number</span>
                    <span v-if="!updatePhone" class="ht-14 text-[#344054]">{{ userInfo?.phone_number || "" }}</span>
                    <span v-else class="ht-14 max-w-[450px] text-[#344054]">This number will be user to send text notifications.</span>
                </div>
                <button class="ht-14 underline" @click="updatePhone=!updatePhone">{{ updatePhone ? 'Cancel': 'Update'}}</button>
            </div>
            <div v-if="updatePhone" class="mt-[16px] flex w-full flex-col">
                <input v-model="phone_number" placeholder="555-222-1278" class="mb-[16px] w-full rounded-[8px] border border-[#D0D5DD] bg-white px-[14px] py-[10px]">
                <button class="ht-14 w-fit rounded-[4px] bg-[#DD2590] px-[24px] py-[12px] text-white hover:cursor-pointer" @click="updateSetting('phone')">Save</button>
            </div> 
        </div>
        <div class="flex w-full flex-col border-y border-[#D9D9D9] py-[24px]">
            <div class="flex items-center justify-between">
                <div class="flex flex-col">
                    <span class="ht-16 text-[#101828]">Password</span>
                    <span v-if="!updatePwd" class="ht-14 text-[#344054]">Last updated: {{ userInfo?.pwd_update_date || "" }}</span>
                    <span v-else class="ht-14 max-w-[450px] text-[#344054]">Think more than 8 characters with upper and lower case, numbers, and special characters if you can. </span>
                </div>
                <button class="ht-14 underline" @click="updatePwd=!updatePwd">{{ updatePwd ? 'Cancel': 'Update'}}</button>
            </div>
            <div v-if="updatePwd" class="mt-[16px] flex w-full flex-col">
                <label class="ht-12 mb-[2px] text-[#344054]">New Password</label>
                <input v-model="pwd" type="password" placeholder="New Password" class="mb-[16px] w-full rounded-[8px] border border-[#D0D5DD] bg-white px-[14px] py-[10px]">
                <label class="ht-12 mb-[2px] text-[#344054]">Confirm Password</label>
                <input v-model="pwdConfirm" type="password" placeholder="Confirm Password" class="mb-[16px] w-full rounded-[8px] border border-[#D0D5DD] bg-white px-[14px] py-[10px]">
                <button class="ht-14 w-fit rounded-[4px] bg-[#DD2590] px-[24px] py-[12px] text-white hover:cursor-pointer" @click="updatePassword()">Save</button>
            </div> 
        </div>
    </div>
</template>

<script>
export default {
    name: "SettingsUser",
    props: {
        userInfo: {
            type: Object,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: {}
        }
    },
    emits: ['updateAvatar', 'updateUserInfo', 'updatePwd'],
    data() {
        return {
            updateImage: false,
            updateName: false,
            updateTitle: false,
            updateEmail: false,
            updatePhone: false,
            updatePwd: false,

            first_name: this.userInfo.first_name,
            last_name: this.userInfo.last_name,
            title: this.userInfo.title,
            email: this.userInfo.email,
            phone_number: this.userInfo.phone_number,
            pwd: "",
            pwdConfirm: ""
        }
    },
    methods: {
        updateAvatar(e) {
            this.$emit("updateAvatar", e.target.files[0])
            this.updateImage = false;
        },
        updatePassword() {
            if (this.pwd !== this.pwdConfirm) {
                this.$toast.error('Password is mismatching!',{
					position: 'top-right'
				})
                return;
            }

            if (this.pwd === "") {
                this.$toast.error('Password is Empty!',{
					position: 'top-right'
				})
                return;
            }

            this.$emit("updatePwd", this.pwd)
            this.updatePwd = false;
        },
        updateSetting(type) {
            if (type === 'title' && this.title === '') {
                this.$toast.error('Title is empty!',{
					position: 'top-right'
				})
                return;
            }
            if (type === 'phone' && this.phone_number === '') {
                this.$toast.error('Phone_number is empty!',{
					position: 'top-right'
				})
                return;
            }
            if (type === 'name' && (this.first_name === '' || this.last_name === '')) {
                this.$toast.error('First Name and Last Name can`t be empty!',{
					position: 'top-right'
				})
                return;
            }

            const retval = {
                type,
                first_name: this.first_name,
                last_name: this.last_name,
                title: this.title,
                phone_number: this.phone_number,
            }

            this.$emit("updateUserInfo", retval)

            this.updateName = false;
            this.updateTitle = false;
            this.updatePhone = false;
        }
    }
}
</script>