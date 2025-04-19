<script setup lang="ts">
import defaultAlbum from '@renderer/assets/default-album.png'

const props = withDefaults(defineProps<{ image: string; hover?: boolean; afterIconClass?: string }>(), {
  hover: () => false,
  afterIconClass: () => ''
})
const imageClass = computed(() => {
  return [
    'rounded-md cursor-pointer shrink-0',
    'before:(content-empty top-0 left-0 w-full h-full pos-absolute bg-black bg-opacity-50 opacity-0  transition-opacity-300)',
    `after:(content-empty text-white text-xl pos-absolute top-1/2 left-1/2 opacity-0 translate--1/2)`,
    props.hover
      ? 'hover:(filter-drop-shadow filter-drop-shadow-color-truegray-4 before:opacity-100 after:opacity-100)'
      : 'after:(w-60% h-60% opacity-100)',
    props.afterIconClass
  ]
})
</script>

<template>
  <el-image fit="cover" :src="props.image || defaultAlbum" :class="imageClass" />
</template>

<style scoped lang="scss"></style>
