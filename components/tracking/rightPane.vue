<template>
    <section v-show="title" id="right-details-pane" class="h-full w-full overflow-hidden">
        <div class="flex flex-col">
            <h5><strong>{{ title }}</strong></h5>
            <h6><strong>{{ subTitle }}</strong></h6>
            <hr class="my-3 border-[#D0D5DD]" />

        </div>
        <div class="flex py-2 text-[14px]">
            <div class="pr-5 text-[#6C6C6C]">Sponsors</div>
            <div class="flex items-center gap-2">
                <div class="m-[auto] block h-[40px] w-[40px]">
                    <img v-if="sponsorAvata" :src="sponsorAvata" alt="Avatar"
                        class="h-full w-full rounded-full object-cover object-top" />
                </div>
                <p class="text-[14px] font-medium">
                    {{ sponsorName }} <a v-if="sponsorInfo.length > 1" href="" class="underline">( +{{ sponsorInfo.length -
                        1
                    }} more)</a>
                </p>
            </div>
        </div>
        <div class="flex py-2 text-[14px]">
            <div class="pr-5 text-[#6C6C6C]">Affected Titles</div>
            <div class="flex">
                <p>{{ affectedItems }}</p>
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
                    class="mr-[8px] h-[16px] w-[16px] rounded-[50%] text-black" :class="[index, progressColors[index]]"
                    :style="`background: ${progressColors[index]}`">
                </span> -->
                <div class="flex items-center justify-center gap-2">
                    <div class="h-4 w-4 rounded-full bg-[#5E5E5E]"></div>
                    <div class="h-4 w-4 rounded-full bg-[#5E5E5E]"></div>
                    <div class="h-4 w-4 rounded-full bg-[#CCCCCC]"></div>
                    <div class="h-4 w-4 rounded-full bg-[#CCCCCC]"></div>
                    <div class="h-4 w-4 rounded-full bg-[#E9E9E9]"></div>
                    <div class="h-4 w-4 rounded-full bg-[#E9E9E9]"></div>
                </div>
            </div>
        </div>
        <div class="flex items-center py-2 text-[14px]">
            <div class="pr-5 text-[#6C6C6C]">Assigned to</div>
            <div class="flex items-center gap-1">
                <div class="h-[40px] w-[40px] rounded-full">
                    <img :src="assignAvata" alt="Avatar" class="h-full w-full object-cover object-top"/>
                </div>
                <p class="text-[14px] font-medium">
                    {{ assignName }}
                </p>
            </div>
        </div>
        <div class="flex py-2 text-[14px]">
            <div class="pr-5 text-[#6C6C6C]">Session</div>
            <div class="flex">
                <p class="text-[14px]">
                    {{ session }}
                </p>
            </div>
        </div>
        <div class="flex py-2">
            <div class="pr-5 text-[14px] text-[#6C6C6C]">House Cmte</div>
            <div class="flex">
                <p class="text-[14px]">
                    {{ houseCmte }}
                </p>
            </div>
        </div>
        <div class="flex py-2">
            <div class="pr-5 text-[14px] text-[#6C6C6C]">Senate Cmte</div>
            <div class="flex">
                <p>
                    {{ senateCmte }}
                </p>
            </div>
        </div>
        <hr class="my-3 border-[#D0D5DD]" />
        <!-- tags section -->
        <div class="flex flex-col">
            <h6 class="text-[#6C6C6C]">Tags
                <UButton variant="ghost" class="p-0 align-middle text-sm" @click="isOpen = true">
                    <UIcon name="i-heroicons-plus-circle text-xl" class="ml-1 font-semibold text-[#909090]" />
                </UButton>

            </h6>
            <div class="my-3 flex flex-wrap gap-1">
                <UBadge v-for="tag, index in tags" :key="index" :ui="{ rounded: 'rounded-full' }"
                    class="bg-transparent p-0">
                    <div v-if="tag.name" class="flex items-center border border-[#bcbcbc] bg-[#f3f3f3]">
                        <p class="text-xs text-[#474747]">{{ tag.name }}</p>
                        <UButton variant="ghost" class="p-0">
                            <UIcon name="i-heroicons-x-mark" class="ml-1 font-semibold text-[#909090]" />
                        </UButton>
                    </div>
                </UBadge>
            </div>
        </div>
        <UModal v-model="isOpen" :ui="{ background: 'bg-transparent', shadow: 'shadow-none', base: 'overflow-visible' }">
            <div id="tagSearch" class="relative">
                <UInput v-model="inputValue" color="gray" variant="outline" placeholder="Add tags (oil, organs, etc)"
                    class="w-full" autofocus="true" @input="search" />
                <div v-if="inputValue.length > 0 && filteredTags.length"
                    class="autocomplete-dropdown absolute left-0 mx-auto w-full rounded-none bg-white">
                    <ul>
                        <li v-for="tag in filteredTags.slice(0, 3)" :key="tag"
                            class="w-full cursor-pointer p-2 hover:bg-gray-100">{{ tag }}</li>
                    </ul>
                </div>
            </div>
        </UModal>
        <hr class="my-3 border-[#D0D5DD]" />
        <!-- list section -->
        <div class="flex flex-col">
            <section class="">
                <div class="flex">
                    <h6 class="text-[#6C6C6C]">List</h6>
                    <UBadge :ui="{ rounded: 'rounded-full' }"
                        class="ml-[10px] border border-[#EAECF0] !bg-[#ffffff] px-[10px] text-black">
                        {{ list.length }}
                    </UBadge>
                </div>
                <ul class="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-3 md:flex md:flex-wrap">
                    <li v-for="item, index in list" :key="index">
                        <UBadge v-if="showAllTrackingList || index < 3 && item.name" :ui="{ rounded: 'rounded-sm' }"
                            class="border border-[#D0D5DD] bg-[#F2F4F7]">
                            <p class="text-xs text-[#667085]">{{ item.name }}</p>
                            <!-- <span class="ml-2 text-xs text-[#667085]">|</span> -->
                            <!-- <UButton variant="ghost" class="p-0 hover:bg-transparent">
                                <UIcon name="i-heroicons-x-mark" class="ml-1 text-[18px] font-semibold text-[#667085]" />
                            </UButton> -->
                        </UBadge>
                    </li>

                    <li v-if="!showAllTrackingList && list.length > 3">
                        <UBadge
                            class="h-[25px] cursor-pointer rounded-full border border-[#D0D5DD] !bg-[#F2F4F7] text-[#667085]"
                            @click="toggleShowAllTrackingList">
                            +{{ list.length - 3 }}
                        </UBadge>
                    </li>
                    <li>
                        <span v-if="showAllTrackingList" class="cursor-pointer align-middle text-xs underline"
                            @click="toggleShowAllTrackingList">hide</span>
                    </li>
                </ul>
            </section>
            <section>
                <div v-for="item, index in lists" :key="index" class="flex flex-col">
                    <div class="my-5 flex items-center gap-2">
                        <div class="h-[30px] w-[30px] rounded-full bg-[#E2E2E2]"></div>
                        <p class="text-[14px] font-medium">
                            {{ item.name }}
                        </p>
                    </div>
                </div>
            </section>
        </div>
        <hr class="my-2 border-[#D0D5DD]" />
        <div class="flex items-center pt-2">
            <h6 class="mr-[12px] text-[#6C6C6C]">Alert State</h6>
            <CommonIconsActivedAlert v-if="alertState" />
            <CommonIconsInactivatedAlert v-else />
        </div>

        <div v-if="document[0]" class="mb-5 mt-16">
            <a v-if="document[0].chamber == 'PDF'"
                class="block w-full rounded-md bg-[#e2e2e2] py-1 text-center font-medium text-black hover:bg-[#d8d8d8]"
                :href="document[0].district" download="document.pdf">
                <UIcon name="i-heroicons-document-arrow-down" class="align-middle text-xl" /> <span class="align-middle">Download Bill</span>
            </a>
        </div>
    </section>
</template>

<script>
export default {
    name: "TrackingRightPane",
    props: {
        title: {
            type: String,
            default: ""
        },
        subTitle: {
            type: String,
            default: ""
        },
        sponsorAvata: {
            type: String,
            default: ""
        },
        sponsorName: {
            type: String,
            default: ""
        },
        sponsorInfo: {
            type: Number,
            default: 0
        },
        titleList: {
            type: Array,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: []
        },
        actionName: {
            type: String,
            default: ""
        },
        actionDate: {
            type: String,
            default: ""
        },
        progressLevel: {
            type: Number,
            default: 6
        },
        assignAvata: {
            type: String,
            default: ""
        },
        assignName: {
            type: String,
            default: ""
        },
        session: {
            type: String,
            default: ""
        },
        houseCmte: {
            type: String,
            default: ""
        },
        senateCmte: {
            type: String,
            default: ""
        },
        tags: {
            type: Array,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: []
        },
        list: {
            type: Array,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: []
        },
        alertState: {
            type: Boolean,
            default: false
        },
        document: {
            type: Object,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: {},
            require: true
        }
    },
    data() {
        return {
            showAllTrackingList: false,
            progressColors: [
                "#027A48", "#027A48", "#F04438", "#F04438", "#E9E9E9", "#E9E9E9", "#E9E9E9", "#E9E9E9"
            ],
            isOpen:false,
            inputValue:'',
            allTags:[],
            filteredTags:[],

        }
    },
    computed: {
        apiURL() {
            const { public: config } = useRuntimeConfig();
            return config.BACKEND_API_URL;
        },
        progressList() {
            const data = Array(this.progressLevel).fill(1);
            return data;
        },
        affectedItems() {

            let val = "";
            Array.from(this.titleList).forEach(item => {
                val += item + ", "
            })
            val = val.slice(0, -2);
            return val;
        }
    },
    async mounted() {
        await this.fetchTags();
    },
    methods: {
        async downloadPDF(url, filename) {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                
                const blob = await response.blob();
                const downloadUrl = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(downloadUrl);
            } catch (error) {
                console.error("Error downloading the file: ", error);
            }
        },
        toggleShowAllTrackingList() {
            this.showAllTrackingList = !this.showAllTrackingList
        },
        search () {
            if (this.inputValue.length < 1) {
                this.filteredTags = [];
            } else {
                this.filteredTags = this.allTags.filter(tag =>
                    tag.toLowerCase().includes(this.inputValue.toLowerCase())
                );
            }
        },
        async fetchTags() {
            try {
                const response = await fetch(`${this.apiURL}/tags/all/`);
                if (response.ok) {
                    const data = await response.json();
                    this.allTags = data.map(item => item.tag);
                }
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        }
    }
}
</script>