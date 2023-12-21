<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, watch } from "vue";

import Overlay from "./Overlay.vue";
import Sidebar from "./sidebar/Sidebar.vue";
import { closeSidebar, sidebarOpen } from "./store";

const route = useRoute();

onMounted(() => {
  // set the html tag attribute overflow to hidden when component is mounted
  document.documentElement.style.overflow = "hidden";
});

watch(route, () => {
  // close sidebar on route changes when viewport is less than 1024px
  if (sidebarOpen && window.innerWidth < 1024) {
    closeSidebar();
  }
});
</script>

<!-- lg:w-[calc(100%-16rem)] class get the remained width of the main tag from lg:viewport by subtracting
(the total width by the width of the sidebar component which is w-64 = 16rem)-->
<template>
  <div class="layout-container relative h-screen overflow-hidden">
    <div class="flex items-start">
      <Overlay />
      <Sidebar mobile-orientation="end" />
      <div
        class="flex h-screen w-[calc(100%-68px)] flex-col pl-0 lg:w-[calc(100%-16rem)] lg:space-y-4"
      >
        <!-- <TopBar /> -->
        <main class="main-content h-screen overflow-auto lg:rounded-tl-3xl">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<style>
@media print {
  .main-content {
    overflow: visible !important;
  }

  .layout-container {
    overflow: visible !important;
  }
}
</style>
