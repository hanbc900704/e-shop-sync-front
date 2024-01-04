<script setup lang="ts">
    import SidebarItem from "./SidebarItem.vue";
    import LegislatureIcon from "./icons/LegislatureIcon.vue"
    import SearchIcon from "./icons/SearchIcon.vue"
    import CalendarIcon from "./icons/CalendarIcon.vue"
    import BillIcon from "./icons/BillIcon.vue"
    import TrackingIcon from "./icons/TrackingIcon.vue"
    import ReportsIcon from "./icons/ReportsIcon.vue"
    import SettingsIcon from "./icons/SettingsIcon.vue"
</script>

<script lang="ts">
export default {
    name: "SideBarItems"
}
</script>

<template>
    <div class="px-[12px]">
        <div class="border-b border-[#101828] py-2">
            <SidebarItem title="Search" to="/search">
                <SearchIcon />
            </SidebarItem>
        </div>

        <div class="border-b border-[#101828] py-2">
            <SidebarItem title="Products" to="/category">
                <SettingsIcon />
            </SidebarItem>

            <SidebarItem title="Database SYNC" to="/dbsync">
                <ReportsIcon />
            </SidebarItem>

            <SidebarItem title="Resource SYNC" to="/resources">
                <TrackingIcon />
            </SidebarItem>
        </div>
    </div>
</template>
