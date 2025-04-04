<script setup lang="ts">
import { usePlayerStore } from '@renderer/store/modules/player'
import defaultAlbum from '@renderer/assets/default-album.png'

const playerStore = usePlayerStore()

const props = defineProps({
  image: {
    type: String,
    default: ''
  },
  hover: {
    type: Boolean,
    default: false
  }
})

const imageClass = computed(() => {
  return { 'album-image': true, 'album-image--hover': props.hover }
})

const imageClick = (): boolean => (playerStore.show = !playerStore.show)
</script>

<template>
  <el-image :src="props.image || defaultAlbum" :class="imageClass" @click="imageClick"> </el-image>
</template>

<style scoped lang="scss">
.album-image {
  @apply w-60px h-60px rounded-md cursor-pointer;
  &::before {
    @apply content-empty  top-0 left-0 w-full h-full pos-absolute bg-black bg-opacity-50 opacity-0  transition-opacity-300;
  }
  &::after {
    @apply content-empty i-q-chevron-up-12 text-white text-xl pos-absolute top-1/2 left-1/2 opacity-0 translate--1/2;
  }
  &:not(&--hover):after {
    @apply i-q-fullscreen-exit-16  text-white text-3xl pos-absolute top-1/2 left-1/2 opacity-100 translate--1/2;
  }
  &--hover:hover {
    @apply filter-drop-shadow filter-drop-shadow-color-truegray-4 before:opacity-100 after:opacity-100;
  }
}
</style>
