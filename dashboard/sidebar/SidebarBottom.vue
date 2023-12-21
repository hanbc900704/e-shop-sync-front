<script setup lang="ts">
import SidebarUser from "./SidebarUser.vue";
import SidebarInfo from "./SidebarInfo.vue";
</script>

<script lang="ts">
export default {
  
}
</script>

<template>
  <div>
    <div class="hidden rounded-[8px] border border-[#101828] lg:block">
      <div class="ht-14 rounded-t-[8px] bg-[#101828] p-2 text-[#98A2B3]">Current Session</div>
      <SidebarInfo />
    </div>

    <div class="py-2">
      <SidebarUser />
    </div>
  </div>
</template>
