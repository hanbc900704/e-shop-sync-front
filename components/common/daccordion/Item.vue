<template>
    <div :id="groupId + '-' + item.id" class="accordion-item" :class="{'is-active': active}">
        <dt class="accordion-item-title relative mt-6 flex items-center justify-between" @click="toggle" >
            <span>{{ item?.title }} ({{ getWholeCount() }})</span>
            <UButton class="accordion-item-trigger flex items-center justify-between bg-transparent text-black" 
                icon="i-heroicons-chevron-up"  />
        </dt>
        <transition
            name="accordion-item"
            @enter="startTransition"
            @after-enter="endTransition"
            @before-leave="startTransition"
            @after-leave="endTransition">
            <dd v-if="active" class="accordion-item-details">
                <div class="accordion-item-details-inner flex w-full flex-col">
                    <UContainer v-for="ele, index in item.childs" :key="index" class="w-full py-[16px]"> 
                        <div class="flex w-full flex-col">
                            <span class="mb-[8px]">{{ ele?.catalogName }} ({{ getSubCount(ele) }})</span>
                            <div class="flex w-full flex-wrap items-center rounded-[8px] p-[24px] shadow-[1px_1px_6px_1px_#00000050]">
                                <div v-for="cc, idx in ele.sonCatalogList" :key="idx" class="w-[240px] p-[8px]">
                                    <a :href="path + '/' + cc?.catalogId" class="flex flex-col">
                                        <span>{{ cc?.catalogName }}</span>
                                        <span v-if="countList[`${cc?.catalogId}`]" class="ht-12px">({{ countList[cc?.catalogId] }})</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </UContainer>
                </div>
            </dd>
        </transition>
    </div>
</template>

<script>
export default {
    name: "CommonDaccordionItem",
    props: {
        item: {
            type: Object,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: {}
        }, 
        multiple: {
            type: Boolean,
            default: false
        }, 
        groupId: {
            type: String,
            default: ""
        },
        path: {
            type: String,
            default: ""
        },
        countList: {
            type: Object,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: {}
        }
    },
    data() {
        return {
            active: true
        }
    },
    computed: {

    },
    watch: {
        
    },
    created() {
        
    },
    methods: {
        toggle(event) {
            if (this.multiple) {
                 
                this.active = !this.active;
            }
            else {
                this.$parent.$children.forEach((item) => {
                    if (item.$el.id === event.currentTarget.parentElement.parentElement.id) item.item.active = !item.item.active
                    else item.item.active = false
                }) 
            }
        },
        startTransition(el) {
            el.style.height = el.scrollHeight + 'px'
        },
        
        endTransition(el) {
            el.style.height = ''
        },
        getWholeCount() {
            let wholeCnt = 0;
            this.item.childs && Array.from(this.item.childs).forEach(ele => {
                ele.sonCatalogList.forEach(cc => {
                    wholeCnt += this.countList[cc?.catalogId];
                })
            })
            return wholeCnt;
        },
        getSubCount(ele) {
            let wholeCnt = 0;
            ele.sonCatalogList.forEach(cc => {
                wholeCnt += this.countList[cc?.catalogId];
            })
            return wholeCnt;
        }
    },
}
</script>
