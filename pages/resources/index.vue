<template>
    <div class="flex w-full flex-col">
        <CommonHeader title="Resource Sync..." />
        <hr>
        <div class="flex p-[20px]">
            <div class="flex basis-9/12 flex-col">
                <UContainer class="flex w-full items-center px-[24px] py-[12px]">
                    <UCheckbox v-model="selected" name="checkall" label="CheckAll" />
                    <UButton id="syncBtn" class="ml-[32px] flex justify-center rounded-[8px] bg-gradient-to-r 
                        from-[#949494A0] to-[#949494A0] px-[24px] py-[12px] text-center" @click="syncProcess()">
                        Sync Resources for the selected Product
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
            <div class="fixed right-[40px] top-[120px] flex min-w-[400px] basis-3/12 flex-col pl-[24px]">
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
    name: "Resources",
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
        database() {
            return this.$store.getters.database;
        },
        syncStatus() {
            return this.$store.getters.syncStartStatus;
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
        },
        currentProgress() {
            return this.$store.getters.rscCurrentProgress;
        },
        currentCategoryList() {
            return this.$store.getters.rscCurrentCategoryList
        },
        totalProgress() {
            return this.$store.getters.rscTotalProgress;
        },
        totalProgressList() {
            return this.$store.getters.rscTotalCategoryList;
        },
        currentStuffProgress() {
            return this.$store.getters.rscCurrentStuffProgress;
        },
        totalStuffProgress() {
            return this.$store.getters.rscTotalStuffProgress;
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
    },
    watch: {
        syncStatus(now) {
            this.disableProcess(!now);
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
            await this.$store.dispatch("syncRscInitialProgress");
        }
        setInterval(this.timer, 2000);
    },
    mounted() {
    },
    unmounted() {
        clearInterval(this.timer);
    },
    methods: {
        async timer() {
            if (this.currentStuffType === "rsc-sync") {
                await this.$store.dispatch("syncRscCurrentProgress")
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
                await this.$store.dispatch("startDBSync", {list: selectedlists, type: 'rsc-sync'});
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
    }
}
</script>