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
            <div class="flex basis-3/12 flex-col pl-[24px]">
                <UContainer class="flex w-full flex-col py-[24px]">
                    <UProgress animation="carousel"/>

                    <label class="my-[12px]">Current Sync Progress</label>
                    <UProgress indicator :value="3" class="w-full" />
                    <label class="my-[12px]">Entire Progress</label>
                    <UProgress indicator :value="10" class="w-full" />
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
        database() {
            return this.$store.getters.database;
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
        
    },
    async created() {
        
    },
    mounted() {
    },
    unmounted() {
        clearInterval(this.timer);
    },
    methods: {
        async timer() {
        },
    }
}
</script>