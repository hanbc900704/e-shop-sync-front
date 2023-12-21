<script setup lang="ts">
import { sidebarOpen } from "../store";
import SidebarItems from "./SidebarItems.vue";
import SidebarHeader from "./SidebarHeader.vue";
import SidebarBottom from "./SidebarBottom.vue";
</script>

<script lang="ts">
export default {
  props: {
    mobileOrientation: {
      type: String,
      default: "end",
    },
  },
  computed: {
    style() {
      const _style = {
        mobileOrientation: {
          start: "left-0",
          end: "right-0",
        },
      };
      return _style;
    }
  }
}
</script>

<template>
  <aside
    class="sidebar scrollbar top-0 h-screen overflow-y-auto lg:relative"
    :class="[
      style.mobileOrientation[mobileOrientation],
      sidebarOpen
        ? 'absolute z-40 w-8/12 sm:w-5/12 lg:hidden'
        : 'z-auto flex w-[68px] flex-col justify-between lg:w-64',
    ]"
  >
    <div class="pb-32 lg:pb-2">
      <SidebarHeader />
      <SidebarItems />
    </div>

    <div class="px-2 lg:px-4">
      <SidebarBottom />
    </div>
  </aside>
</template>

<style scoped>
.scrollbar::-webkit-scrollbar {
  width: 0;
  background: transparent; /* hide sidebar scrollbar on Chrome, Opera and other webkit Browsers*/
}
.scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none; /* hide sidebar scrollbar on Firefox, IE and Edge*/
}
</style>
