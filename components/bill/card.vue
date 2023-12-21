<template>
    <UCard class="border-[1px]">
        <div class="relative flex items-start gap-4">
            <UCheckbox :value="false" class="mt-1" />
            <section class="basis-6/12 md:basis-8/12">
                <h4 class="m-0 mb-4 text-base font-semibold">
                    <span>{{ title }}</span>
                    <span class="ml-5">{{ subTitle }}</span>
                    <span v-if="isNew"
                        class="ml-1 rounded-full bg-[#f9f5ff] px-2 py-[2px] text-xs text-[#6941c6]">New</span>
                </h4>
                <p>{{ desc }}</p>
                <div class="mt-6">
                    <div class="flex items-center py-2 text-[14px]">
                        <div class="pr-5 text-[#6C6C6C]">Sponsors</div>
                        <div class="flex items-center gap-2">
                            <div class="block h-[40px] w-[40px]">
                                <img :src="userAvata" alt="Avatar"
                                    class="h-full w-full rounded-full object-cover object-top">
                            </div>

                            <p class="text-[14px] font-medium">
                                {{ userName }}
                                <span v-if="userRef">
                                    (<a href="#">{{ userRef }} more</a>)
                                </span>
                            </p>
                        </div>
                    </div>
                    <div class="flex py-2 text-[14px]">
                        <div class="pr-5 text-[#6C6C6C]">Affected Titles</div>
                        <div class="flex">
                            <p>
                                {{ affectedItems }}
                            </p>
                        </div>
                    </div>
                    <div class="flex py-2 text-[14px]">
                        <div class="pr-5 text-[#6C6C6C]">Last Action</div>
                        <div class="flex text-[14px]">
                            <p>
                                {{ actionName }}
                                <span class="text-[#666666]">{{ actionDate }}</span>
                            </p>
                        </div>
                    </div>
                    <div class="flex py-2 text-[14px]">
                        <div class="pr-5 text-[#6C6C6C]">Progress</div>
                        <div class="flex items-center justify-center">
                            <!-- <span v-for="item, index in progressList" :key="index"
                                class="mr-[8px] h-[16px] w-[16px] rounded-[50%] text-black"
                                :class="[index, progressColors[index]]" :style="`background: ${progressColors[index]}`">
                            </span> -->
                            <div class="flex justify-center items-center gap-2">
                                <div class="w-4 h-4 rounded-full bg-[#5E5E5E]"></div>
                                <div class="w-4 h-4 rounded-full bg-[#5E5E5E]"></div>
                                <div class="w-4 h-4 rounded-full bg-[#CCCCCC]"></div>
                                <div class="w-4 h-4 rounded-full bg-[#CCCCCC]"></div>
                                <div class="w-4 h-4 rounded-full bg-[#E9E9E9]"></div>
                                <div class="w-4 h-4 rounded-full bg-[#E9E9E9]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="ml-auto">
                <div v-for="item, index in alert" :key="index">
                    <UBadge v-if="item.name" :ui="{ rounded: 'rounded-full' }"
                        class="mr-2 border border-[#FFF6ED] !bg-[#FFF6ED] px-[6px] text-[#C4320A] md:px-[10px]">
                        {{ item.name }}
                    </UBadge>
                </div>
                <RouterLink :to="url + '/' + parentParam + '/' + param" class="ml-6">
                    <UIcon name="i-heroicons-chevron-right" class="align-middle" />
                </RouterLink>
            </section>
            <div
                class="absolute bottom-[24px] right-[24px] h-[20px] w-[20px] hover:cursor-pointer active:bottom-[23px] active:right-[23px]">
                <CommonIconsActivedAlert v-if="alertState" />
                <CommonIconsInactivatedAlert v-else />
            </div>
        </div>
        <hr class="my-3 border-[#D0D5DD]" />
        <section id="bottom-list" class="flex items-center gap-3 overflow-hidden">
            <h6 class="text-sm text-[#6C6C6C]">
                <UIcon name="i-heroicons-folder" class="mr-2 align-middle" />
                <span class="align-middle">Lists:</span>
            </h6>
            <ul class="grid grid-cols-1 gap-3 sm:grid-cols-3 md:flex md:flex-wrap">
                <li v-for="item, index in list" :key="index">
                    <UBadge v-if="index < 3 && item.name" :ui="{ rounded: 'rounded-sm' }"
                        class="border border-[#D0D5DD] bg-[#F2F4F7]">
                        <p class="text-xs text-[#667085]">{{ item.name }}</p>
                        <span class="ml-2 text-xs text-[#667085]">|</span>
                        <UButton variant="ghost" class="p-0 hover:bg-transparent">
                            <UIcon name="i-heroicons-x-mark" class="ml-1 text-[18px] font-semibold text-[#667085]" />
                        </UButton>
                    </UBadge>
                </li>

                <li v-if="list.length > 3">
                    <UBadge class="h-[25px] rounded-full border border-[#D0D5DD] !bg-[#F2F4F7] text-[#667085]">
                        +{{ list.length - 3 }}
                    </UBadge>
                </li>
            </ul>
            <div class="ml-auto">
                <UButton icon="i-heroicons-folder-plus" size="sm" class="bg-[#EAECF0] font-bold text-[#344054]"
                    variant="solid" label="Add to List" :trailing="false" />
            </div>
        </section>
    </UCard>
</template>

<script>
export default {
    name: 'BillCard',
    props: {
        title: {
            type: String,
            default: ""
        },
        isNew: {
            type: Number,
            default: 0
        },
        subTitle: {
            type: String,
            default: ""
        },
        desc: {
            type: String,
            default: ""
        },
        alert: {
            type: Array,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: []
        },
        userAvata: {
            type: String,
            default: '',
        },
        userName: {
            type: String,
            default: '',
        },
        userRef: {
            type: Number,
            default: 0,
        },
        titles: {
            type: Array,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: []
        },
        actionName: {
            type: String,
            default: '',
        },
        actionDate: {
            type: String,
            default: '',
        },
        progressLevel: {
            type: Number,
            default: 6
        },
        list: {
            type: Array,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: []
        },
        url: {
            type: String,
            default: '',
        },
        parentParam: {
            type: String,
            default: '',
        },
        param: {
            type: String,
            default: '',
        },
        alertState: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            progressColors: [
                "#027A48", "#027A48", "#F04438", "#F04438", "#E9E9E9", "#E9E9E9", "#E9E9E9", "#E9E9E9"
            ]
        }
    },
    computed: {
        progressList() {
            const data = Array(this.progressLevel).fill(1);
            return data;
        },
        affectedItems() {
            let val = "";
            Array.from(this.titles).forEach(item => {
                val += item + ", "
            })
            val = val.slice(0, -2);
            return val;
        }
    }
}
</script>

<style scoped>
#bottom-list::-webkit-scrollbar {
    width: 3px;
    height: 0px;
}

#bottom-list::-webkit-scrollbar-track {
    border-radius: 8px;
    background-color: #ffffff;
    border: 1px solid #cacaca;
}

#bottom-list::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: #c1c1c1;
}
</style>