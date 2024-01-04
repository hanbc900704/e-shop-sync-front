<template>
    <div class="flex w-full flex-col">
        <CommonHeader :title="`Product Categories (totalCount: ${totalCount})`" />
        <hr>
        <div class="flex p-[20px]">
            <UContainer class="flex w-full items-center px-[24px] py-[12px]">
                <CommonDaccordion ref="catalog-select-wrapper" :content="allCatagories" :multiple=true path="/category" 
                    :count-list="productCountList"/>
            </UContainer>
        </div>
    </div>
</template>

<script>
export default {
    name: "Category",
    setup() {
        
    },
    data() {
        return {
            contents: [],
            countList: {},
            totalCount: 0
        }
    },
    computed: {
        productCountList() {
            return this.$store.getters.productCountList;
        },
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
        },
        
    },
    watch: {
        productCountList(now) {
            console.log('productCountList', now)
            this.totalCount = Object.values(now).reduce((a, b) => a + b, 0);
        }
    },
    async created() {
        if (!this.dbConstructStatus) {
            await this.$store.dispatch("constructOriginTree");
            await this.$store.dispatch("getCountList");
            
        }
    },
    methods: {
        
    }
}
</script>