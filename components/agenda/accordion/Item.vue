<template>
  <div :id="groupId + '-' + item.id" class="accordion-item" :class="{'is-active': item.active}">
      <span class="ht-20 text-black">{{ item?.title?.date || "Today" }}</span>
      <dt class="accordion-item-title mt-6">
        <div class="accordion-item-info absolute left-0 top-4 flex flex-col">
          <span class="ht-16 text-black">{{ item?.title?.time }}</span>
          <span class="ht-14 mb-2 text-gray-600">{{ item?.title?.event }}</span>
          <span v-if="!item?.title?.status" class="ht-16 rounded-[16px] bg-[#E3E3E3] px-[8px] py-[2px] text-gray-600">Cancelled</span>
        </div>
        <button class="accordion-item-trigger flex items-center justify-between" @click="toggle">
          <h4 class="ht-16 accordion-item-title-text max-w-[calc(100%-160px)] text-black">{{ item.title.content }}</h4>
          <div class="control-btn-wrapper flex items-center">
            <a :href="item.title.url" class="p-[8px]">
              <img src="/images/video.svg" alt="video-icon" class="h-[20px] w-[20px]"/>
            </a>
            <a :href="item.title.data" class="p-[8px]">
              <img src="/images/clipboard.svg" alt="video-icon" class="h-[20px] w-[20px]"/>
            </a>
            <div class="mx-[8px] h-[20px] w-[1px] bg-gray-300"></div>
            <a :href="item.title.data2" class="p-[8px]">
              <img src="/images/calendar.svg" alt="video-icon" class="h-[20px] w-[20px]"/>
            </a>
            <span class="accordion-item-trigger-icon p-[8px]">
              <img src="/images/arrow.svg" alt="video-icon" class="h-[20px] w-[20px]"/>
            </span>
          </div>
        </button>
      </dt>
      <transition
        name="accordion-item"
        @enter="startTransition"
        @after-enter="endTransition"
        @before-leave="startTransition"
        @after-leave="endTransition">
        <dd v-if="item.active" class="accordion-item-details">
          <div class="accordion-item-details-inner flex w-full flex-col">
            <div class="mb-[16px] rounded-[8px] border-[1px] border-[#D0D5DD]">
              <div class="rounded-t-[8px] bg-gray-200 px-[24px] py-[8px] text-[#6C6C6C]">
                Agenda
              </div>
              <div class="flex flex-col px-[24px] py-[16px] text-black">
                <div v-for="(agenda, index) in item.details.agenda" :key="index" class="flex py-[8px]">
                  <span class="ht-14 mr-[14px] min-w-[80px]">{{ agenda.id }}</span>
                  <span class="ht-14">{{ agenda.desc }}<br>
                    <span v-if="agenda.event" class="flex items-center pt-[8px]">
                      <span class="mr-[12px] flex rounded-[16px] bg-gray-200 px-[12px] py-[4px]"><img src="/images/alert.svg" alt="error icon" class="mr-[4px]"/> Strike Everything</span>
                      {{ agenda.event }}
                    </span>
                  </span>
                  <span v-if="agenda.listCnt > 0" class="ht-12 ml-auto">{{ agenda.listCnt }} Lists</span>
                </div>
              </div>
            </div>
            <div class="rounded-[8px] border-[1px] border-[#D0D5DD]">
              <div class="rounded-t-[8px] bg-gray-200 px-[24px] py-[8px] text-[#6C6C6C]">
                Members: {{ item.details.members.text }}
              </div>
              <div class="flex flex-col px-[24px] py-[16px] text-black">
                <div class="flex flex-col py-[8px]">
                  <span class="ht-14 mb-[16px] mr-[16px] flex items-center text-[#6C6C6C]">Republicans<a href="" class="ml-[16px]"><img src="/images/envelop.svg" alt="envelop"/></a></span>
                  <div class="member-wrapper flex flex-wrap items-center border-b-[1px] border-gray-200 pb-[24px]">
                    <div v-for="member, index in item.details.members.republicans" :key="index" class="mr-[24px] flex items-center py-[12px]">
                      <img src="/images/9.jpg" alt="avata" class="mr-[8px] h-[40px] w-[40px] rounded-[50%]" />
                      <span class="flex flex-col">{{ member.name }}<span v-if="member.role" class="text-[#868686]">{{ member.role }}</span></span>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col py-[8px]">
                  <span class="ht-14 mb-[16px] mr-[16px] flex items-center text-[#6C6C6C]">Democrats<a href="" class="ml-[16px]"><img src="/images/envelop.svg" alt="envelop"/></a></span>
                  <div class="member-wrapper flex flex-wrap items-center pb-[24px]">
                    <div v-for="member, index in item.details.members.democrats" :key="index" class="mr-[24px] flex items-center py-[12px]">
                      <img src="/images/9.jpg" alt="avata" class="mr-[8px] h-[40px] w-[40px] rounded-[50%]" />
                      <span class="flex flex-col">{{ member.name }}<span v-if="member.role" class="text-[#868686]">{{ member.role }}</span></span>
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
  name: "AccordionItem",
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
    }
  }
}
</script>
