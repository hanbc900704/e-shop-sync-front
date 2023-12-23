<template>
    <div :id="groupId + '-' + item.id" class="accordion-item" :class="{'is-active': active}">
        <dt class="accordion-item-title mt-6 flex items-center justify-between">
            <UCheckbox v-model="selected" :name="item?.title" :label="item?.title || ''" @change="(e) => mainCheckChanged(e)"/>
            <UButton class="accordion-item-trigger flex items-center justify-between bg-transparent text-black" 
                icon="i-heroicons-chevron-up" @click="toggle"/>
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
                            <UCheckbox v-model="categorySelected[index]" class="border-b pb-[12px]" :name="ele?.catalogName + ''" :label="ele?.catalogName || ''" 
                                @change="(e) => subCheckChanged(e, ele.sonCatalogList)"
                            />
                            <div class="flex w-full flex-wrap items-center">
                                <div v-for="cc, idx in ele.sonCatalogList" :key="idx" class="w-[200px] p-[16px]">
                                    <UCheckbox :id="'dbsync-checkbox-' + cc?.catalogId" v-model="checkList[cc?.catalogId]" class="catalog-select-checkbox" :name="cc?.catalogId + ''" :label="cc?.catalogName || ''" />
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
    name: "CommonAccordion",
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
        selectAll: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            selected: false,
            categorySelected: Array(this.item.childs.length).fill(false),
            checkList: this.getMergedChildIds(),
            active: true
        }
    },
    computed: {
        mergedChilds() {
            let childs = [];
            this.item.childs.forEach(child => {
                childs = childs.concat(child.sonCatalogList);
            })
            return childs.map(child => { return child.catalogId});
        }
    },
    watch: {
        selectAll(now) {
            this.selected = now
            this.changeAllStatus(now)
        }
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
        getMergedChildIds() {
            let childs = [];
            this.item.childs.forEach(child => {
                childs = childs.concat(child.sonCatalogList);
            })
            const idList = childs.map(child => { return child.catalogId});

            const idObj = {}
            idList.forEach(cid => {
                idObj[cid] = false;
            })
            return idObj
        },
        changeAllStatus(flag) {
            if (flag) {
                this.categorySelected = Array(this.item.childs.length).fill(true);
                Object.keys(this.checkList).forEach(key => {
                    this.checkList[key] = true
                })
            } else {
                this.categorySelected = Array(this.item.childs.length).fill(false);
                Object.keys(this.checkList).forEach(key => {
                    this.checkList[key] = false
                })
            }
        },
        mainCheckChanged(e) {
            if (e.target.checked) {
                this.changeAllStatus(true)
            } else {
                this.changeAllStatus(false)
            }
        },
        subCheckChanged(e, list) {
            if (e.target.checked) {
                list.forEach(item => {
                    this.checkList[item.catalogId] = true;
                })
                
            } else {
                list.forEach(item => {
                    this.checkList[item.catalogId] = false;
                })
            }
        }
    }
}
</script>
