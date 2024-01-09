<template>
    <div class="flex w-full flex-col">
        <CommonHeader :title="'Product List(' + totalCount +')'" to="/category"/>
        <hr>

        <div v-if="loading" class="flex w-full flex-col p-[20px]">
        </div>
        <div v-else class="flex w-full flex-col p-[20px]">
            <div class="mb-[32px] w-full p-[24px]">
                <div class="flex h-[320px] w-full overflow-auto ">
                    <div v-for="item, index in paramList" :key="index" class="mr-[8px] flex h-full flex-col border-x bg-white p-[8px]" >
                        <div class="flex flex-col rounded-[4px] bg-[#00000010] p-[8px]">
                            <span>{{ item.parameterName }}</span>
                            <span>{{ item.parameterCode }}</span>
                        </div>
                        <div class="mt-[12px] flex h-full flex-col">
                            <div v-for="item1, index1 in item.parameterValueList" :key="index1" class="pb-[12px]">
                                <UCheckbox :name="item1" :label="item1"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <UTable class="rounded-lg border border-[#EAECF0]" :rows="filteredData"
                :columns="columns" sort-asc-icon="i-heroicons-arrow-up-20-solid"
                sort-desc-icon="i-heroicons-arrow-down-20-solid"
                :sort-button="{ icon: 'i-heroicons-arrows-up-down', size: 'sm' }" :loading="loading"
                :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }" >
                <template #image-data="{ row }">
                    <a href="#" @click="copyToClipboard(processToLocalURL(row.productData?.breviaryImageUrl));">
                        <div class="h-[120px] w-[120px]">
                            <img v-if="row.productData?.breviaryImageUrl" :src="'data:image/jpeg;base64,' + row.processedImg" alt="img" class="h-full w-full object-contain">
                            <img v-else src="https://static.szlcsc.com/ecp/assets/web/common/images/productItem/lcpt.jpg" alt="img" class="h-full w-full object-contain">
                        </div>
                    </a>
                </template>
                <template #c1-data="{ row }">
                    <div class="flex flex-col">
                        <a :href="'/category/' + param + '/' + row.productData?.productId"><span>{{ row.productData?.productModel }}</span></a>
                        <div class="flex items-center">
                            <span>品牌: </span>
                            <span class="ml-1">{{ row.productData?.lightBrandName }}</span>
                        </div>
                        <div class="flex items-center">
                            <span>封装: </span>
                            <span class="ml-1">{{ row.productData?.lightStandard }}</span>
                        </div>
                    </div>
                </template>
                <template #c2-data="{ row }">
                    <div class="flex flex-col">
                        <div v-for="item, index in Object.keys(row.productData?.paramLinkedMap)" :key="index" class="flex items-center">
                            <span>{{ item }}: </span>
                            <span class="ml-1">{{ row.productData?.paramLinkedMap[item] }}</span>
                        </div>
                    </div>
                </template>
                <template #c3-data="{ row }">
                    <div class="flex flex-col">
                        <div class="flex items-center">
                            <span>类目: </span>
                            <span class="ml-1">{{ row.productData?.productType }}</span>
                        </div>
                        <div class="flex items-center">
                            <span>编号: </span>
                            <span class="ml-1">{{ row.productData?.lightProductCode }}</span>
                        </div>
                        <div v-if="row.productData?.fileTypeVOList" class="flex items-center">
                            <span>详细: </span>
                            <span class="ml-1">用户手册</span>
                        </div>
                    </div>
                </template>
                <template #c4-data="{ row }">
                    <div class="flex flex-col">
                        <div v-for="item, index in processPrice(row.productData?.numberprices)" :key="index" class="flex items-center">
                            <span>{{ item.count }}+ : </span>
                            <span class="ml-1">￥{{ item.price }}</span>
                        </div>
                    </div>
                </template>
                <template #c5-data="{ row }">
                    <div class="flex flex-col">
                        <div class="flex items-center">
                            <span>近期成交: </span>
                            <span class="ml-1">{{ row.productData?.recentlySalesCount }}</span>
                        </div>
                    </div>
                </template>
                <template #action-data="{ row }">
                    <div class="flex flex-col">
                        <RouterLink :to="'/category/' + param + '/' + row.productData?.productId" class="ml-0">
                            <UButton color="white" variant="solid" icon="i-heroicons-chevron-right"
                                class="!border-none ring-0" />
                            
                        </RouterLink>
                    </div>
                </template>
            </UTable>
            <div class="flex justify-end border-t border-gray-200 px-[40px] py-3.5 dark:border-gray-700">
                <UPagination v-model="page" :page-count="pageCount" :total="totalCount" />
            </div>
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
            loading: true,
            columns: [{
                    key: 'image',
                    label: 'Image',
                    class: 'w-[160px]'
                }, {
                    key: 'c1',
                    label: '型号/品牌/封装',
                }, {
                    key: 'c2',
                    label: '参数',
                }, {
                    key: 'c3',
                    label: '类别/数据手册',
                }, {
                    key: 'c4',
                    label: '价格',
                }, {
                    key: 'c5',
                    label: '近期成交',
                }, {
                    key: 'action',
                    label: '',
                    class: 'w-[40px]'
                }
            ],
            page: 1,
            pageCount: 30,
            totalCount: 0,
            paramList: []
        }
    },
    computed: {
        param() {
            return this.$route.params.id;
        },
        apiURL() {
            const { public: config } = useRuntimeConfig();
            return config.SYNC_BACKEND_API_URL;
        },
        filteredData() {
            // return this.contents.slice((this.page - 1) * this.pageCount, (this.page) * this.pageCount)
            return this.contents
        },
    },
    watch: {
        async page(now) {
            this.loading = true;
            const response = await $fetch(`${this.apiURL}data/list/${this.param}/${this.pageCount}/${now}`)
            
            const processed = response.list;
            
            for (let i = 0; i < processed.length; i++) {
                let url = processed[i].productData?.breviaryImageUrl
                url = this.processToLocal(url)
                const imgBase64 = await this.getImageFromBackend(url)
                processed[i].processedImg = imgBase64
            }

            
            this.contents = processed;
            console.log(this.contents)

            this.loading = false;
        }
    },
    async created() {
        await this.fetchProductsByCategoryID();
    },
    methods: {
        async getImageFromBackend(url) {
            const res = await $fetch(`${this.apiURL}data/getFileContent`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'accept': "*"
                },
                body: JSON.stringify({filename: url})
            })

            if (res.fileInfo) {
                return res.fileInfo
            } else {
                return url
            }
        },
        async fetchProductsByCategoryID() {
            try {
                const response = await $fetch(`${this.apiURL}data/list/${this.param}`)
                const processed = response.list;
                
                for (let i = 0; i < processed.length; i++) {
                    let url = processed[i].productData?.breviaryImageUrl
                    url = this.processToLocal(url)
                    const imgBase64 = await this.getImageFromBackend(url)
                    processed[i].processedImg = imgBase64
                }

                
                this.contents = processed;
                console.log(this.contents)
                this.totalCount = response.totalCnt;

                this.loading = false;

                const res = await  $fetch(`${this.apiURL}data/filterParam/${this.param}`)
                this.paramList = res.list;

            } catch (e) {
                console.log(e)
            }
        },
        parseObj(str) {
            return JSON.parse(str)
        },
        processPrice(str) {
            const strlist = str.split(",");
            const retList = []
            
            if (strlist.length > 5) {
                const unit = strlist[1]
                for (let i = 5; i < strlist.length; i=i+3) {
                    if (strlist.length > i + 2)
                        retList.push({count: strlist[i] * unit, price: strlist[i + 2]})
                }
            }
            return retList
        },
        processPriceUnit(str) {
            return str.split(",")[0]
        }, 
        processToLocal(url) {
            let _url = url + "";
            
            if (_url.includes("https://")) {
                _url = _url.replace("https://", "")
                // console.log('_url1', _url)
                const urlList = _url.split("/");
                // console.log('_url2', urlList)
                urlList.splice(0, 1);
                // console.log('_url3', urlList)
                _url = "/" + urlList.join("/")
                // console.log('_url4', _url)
            }
            _url = "D:" + _url
            return _url
        },
        processToLocalURL(url) {
            let _url = url + "";
            
            if (_url.includes("https://")) {
                _url = _url.replace("https://", "")
                // console.log('_url1', _url)
                const urlList = _url.split("/");
                // console.log('_url2', urlList)
                urlList.splice(0, 1);
                // console.log('_url3', urlList)
                _url = "D:/" + urlList.join("/")
                // console.log('_url4', _url)
            } else {
                _url = "D:/" + _url
            }
            // window.location(_url)
            return _url
        },
        async copyToClipboard(textToCopy) {
            // Navigator clipboard api needs a secure context (https)
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(textToCopy);
            } else {
                // Use the 'out of viewport hidden text area' trick
                const textArea = document.createElement("textarea");
                textArea.value = textToCopy;
                    
                // Move textarea out of the viewport so it's not visible
                textArea.style.position = "absolute";
                textArea.style.left = "-999999px";
                    
                document.body.prepend(textArea);
                textArea.select();

                try {
                    document.execCommand('copy');
                } catch (error) {
                    console.error(error);
                } finally {
                    textArea.remove();
                }
            }
        }

    }
}
</script>