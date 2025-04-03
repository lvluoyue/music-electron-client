<script setup lang="ts">
import { usePlayerStore } from '@renderer/store/modules/player'

const playerStore = usePlayerStore()
</script>

<template>
  <transition name="slide-up">
    <div v-show="playerStore.show" absolute top-0 left-0 w-full h-full>
      <div pos-fixed flex w-full h-80px z-1 drag bg-none items-center p-x-20px>
        <i i-q-chevron-down-12 color-coolGray-3 text-2xl no-drag @click="playerStore.show = false" />
      </div>
      <player-main></player-main>
    </div>
  </transition>
</template>

<style scoped lang="scss">
/* 定义上拉动画 */
.slide-up-enter-active,
.slide-up-leave-active {
  @apply transition-all-300;
}

.slide-up-enter-from,
.slide-up-leave-to {
  @apply translate-y-100%; //上拉
  //@apply opacity-0; // 渐变
}

.slide-up-enter-to,
.slide-up-leave-from {
  @apply translate-y-0; //下拉
  //@apply opacity-100; // 渐变
}
</style>
