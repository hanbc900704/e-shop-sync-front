<template>
    
    <div class="flex w-full flex-col">
        <CommonHeader :title="productName" :to="'/category/' + categoryParam"/>
        <hr>
        <div v-if="loading" class="flex w-full flex-col p-[20px]">
            loading...
        </div>
        <UContainer v-else class="mx-[auto] flex w-full flex-col p-[20px]">
            <div class="my-[32px] flex w-full">
                <div class="flex flex-col">
                    <a href="#" @click="copyToClipboard(processToLocalURL(productData.breviaryImageUrl))">
                        <div class="flex h-[200px] w-[200px]">
                            <img v-if="productData.breviaryImageUrl" :src="'data:image/jpeg;base64,' + largeImage" alt="img" class="h-full w-full object-contain">
                            <img v-else src="https://static.szlcsc.com/ecp/assets/web/common/images/productItem/lcpt.jpg" alt="img" class="h-full w-full object-contain">
                        </div>
                    </a>
                    <div class="mt-[12px] flex h-[60px] w-[200px]">
                        <a v-for="item, index in smallImages" :key="index" href="#" class="mr-[8px]" @click="copyToClipboard('D:/resources/' + item)" >
                            <img :src="'data:image/jpeg;base64,' + item" alt="img" class="h-[60px] w-[60px] hover:scale-[200%]">
                        </a>
                    </div>

                </div>
                <div class="flex w-[50%] flex-col px-[24px] py-[12px]">
                    <div class="mb-2 flex items-center">
                        <span class="mr-2">{{ productData?.lightBrandName }}</span>
                        <span>{{ productData?.productName }}</span>
                    </div>
                    <div class="mb-2 flex flex-col">
                        <div v-for="item, index in processPrice(productData?.numberprices)" :key="index" class="flex items-center">
                            <span>{{ item.count }}+ : </span>
                            <span class="ml-1">￥{{ item.price }} / {{ processPriceUnit(productData?.numberprices) }}</span>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <span></span>
                        <span class="ml-1">{{ productData?.recentlySalesCount }}</span>
                    </div>
                    <div class="flex items-center">
                        <span>近期成交: </span>
                        <span class="ml-1">{{ productData?.recentlySalesCount }}</span>
                    </div>
                </div>
                <div class="flex flex-col px-[24px] py-[12px]">
                    <div v-if="!checkCompany(productData?.lightBrandName)" class="flex items-center">
                        <span>品牌: </span>
                        <span class="ml-1">{{ productData?.lightBrandName }}</span>
                    </div>
                    <div class="flex items-center">
                        <span>封装: </span>
                        <span class="ml-1">{{ productData?.lightStandard }}</span>
                    </div>
                    <div class="flex items-center">
                        <span>编号: </span>
                        <span class="ml-1">{{ productData?.lightProductCode }}</span>
                    </div>
                </div>
            </div>

            <div class="flex w-full flex-col">
                <div v-for="item, index in processPDF(productData?.fileTypeVOList)" :key="index" class="flex w-full flex-col py-[24px]">
                    <a href="#" @click="copyToClipboard('D:/resources/' + item.url)">
                        <span>{{ item.name }}</span>
                    </a>
                </div>
                <div v-for="item, index in fetchedPDFList" :key="index" class="flex w-full flex-col py-[24px]">
                    
                    <!-- <button @click="openBlob(item.url)">Click</button> -->
                    <iframe :src="openBlob(item.url)" class="h-[800px] w-full"></iframe>
                </div>
            </div>

        </UContainer>
    </div>
</template>

<script>
export default {
    name: "Category",
    setup() {
        
    },
    data() {
        return {
            productName: "",
            productData: {},
            loading: true,
            fetchedPDFList: [],
            largeImage: '',
            smallImages: []
        }
    },
    computed: {
        categoryParam() {
            return this.$route.params.id;
        },
        param() {
            return this.$route.params.idx;
        },
        apiURL() {
            const { public: config } = useRuntimeConfig();
            return config.SYNC_BACKEND_API_URL;
        },
    },
    watch: {
        
    },
    async created() {
        await this.fetchProductByID();
    },
    methods: {
        checkCompany(name) {
            const nameStr= String(name).toLowerCase()
            if (nameStr.includes("samwha") || nameStr.includes("samsung") || nameStr.includes("hynix")) {
                return true
            }
            return false
        },
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
        openBlob(data) {
            const binStr = atob( data );
            const len = binStr.length;
            const arr = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                arr[ i ] = binStr.charCodeAt( i );
            }
            const blob =  new Blob( [ arr ], { type: 'application/pdf' } );
            const url = URL.createObjectURL( blob );
            // window.open(url)
            return url;
        },
        async fetchProductByID() {
            try {
                const response = await $fetch(`${this.apiURL}data/product/${this.categoryParam}/${this.param}`)
                this.productName = response.productData?.productModel
                this.productData = response.productData

                const pdfList = this.processPDF(this.productData?.fileTypeVOList);
                const res = await $fetch(`${this.apiURL}data/product/parsePDF`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': "*"
                    },
                    body: JSON.stringify({list: pdfList})
                })

                this.fetchedPDFList = res.list

                this.largeImage = await this.processToLocal(this.productData.breviaryImageUrl)
                this.smallImages = await this.processToImgList(this.productData.luceneBreviaryImageUrls)
                this.loading = false;
            } catch (e) {
                console.log(e)
            }
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
        processPDF(list) {
            const retList = [];

            list && Array.from(list).forEach(item => {
                if (Array.from(item.detailVOList).length) {
                    let url = item.detailVOList[0].fileUrl + "";
                    if (url.includes("https://")) {
                        url = url.replace("https://", "")
                        const urlList = url.split("/");
                        urlList.splice(0);
                        url = "/" + urlList.join("/")
                    }
                    retList.push({ name: item.detailVOList[0].fileName, url})
                }
            })
            return retList
        },
        async processToLocal(url) {
            let _url = url + "";
            
            if (_url.includes("https://")) {
                _url = _url.replace("https://", "")
                const urlList = _url.split("/");
                urlList.splice(0, 1);
                _url = "/" + urlList.join("/")
            }
            _url = "D:/resources" + _url

            return await this.getImageFromBackend(_url)
        },
        async processToImgList(urls) {
            const ret = [];
            const urlList = (urls + "").split("<$>");
            for (let i = 0; i < urlList.length; i++) {
                ret.push(await this.processToLocal(urlList[i]));
            }
            return ret
        },
        processToLocalURL(url) {
            let _url = url + "";
            
            if (_url.includes("https://")) {
                _url = _url.replace("https://", "")
                const urlList = _url.split("/");
                urlList.splice(0, 1);
                _url = "D:/resources/" + urlList.join("/")
            } else {
                _url = "D:/resources/" + _url
            }
            return _url
        },
        openLink(url) {
            window.open(url, '_blank')
        },
        async copyToClipboard(textToCopy) {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(textToCopy);
            } else {
                const textArea = document.createElement("textarea");
                textArea.value = textToCopy;
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