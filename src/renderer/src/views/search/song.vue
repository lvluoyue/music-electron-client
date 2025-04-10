<script setup lang="ts">
import { type SearchSongData, song } from '@renderer/api/core/search'

const route = useRoute()

const data = ref<SearchSongData>({
  meta: {
    total: 0,
    nextPage: 0,
    perPage: 0
  },
  list: []
})

onMounted(async () => {
  data.value = await song({
    keyword: route.params.keyword as string
  })
  console.log(data.value)
})
</script>

<template>{{ data }}</template>

<style scoped lang="scss"></style>
