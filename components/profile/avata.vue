<template>
    <div class="flex items-center rounded-[8px] border-[1px] border-solid px-[40px] py-[24px]
         shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)]">
        <img :src="info.avata" alt="avata" class="mr-[24px] h-[80px] w-[80px] rounded-full" />
        <div class="mr-auto flex flex-col">
            <span class="ht-20">Upload a New Photo</span>
            <span class="ht-14 italic ">Profile-pic.jpg</span>
        </div>
        <UButton variant="ghost" class="ml-1 rounded-lg border border-[#D9D9D9] px-4 py-2 text-black">
            Upload
        </UButton>
    </div>
</template>

<script>
export default {
    name: "ProfileAvata",
    props: {
        info: {
            type: Object,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: {}
        }
    }
}
</script>