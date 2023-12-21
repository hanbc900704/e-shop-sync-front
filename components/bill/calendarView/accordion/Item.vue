<template>
  <div :id="groupId + '-' + item.id" class="accordion-item" :class="{ 'is-active': item.active }">
    <span class="ht-20 text-black">{{ item?.title?.date || "Today" }}</span>
    <dt class="accordion-item-title mt-6">
      <div class="accordion-item-info absolute left-0 top-4 flex flex-col">
        <span class="ht-16 text-black">{{ item?.title?.time }}</span>
        <span class="ht-14 mb-2 text-gray-600">{{ item?.title?.event }}</span>
        <span v-if="!item?.title?.status"
          class="ht-16 rounded-[16px] bg-[#E3E3E3] px-[8px] py-[2px] text-gray-600">Cancelled</span>
      </div>
      <button class="accordion-item-trigger flex items-center justify-between" @click="toggle">
        <h4 class="ht-16 accordion-item-title-text max-w-[calc(100%-160px)] text-black">{{ item.title.content }}</h4>
        <div class="control-btn-wrapper flex items-center">
          <a :href="item.title.url" class="p-[8px]">
            <img src="/images/video.svg" alt="video-icon" class="h-[20px] w-[20px]" />
          </a>
          <a :href="item.title.data" class="p-[8px]">
            <img src="/images/clipboard.svg" alt="video-icon" class="h-[20px] w-[20px]" />
          </a>
          <div class="mx-[8px] h-[20px] w-[1px] bg-gray-300"></div>

          <span class="accordion-item-trigger-icon p-[8px]">
            <img src="/images/arrow.svg" alt="video-icon" class="h-[20px] w-[20px]" />
          </span>
        </div>
      </button>
    </dt>
    <transition name="accordion-item" @enter="startTransition" @after-enter="endTransition"
      @before-leave="startTransition" @after-leave="endTransition">
      <dd v-if="item.active" class="accordion-item-details">
        <div class="accordion-item-details-inner flex w-full flex-col">

          <div class="rounded-[8px] border-[1px] border-[#D0D5DD]">
            <div class="flex items-center rounded-t-[8px] bg-gray-200 px-[24px] py-[8px] text-[#6C6C6C]">
              Members: {{ item.details.members.text }}
              <button class="ml-[16px] border-0 p-0" @click="copyClipboard(item.details.members.republicans, item.details.members.democrats)">
                <img src="/images/envelop.svg" alt="envelop" />
              </button>
            </div>
            <div class="flex flex-col px-[24px] py-[16px] text-black">
              <div class="flex flex-col py-[8px]">
                <span class="ht-14 mb-[16px] mr-[16px] flex items-center text-[#6C6C6C]">
                  Republicans
                  <button class="ml-[16px] border-0 p-0" @click="copyClipboard(item.details.members.republicans)">
                    <img src="/images/envelop.svg" alt="envelop" />
                  </button>
                </span>
                <div class="grid grid-cols-3 gap-3">
                  <div v-for="republican, i in item.details.members.republicans" :key="i" class="flex items-center gap-2">
                    <div class="h-[40px] w-[40px] rounded-full">
                      <img v-if="republican.avatar" :src="republican.avatar" alt="Avatar" class="h-full w-full object-cover object-top"/>
                    </div>
                    <p>
                      {{ republican.name }} (R)
                      <span class="text-slate-400">{{ republican.position }}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="flex flex-col py-[8px]">
                <span class="ht-14 mb-[16px] mr-[16px] flex items-center text-[#6C6C6C]">
                  Democrats
                  <button class="ml-[16px] border-0 p-0" @click="copyClipboard(item.details.members.democrats)">
                    <img src="/images/envelop.svg" alt="envelop" />
                  </button>
                </span>
                <div class="grid grid-cols-3 gap-3">
                  <div v-for="democrat, i in item.details.members.democrats" :key="i" class="flex items-center gap-2">
                    <div class="h-[40px] w-[40px] rounded-full">
                      <img v-if="democrat.avatar" :src="democrat.avatar" alt="Avatar" class="h-full w-full object-cover object-top"/>
                    </div>
                    <p>
                      {{ democrat.name }} (D)
                      <span class="text-slate-400">{{ democrat.position }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dd>
    </transition>
  </div>
</template>

<script>
export default {
    name: "CalendarAccordionItem",
    props: {
        item: {
            type: Object
        },
        multiple: {
            type: Boolean,
            default: false
        },
        groupId: {
            type: Number,
            default: 0
        }
    },
    methods: {
        toggle(event) {
        if (this.multiple) {
            // eslint-disable-next-line vue/no-mutating-props
            this.item.active = !this.item.active;
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
        copyClipboard(memas, membs) {
            let txt = "";
                memas && Array.from(memas).forEach(item => {
                    if (item.email && Array.isArray(item.email)) {
                        txt += item.email[0] + ";";
                    }
            })

            membs && Array.from(membs).forEach(item => {
                if (item.email && Array.isArray(item.email)) {
                    txt += item.email[0] + ";";
                }
            })
            this.copyToClipboard(txt);
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
