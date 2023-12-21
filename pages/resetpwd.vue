<template>
	<div class="flex h-screen w-full">
		<div class="flex basis-6/12 flex-col items-start justify-between px-[120px] py-[80px]">
			<span>
				<img
					alt="logo"
					src="/images/logo/logo_skywolf_dark.svg"
					class="mx-auto h-12 w-full rounded-full object-cover"
				/>
			</span>
			<div class="w-full">
				<div class="mb-[42px] w-full">
					<h2 class="font-[36px] font-semibold text-[#1D2939]">Reset Password</h2>
					<p v-if="uiState" class="mt-[16px] font-[20px] text-[#1D2939]">
                        {{ email }}
                    </p>
					<p v-if="uiState" class="mt-[4px] font-[16px] text-[#475467]">
                        Check your email for a link to reset your password.
                    </p>
				</div>
				<div v-if="!uiState" class="form flex w-full max-w-[420px] flex-col">
					<label for="email" class="font-[14px] font-semibold text-[#344054]">Email</label>
					<input
						v-model="email"
						type="text"
						class="input rounded-[8px]"
						placeholder="Enter Email"
						name="email"
						required
					/>
		
					<button class="button rounded-[8px]" @click.prevent="resetpwd">Reset Password</button>

                    <RouterLink to="/login" class="mx-[auto] mt-[16px] ">
                        <span class="mx-[auto] mt-[16px] text-[#F63D68] hover:cursor-pointer">Login</span>
                    </RouterLink>
		
				</div>
				<div v-else class="form flex w-full max-w-[420px] flex-col">
					
					<button class="button rounded-[8px]" @click.prevent="resendEmail">Resend Email</button>

                    <RouterLink to="/login" class="mx-[auto] mt-[16px] ">
                        <span class="mx-[auto] mt-[16px] text-[#F63D68] hover:cursor-pointer">Login</span>
                    </RouterLink>
		
				</div>
			</div>
			<div class="flex w-full flex-wrap items-center">
				<span class="mr-[16px] font-[12px] text-[#1D2939]">@ {{ getYear }} CW, Inc.</span>
				<div class="flex flex-wrap">
					<RouterLink to="#" class="font-[12px] text-[#667085]">Privacy</RouterLink>
					<span class="mx-[6px] font-[12px] text-[#667085]"> | </span>
					<RouterLink to="#" class="font-[12px] text-[#667085]">Terms</RouterLink>
					<span class="mx-[6px] font-[12px] text-[#667085]"> | </span>
					<RouterLink to="#" class="font-[12px] text-[#667085]">Contact</RouterLink>
				</div>
			</div>
		</div>
		<div class="flex h-full basis-6/12 bg-[url('/images/login.png')] bg-cover bg-center bg-no-repeat">
		</div>
	</div>
</template>


<script>
export default {
	setup() {
		definePageMeta({
			layout: "custom"
		})
	},
	data() {
		return {
			// authenticated: false,
			email: '',
			uiState: false
		}
	},
	computed: {
		router() {
			return useRouter();
		},
		getYear() {
			const date = new Date();
			return date.getFullYear();
		}
	},
	methods: {
		resetpwd() {
			// console.log('login clicked', this.$store)
            // const { $store } = useNuxtApp();
			// await $store.dispatch('authenticateUser', this.user);

			// redirect to homepage if user is authenticated
            this.$toast.success('Sent Email Successfull',{
                position: 'top-right'
            })
            
            this.uiState = true;
            
            return true;
		},
        resendEmail() {
            this.$toast.success('Resend Email',{
                position: 'top-right'
            })
        }
	}
}
</script>

<style lang="scss">
.title {
	display: flex;
	justify-content: center;
}
.form {
	border-radius: 10px;
	.input {
		width: 100%;
		padding: 12px 20px;
		margin: 8px 0;
		display: inline-block;
		border: 1px solid #ccc;
		box-sizing: border-box;
	}
	.button {
		background-color: #F63D68;
		color: white;
		padding: 14px 20px;
		margin-top: 16px;
		border: none;
		cursor: pointer;
	}

	.button:hover {
		opacity: 0.8;
	}
	.cancelbtn {
		width: auto;
		padding: 10px 18px;
		background-color: #f44336;
	}

	span.psw {
		float: right;
		padding-top: 16px;
	}

	/* Change styles for span and cancel button on extra small screens */
	@media screen and (max-width: 300px) {
		span.psw {
            display: block;
            float: none;
		}
		.cancelbtn {
		    width: 100%;
		}
	}
}
</style>
