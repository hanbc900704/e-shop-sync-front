<script lang="ts">
import { useRoute } from "vue-router";

export default {
    name: "SidebarItem",
    props: {
        to: {
        type: String,
        default: "",
        },
        title: {
        type: String,
        default: "",
        },
    },
    data() {
        return {

        }
    },
    computed: {
        route() {
        return useRoute();
        }
    },
    methods: {
        isProperRoute() {
        const _route = useRoute().path + "";
        // console.log('route', _route, this.to, _route.includes(this.to))
        return _route.includes(this.to);
        }
    }
}
</script>

<template>
    <RouterLink :to="to" :class="[isProperRoute() ? 'active' : '']">
        <span
        class="navbar-item flex max-w-[auto] items-center justify-start rounded-[8px] p-[12px] font-thin lg:w-full lg:max-w-[12rem]"
        :class="[isProperRoute() ? 'font-medium text-white' : 'text-[#98A2B3]']"
        >
            <UTooltip :text="title" :popper="{ arrow: true, placement: 'right', offsetDistance: 12 }" 
                :ui="{base: 'lg:hidden', background: 'bg-[#101828]', color: 'text-white', ring: 'ring-[#101828]', arrow: {base: 'lg:hidden before:lg:hidden', background: 'before:bg-[#101828]', ring: 'before:ring-[#101828]'}}">
                <span>
                    <slot />
                </span>
                <span class="ml-2 mr-4 hidden text-sm font-bold lg:block">
                    {{ title }}
                </span>
            </UTooltip>
        </span>
    </RouterLink>
</template>
