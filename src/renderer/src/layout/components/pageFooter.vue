<script setup lang="ts">
import { usePlayerStore } from '@renderer/store/modules/player'

const playerStore = usePlayerStore()
const currentInfo = playerStore.currentInfo
</script>

<template>
  <el-card shadow="never" h-full z-10>
    <div>
      <el-image
        :src="currentInfo.albumImage"
        class="album-image"
        @click="playerStore.show = !playerStore.show"
      ></el-image>
    </div>
    <div flex-1>2</div>
    <div>3</div>
  </el-card>
</template>

<style scoped lang="scss">
:deep(.el-card__body) {
  --el-card-padding: 0;
  @apply flex items-center justify-between gap-32 h-full mx-5%;
}
.album-image {
  @apply w-60px h-60px rounded-md cursor-pointer;
  &::before {
    content: '';
    @apply top-0 left-0 w-full h-full pos-absolute bg-black bg-opacity-50 opacity-0  transition-opacity-300;
  }
  &::after {
    content: '';
    @apply i-q-chevron-up-12 text-white text-xl pos-absolute top-1/2 left-1/2 opacity-0 translate--1/2;
  }
  &:hover {
    @apply filter-drop-shadow filter-drop-shadow-color-truegray-4 before:opacity-100 after:opacity-100;
  }
}
</style>
