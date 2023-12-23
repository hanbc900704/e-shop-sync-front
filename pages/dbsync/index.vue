<template>
    <div class="flex w-full flex-col">
        <CommonHeader title="Database Sync..." />
        <hr>
        <div class="flex p-[20px]">
            <div class="flex basis-9/12 flex-col">
                <UContainer class="flex w-full items-center px-[24px] py-[12px]">
                    <UCheckbox v-model="selected" name="checkall" label="CheckAll" />
                    <UButton id="syncBtn" class="ml-[32px] flex justify-center rounded-[8px] bg-gradient-to-r 
                        from-[#949494A0] to-[#949494A0] px-[24px] py-[12px] text-center" @click="syncProcess()">
                        Sync DataBase for the selected Product
                    </UButton>
                    <UButton class="ml-[24px] flex justify-center rounded-[8px] bg-gradient-to-r 
                        from-[#949494A0] to-[#949494A0] px-[24px] py-[12px] text-center" @click="cancelProcess()">
                        Cancel
                    </UButton>
                </UContainer>
                <UContainer class="flex w-full items-center px-[24px] py-[12px]">
                    <CommonAccordion ref="catalog-select-wrapper" :content="allCatagories" :multiple=true :select-all=selected />
                </UContainer>
            </div>
            <div class="fixed right-[40px] top-[100px] flex min-w-[400px] basis-3/12 flex-col pl-[24px]">
                <UContainer class="flex flex-col">
                    <div class="flex flex-col pt-[24px]">
                        <label class="mb-[12px]">Step1: Construct Original Data</label>
                        <UButton :disabled=originDataStatus class="flex justify-center rounded-[8px] bg-gradient-to-r 
                            from-[#949494A0] to-[#949494A0] px-[24px] py-[12px] text-center" @click="originDataSync">
                            Sync
                        </UButton>
                    </div>
                    <div class="flex flex-col pt-[24px]">
                        <label>(*) ReConstruct Original Data</label>
                        <span class="mb-[12px]">this is not mandantary...</span>
                        <UButton disabled class="flex justify-center rounded-[8px] bg-gradient-to-r 
                            from-[#949494A0] to-[#949494A0] px-[24px] py-[12px] text-center" @click="originDataReSync">
                            ReSync
                        </UButton>
                    </div>
                    <div class="flex flex-col pt-[24px]">
                        <label class="mb-[12px]">Step2: Construct DB Tree</label>
                        <UButton :disabled=categoryTreeStatus class="flex justify-center rounded-[8px] bg-gradient-to-r 
                            from-[#949494A0] to-[#949494A0] px-[24px] py-[12px] text-center" @click="catagoryTreeSync">
                            Construct
                        </UButton>
                    </div>
                    <div class="flex flex-col pt-[24px]">
                        <label class="mb-[12px]">Step3: Sync Filter Parameters</label>
                        <UButton :disabled=filterParamStatus class="flex justify-center rounded-[8px] bg-gradient-to-r 
                            from-[#949494A0] to-[#949494A0] px-[24px] py-[12px] text-center" @click="filterParamSync">
                            Sync
                        </UButton>
                    </div>
                    <div class="flex flex-col py-[24px]">
                        <label class="mb-[12px]">Clear All Database</label>
                        <UButton disabled class="flex justify-center rounded-[8px] bg-gradient-to-r 
                            from-[#949494A0] to-[#949494A0] px-[24px] py-[12px] text-center" @click="removeAll">
                            Remove All DB
                        </UButton>
                    </div>
                </UContainer>

                <UDivider label="Progress" />

                <UContainer class="flex w-full flex-col py-[24px]">
                    <UProgress v-show="syncStatus" animation="carousel"/>

                    <label class="my-[12px]">Current Sync Progress</label>
                    <UProgress indicator :value="curPercent" class="w-full" />
                    <label class="mb-[12px]">Entire Progress</label>
                    <UProgress indicator :value="entirePercent" class="w-full" />
                </UContainer>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Dbsync",
    data() {
        return {
            contents: [],
            selected: false
        }
    },
    computed: {
        currentStuffType() {
            return this.$store.getters.currentStuffType;
        },
        dbConstructStatus() {
            return this.$store.getters.status;
        },
        database() {
            return this.$store.getters.database;
        },
        syncStatus() {
            return this.$store.getters.syncStartStatus;
        },
        originDataStatus() {
            return this.$store.getters.originDataStatus;
        },
        categoryTreeStatus() {
            return this.$store.getters.categoryTreeStatus;
        },
        filterParamStatus() {
            return this.$store.getters.filterParamStatus;
        },
        currentProgress() {
            return this.$store.getters.currentProgress;
        },
        currentCategoryList() {
            return this.$store.getters.currentCategoryList
        },
        totalProgress() {
            return this.$store.getters.totalProgress;
        },
        totalProgressList() {
            return this.$store.getters.totalCategoryList;
        },
        currentStuffProgress() {
            return this.$store.getters.currentStuffProgress;
        },
        totalStuffProgress() {
            return this.$store.getters.totalStuffProgress;
        },
        curPercent() {
            if (this.totalStuffProgress === 0) {
                return 0;
            }
            return this.currentStuffProgress / this.totalStuffProgress * 100
        },
        entirePercent() {
            if (this.totalStuffProgress === 0) {
                return 0;
            }
            return this.currentProgress / this.totalProgress * 100
        },
        allCatagories() {
            if (this.database) {
                const mainCatalogs = Object.keys(this.database);
                const accItems = [];
                mainCatalogs.forEach(catalog => {
                    const elem = {
                        id: this.database[catalog].catalogId,
                        active: true,
                        title: catalog,
                        childs: this.database[catalog]?.sonCatalogList || []
                    }
                    accItems.push(elem);
                })
                return accItems;
            }
            return []
        }
    },
    watch: {
        database(now) {
            console.log('database', now)
        },
        syncStatus(now) {
            this.disableProcess(!now);
        },
        curPercent(now) {
            console.log('curPercent', now)
        },
        entirePercent(now) {
            console.log('entirePercent', now)
        },
        currentStuffProgress(now) {
            console.log('currentStuffProgress', now)
        },
        currentProgress(now) {
            console.log('currentProgress', now)
        },
        currentCategoryList(now) {
            Array.from(now).forEach(item => {
                const checkBox = document.getElementById(`dbsync-checkbox-${item}`);
                if (checkBox) {
                    const parent = checkBox.parentElement.parentElement;
                    
                    const lbl = parent.getElementsByTagName('label')

                    parent && lbl.length && (lbl[0].style.color = "#00AE00");
                }
            })
        }
    },
    async created() {
        // console.log('this.dbConstructStatus', this.dbConstructStatus)
        if (!this.dbConstructStatus) {
            await this.$store.dispatch("getPreRequest");

            await this.$store.dispatch("constructOriginTree");

            await this.$store.dispatch("syncInitialProgress");
        }
        setInterval(this.timer, 2000);
    },
    mounted() {
        console.log(this.totalProgress, ' / ', this.currentProgress)
    },
    unmounted() {
        clearInterval(this.timer);
    },
    methods: {
        async timer() {
            if (this.currentStuffType === "db-sync") {
                await this.$store.dispatch("syncCurrentProgress")
            }
        },
        async syncProcess() {
            const selectedlists = [];

            const elements = document.getElementsByClassName("catalog-select-checkbox");
            Array.from(elements).forEach(item => {
                const itemCh = item.getElementsByTagName("input")
                if (itemCh && itemCh.length > 0) 
                {
                    if (itemCh[0].checked) {
                        selectedlists.push(itemCh[0].getAttribute("name"))
                    }
                }
            })

            if (selectedlists.length === 0) {
                this.$toast.error("Please Select the Items, and Try again!")
                return;
            }

            try {
                await this.$store.dispatch("startDBSync", {list: selectedlists, type: 'db-sync'});
            } catch (err) {
                this.$toast.error("Error Occurred during the Process" + err)
            }
        },
        async cancelProcess() {
            await this.$store.dispatch("pauseDBSync")
        },
        disableProcess(flag) {
            const checkboxs = document.getElementsByTagName("input");
            const syncBtn = document.getElementById("syncBtn");

            Array.from(checkboxs).forEach(item => {
                item.disabled = !flag;
            })

            syncBtn && (syncBtn.disabled = !flag);
        },
        originDataSync() {
            this.$store.dispatch("originDataSync");
        },
        originDataReSync() {
            this.$store.dispatch("originDataReSync");
        },
        catagoryTreeSync() {
            this.$store.dispatch("catagoryTreeSync");
        },
        filterParamSync() {
            this.$store.dispatch("filterParamSync");
        },
        removeAll() {
            this.$store.dispatch("removeAll");
        },
    }
}
</script>