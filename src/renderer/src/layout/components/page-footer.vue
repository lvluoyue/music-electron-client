<script setup lang="ts">
import { usePlayerInfoStore } from '@renderer/store/modules/playerInfo'
import { usePlayerStateStore } from '@renderer/store/modules/playerState'
import emptyAlbum from '@renderer/assets/empty-album.svg'
import { formatDuring } from '@renderer/utils'

const router = useRouter()

const playerInfoStore = usePlayerInfoStore()
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

const props = withDefaults(defineProps<{ isPlayer?: boolean }>(), {
  isPlayer: false
})
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
    <div flex gap-1 lg="gap-3" items-center :style="{ color }">
      <album-image
        :image="props.isPlayer ? emptyAlbum : playerStateStore.state.songInfo.cover"
        :hover="!props.isPlayer"
        :after-icon-class="!props.isPlayer ? 'after:i-q-chevron-up-12' : 'after:i-q-fullscreen-exit-16'"
        class="w-60px h-60px"
        @click="playerStateStore.state.show = !playerStateStore.state.show"
      ></album-image>
      <div v-if="playerStateStore.state.songInfo.songID !== 0" w40 overflow-hidden hidden class="sm:block">
        <div w-auto inline-block whitespace-nowrap style="animation: move 1.5s infinite alternate linear">
          {{ playerStateStore.state.songInfo.title }} - {{ playerStateStore.state.songInfo.album }}
        </div>
      </div>
      <div v-else hidden sm="flex">
        <div>xx音乐</div>
      </div>
    </div>
    <div flex-1 :style="{ color }">
      <div flex justify-center gap-2 lg="gap-5" h-10 items-center>
        <el-popover :width="200" trigger="click" content="this is content, this is content, this is content">
          <template #reference>
            <i i-q-speaker-1-16 text-xl lg="mx-5" class="hover:color-green"></i>
          </template>
        </el-popover>
        <router-link to="/sound3d">
          <i i-q-sound-16 text-xl cursor-pointer class="hover:color-green" :style="{ color }" title="3D音效设置"></i>
        </router-link>
        <i i-q-skip-backward-16 text-xl cursor-pointer class="hover:color-green"></i>
        <div
          class="w-10 h-7 flex justify-center items-center rounded-3xl cursor-pointer bg-[#02eb82ff]"
          @click="playChange"
        >
          <i :class="playerStateStore.state.isPlaying ? 'i-q-pause-16' : 'i-q-play-small-16'" text-xl></i>
        </div>

        <i i-q-skip-forward-16 text-xl cursor-pointer class="hover:color-green"></i>
        <el-popover width="80px" trigger="click" placement="top" popper-class="speaker-popper">
          <template #reference>
            <i
              class="text-xl hover:color-green lg:mx-5"
              :class="
                playerInfoStore.setting.mute || playerInfoStore.setting.volume === 0
                  ? 'i-q-speaker-mute-16'
                  : 'i-q-speaker-1-16'
              "
            ></i>
          </template>
          <el-slider
            v-model="playerInfoStore.setting.volume"
            :min="0"
            :max="100"
            vertical
            height="150px"
            @input="changeVolume"
          />
          <span mt select-none>{{ playerInfoStore.setting.volume }}%</span>
          <el-divider></el-divider>
          <i
            class="mx-5 text-xl hover:color-green"
            :class="
              playerInfoStore.setting.mute || playerInfoStore.setting.volume === 0
                ? 'i-q-speaker-mute-16'
                : 'i-q-speaker-1-16'
            "
            @click="playerInfoStore.setting.mute = !playerInfoStore.setting.mute"
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
    <div w10vw>
      <div flex justify-end gap-3 :style="{ color }">
        <i i-q-aiff-16 text-xl class="hover:color-green" title="3D音效设置" @click="router.push('/sound3d')"></i>
        <el-popover title="播放队列" width="500" :offset="30" :hide-after="0" placement="top">
          <template #reference>
            <i class="text-xl i-q-justify-right-16 hover:color-green"></i>
          </template>
          <el-scrollbar class="h-70vh!">
            <song-list :data="playerInfoStore.playList"></song-list>
          </el-scrollbar>
        </el-popover>
      </div>
    </div>
  </el-card>
</template>

<style scoped lang="scss">
:deep(.el-card__body) {
  --el-card-padding: 0;
  @apply flex items-center justify-between gap-1 sm:gap-20 lg:gap-32 h-full mx-5vw;
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
:deep(.el-slider__button) {
  --el-slider-button-size: 10px;
  &:hover,
  &.hover {
    @apply cursor-pointer;
  }
}

:deep(.speaker-popper) {
  @apply min-w-xs!;
}

.el-divider {
  @apply my-12px;
}
</style>
<style lang="scss">
.speaker-popper {
  @apply flex flex-col items-center min-w-50px!;
}
@keyframes move {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-100% + 10rem));
  }
}
</style>
