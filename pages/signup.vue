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
				<div class="mb-[42px]">
					<h2 class="font-[36px] font-semibold text-[#1D2939]">Let's sign up</h2>
				</div>
				<div class="form flex w-full max-w-[420px] flex-col">
					<label for="uname" class="font-[14px] font-semibold text-[#344054]">Username</label>
					<input
						v-model="user.username"
						type="text"
						class="input rounded-[8px]"
						placeholder="Enter Username"
						name="uname"
						required
					/>
		
					<label for="psw" class="mt-[16px] font-[14px] font-semibold text-[#344054]">Password</label>
					<input
						v-model="user.password"
						type="password"
						class="input rounded-[8px]"
						placeholder="Enter Password"
						name="psw"
						required
					/>
					
					<button class="button rounded-[8px]" @click.prevent="login">Sign up</button>
					<span class="mx-[auto] mt-[16px] text-[#F63D68] hover:cursor-pointer">Forgot password</span>
		
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
			user: {
				username: 'kminchelle',
				password: '0lelplR',
			},
			
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
		async login() {
			// console.log('login clicked', this.$store)
            const { $store } = useNuxtApp();
			await $store.dispatch('authenticateUser', this.user);

			// redirect to homepage if user is authenticated
			if ($store.getters.authentificated) {
				this.$toast.success('Login Successfull',{
					position: 'top-right'
				})
				this.router.push('/dbsync');
			} else {
				this.$toast.error('Login Failed',{
					position: 'top-right'
				})
			}

            return true;
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
