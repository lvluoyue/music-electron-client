<script setup lang="ts">
import { usePlayerInfoStore } from '@renderer/store/modules/playerInfo'
import { usePlayerStateStore } from '@renderer/store/modules/playerState'
import { formatDuring } from '../../utils'
import emptyAlbum from '@renderer/assets/empty-album.svg'

const { setting } = usePlayerInfoStore()
const playerStateStore = usePlayerStateStore()

const changeVolume = (value): void => {
  playerStateStore.state.volume = value / 100
}

let temp = 0

const input = (value): void => {
  temp = value
}

const playChange = (): void => {
  playerStateStore.state.isPlaying = !playerStateStore.state.isPlaying
}

const change = (): void => {
  playerStateStore.howl.seek(temp / 1000)
  playerStateStore.state.isPlaying = true
}

const props = defineProps({
  playListShow: {
    type: Boolean
  },
  isPlayer: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits<{
  (e: 'update:playListShow', value: boolean): void
}>()

const image = computed(() => (props.isPlayer ? emptyAlbum : playerStateStore.state.albumImage))
const cardStyle = props.isPlayer
  ? ['--el-card-bg-color: transparent', '--el-card-border-color: rgba(255,255,255,.1)']
  : []
const sliderStyle = props.isPlayer
  ? ['--el-slider-runway-bg-color: transparent', '--el-slider-runway-bg-color: rgba(255,255,255,.1)']
  : []
const color = props.isPlayer ? '#fff' : '#000'
</script>

<template>
  <el-card shadow="never" :style="cardStyle">
    <div w-40 flex gap-3 items-center :style="{ color }">
      <album-image :image="image" :hover="!props.isPlayer"></album-image>
      <div v-if="playerStateStore.state.id !== 0">
        <div>{{ playerStateStore.state.title }} - {{ playerStateStore.state.album }}</div>
        <div>{{ playerStateStore.state.subtitle }}</div>
      </div>
      <div v-else>
        <div>xx音乐</div>
      </div>
    </div>
    <div flex-1 :style="{ color }">
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
          @click="playChange"
        >
          <i :class="playerStateStore.state.isPlaying ? 'i-q-pause-16' : 'i-q-play-small-16'" text-xl></i>
        </div>

        <i i-q-skip-forward-16 text-xl cursor-pointer class="hover:color-green"></i>
        <el-popover width="80px" trigger="click" placement="top" popper-class="speaker-popper">
          <template #reference>
            <i
              text-xl
              mx-5
              class="hover:color-green"
              :class="setting.mute || setting.volume === 0 ? 'i-q-speaker-mute-16' : 'i-q-speaker-1-16'"
            ></i>
          </template>
          <el-slider v-model="setting.volume" :min="0" :max="100" vertical height="150px" @input="changeVolume" />
          <span mt select-none>{{ setting.volume }}%</span>
          <el-divider></el-divider>
          <i
            text-xl
            mx-5
            class="hover:color-green"
            :class="setting.mute || setting.volume === 0 ? 'i-q-speaker-mute-16' : 'i-q-speaker-1-16'"
            @click="setting.mute = !setting.mute"
          ></i>
        </el-popover>
      </div>
      <div flex items-center text-xs font-1 text-op-30 :class="props.isPlayer ? 'color-white' : ' color-black'">
        <span mx-xs>{{ formatDuring(playerStateStore.state.currentTime) }}</span>
        <el-slider
          v-model="playerStateStore.state.currentTime"
          :min="0"
          :max="playerStateStore.state.duration"
          :show-tooltip="false"
          style="height: 20px"
          :style="sliderStyle"
          class="time-slider"
          @change="change"
          @input="input"
        />
        <span mx-xs>{{ formatDuring(playerStateStore.state.duration) }}</span>
      </div>
    </div>
    <div w-40 flex justify-end :style="{ color }">
      <i
        i-q-justify-right-16
        text-xl
        class="hover:color-green"
        @click="emit('update:playListShow', !props.playListShow)"
      ></i>
    </div>
  </el-card>
</template>

<style scoped lang="scss">
:deep(.el-card__body) {
  --el-card-padding: 0;
  @apply flex items-center justify-between gap-32 h-full mx-5vw;
}
:deep(.el-slider) {
  --el-slider-main-bg-color: v-bind(color);
  .el-slider__runway {
    --el-slider-height: 3px;
    --el-slider-border-radius: 5px;
  }
}
:deep(.el-slider__button-wrapper) {
  --el-slider-button-wrapper-size: 10px;
  --el-slider-button-wrapper-offset: -6px;
  z-index: 0;
  @apply hover:cursor-pointer;
}
.time-slider {
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
