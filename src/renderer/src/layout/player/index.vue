<script setup lang="ts">
import { useAppStore } from '@renderer/store'
import { usePlayerStateStore } from '@renderer/store/modules/playerState'

const appStore = useAppStore()
const { state } = usePlayerStateStore()
</script>

<template>
  <transition name="slide-up">
    <div
      v-show="state.show"
      class="absolute top-0 left-0 wh-full rounded-lg bg-gradient-to-b from-[rgb(75,75,75)] to-[rgb(27,27,27)] z-10"
    >
      <transition name="icon-header">
        <div v-show="!appStore.isPageLeave" pos-fixed flex h-80px z20 bg-none items-center px-20px cursor-pointer>
          <i
            class="hover:color-green i-q-chevron-down-12 color-coolGray-3 text-2xl no-drag"
            @click="state.show = false"
          />
        </div>
      </transition>
      <player-main></player-main>
      <transition name="player-button">
        <div v-show="!appStore.isPageLeave" pos-fixed bottom-0 h-80px w-full z20>
          <page-footer h-full :is-player="true"></page-footer>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scoped lang="scss">
/* 定义上拉动画 */
.slide-up-enter-active,
.slide-up-leave-active {
  @apply transition-transform-300;
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

/* 播放器下拉动画 */
.player-button-enter-active,
.player-button-leave-active {
  @apply transition-transform-300;
}

.player-button-enter-from,
.player-button-leave-to {
  @apply translate-y-100% no-drag;
}

.player-button-enter-to,
.player-button-leave-from {
  @apply translate-y-0 drag;
}
</style>
