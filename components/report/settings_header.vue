<template>
    <div class="flex flex-wrap items-center justify-between px-[40px] py-[16px]">
        <span class="ht-20">{{ title }}</span>
        <div class="flex items-center">
            <slot name="button">
                <UButton color="transparent" variant="solid"
                class="mb-[18px] ml-auto mr-[52px] w-fit rounded-[8px] border border-[#98A2B3] px-[14px] py-[8px] text-[#344054] shadow-md ring-0">
                    Action Button
                </UButton>
            </slot>
        </div>
    </div>
</template>
  
  <script>
  export default {
      name: "ReportSettingsHeader",
      props: {
          title: {
              type: String,
              default: ""
          }
      }
  }
  </script>