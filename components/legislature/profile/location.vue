<template>
    <div class="flex flex-col rounded-[8px] border-[1px] border-solid border-[#D9D9D9] p-[32px]">
        <span class="ht-20 mb-[20px]">District Map</span>
        <img src="/images/sw-mapfeature-comingsoon-transparent.png" alt="map" class="h-full w-full object-cover" >
    </div>
</template>

<script>
export default {
    name: "LegislatureProfileLocation",
    props: {
        location: {
            type: Object,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: {}
        }
    }
}
</script>