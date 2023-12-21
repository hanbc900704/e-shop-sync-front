<template>
    <UTable :columns="data.columns" :rows="data.info" class="mt-5">
        <template #congress_person-data="{ row }">
            <div class="flex items-center gap-4">
                <div class="block h-[40px] w-[40px]">
                    <img :src="row.person.avatar" alt="Avatar" class="h-full w-full rounded-full object-cover object-top"/>
                </div>
                <p class="font-medium text-black">{{ row.person.name }}</p>
            </div>
        </template>

    </UTable>
</template>

<script>
export default {
  name: "BillSponsors",
  props: {
    data: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {},
      require: true
    }
  }
}
</script>