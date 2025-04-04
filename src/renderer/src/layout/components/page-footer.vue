<script setup lang="ts">
import { usePlayerStore } from '@renderer/store/modules/player'

const playerStore = usePlayerStore()
const playerInfo = playerStore.playerInfo

var temp = 0

const input = (value): void => {
  temp = value
}

const change = (): void => {
  playerStore.audio.currentTime = (temp / 1000) | 0
  playerStore.isPlaying = true
}

const visible = ref(false)
</script>

<template>
  <el-card shadow="never" h-full>
    <div w-40>
      <album-image :image="playerInfo.albumImage" :hover="true"></album-image>
    </div>
    <div flex-1>
      <div flex justify-center gap-5 h-10 items-center>
        <el-popover :width="200" trigger="click" content="this is content, this is content, this is content">
          <template #reference>
            <i i-q-speaker-1-16 text-xl mx-5 class="hover:color-green"></i>
          </template>
        </el-popover>
        <i i-q-skip-backward-16 text-xl cursor-pointer class="hover:color-green"></i>
        <div
          class="w-10 h-7 flex justify-center items-center rounded-3xl cursor-pointer"
          style="background-color: #02eb82ff"
          @click="playerStore.isPlaying = !playerStore.isPlaying"
        >
          <i i-q-play-small-16 text-xl></i>
        </div>

        <i i-q-skip-forward-16 text-xl cursor-pointer class="hover:color-green"></i>
        <el-popover width="80px" trigger="click" placement="top" popper-class="speaker-popper">
          <template #reference>
            <i i-q-speaker-1-16 text-xl mx-5 class="hover:color-green"></i>
          </template>
          <el-slider v-model="value" vertical height="150px" />
          <span mt select-none>100%</span>
          <el-divider></el-divider>
          <i i-q-speaker-1-16 text-xl mx-5 class="hover:color-green"></i>
        </el-popover>
      </div>
      <div>
        <el-slider
          v-model="playerInfo.currentTime"
          :min="0"
          :max="playerInfo.maxTime"
          :show-tooltip="false"
          style="height: 20px"
          @change="change"
          @input="input"
        />
      </div>
    </div>
    <div w-40 flex justify-end>
      <i i-q-justify-right-16 text-xl @click="visible = !visible"></i>
    </div>
  </el-card>
  <el-drawer v-model="visible" :show-close="false" append-to="main-container">
    <template #header="{ close, titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">This is a custom header!</h4>
      <el-button type="danger" @click="close"> 1111 Close </el-button>
    </template>
    This is drawer content.
  </el-drawer>
</template>

<style scoped lang="scss">
:deep(.el-card__body) {
  --el-card-padding: 0;
  @apply flex items-center justify-between gap-32 h-full mx-5vw;
}
:deep(.el-slider__runway) {
  --el-slider-height: 3px;
  --el-slider-border-radius: 5px;
}
:deep(.el-slider__button-wrapper) {
  --el-slider-button-wrapper-size: 10px;
  --el-slider-button-wrapper-offset: -8px;
  z-index: 0;
  @apply hover:cursor-pointer;
}
:deep(.el-slider__button) {
  --el-slider-button-size: 10px;
  &:hover,
  &.hover {
    @apply cursor-pointer;
  }
}

:deep(.speaker-popper) {
  min-width: 1px !important;
}
.el-divider {
  margin: 12px 0;
}
</style>
<style>
.speaker-popper {
  min-width: 50px !important;
  @apply flex flex-col items-center;
}
</style>
