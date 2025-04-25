<script setup lang="ts">
import { EplorRenderer, LyricLineMouseEvent } from '@applemusic-like-lyrics/core'
import { parseLrc } from '@applemusic-like-lyrics/lyric'
import { BackgroundRender, BackgroundRenderRef, LyricPlayer, LyricPlayerRef } from '@applemusic-like-lyrics/vue'
import { usePlayerStateStore } from '@renderer/store/modules/playerState'
import defaultPlayer from '@renderer/assets/default-player.png'
//本组件仅与背景渲染，歌词播放，音频播放集成
//实时时间，音频时间，播放状态，音量，播放进度
const playerStateStore = usePlayerStateStore()
const playerRef = ref<LyricPlayerRef>()
const bgRef = ref<BackgroundRenderRef>()

onMounted(() => {
  console.log(playerRef.value)
  console.log(bgRef.value)
})

const onClickLineLyric = (e: LyricLineMouseEvent): void => {
  playerStateStore.howl.seek(e.line.getLine().startTime / 1000)
  playerStateStore.state.isPlaying = true
}

const onClickOpenAudio = (): void => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'audio/*'
  input.onchange = (): void => {
    const file = input.files?.[0]
    if (file) {
      playerStateStore.state.playUrl = URL.createObjectURL(file)
      playerStateStore.howl.load()
    }
  }
  input.click()
}

const onClickOpenTTMLLyric = (): void => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.lrc,.ttml,text/*'
  input.onchange = async (): Promise<void> => {
    const file = input.files?.[0]
    if (file) {
      const text = await file.text()
      const result = parseLrc(text)
      console.log('parseTTML', result)
      playerStateStore.state.lyricLines = result
    }
  }
  input.click()
}

// 播放状态监听
watch(
  () => playerStateStore.state.isPlaying,
  (val) => {
    if (val) {
      if (!playerStateStore.howl.playing()) {
        playerStateStore.howl.play()
      } else {
        playerStateStore.howl.fade(0, 1, 1000)
      }
    } else {
      //添加淡出效果
      playerStateStore.howl.fade(1, 0, 1000)
    }
  }
)
</script>

<template>
  <BackgroundRender
    ref="bgRef"
    :fps="60"
    :render-scale="0.5"
    :album="playerStateStore.state.songInfo.cover || defaultPlayer"
    :album-is-video="playerStateStore.state.albumIsVideo"
    :flow-speed="playerStateStore.state.songInfo.bpm / 2"
    :low-freq-volume="playerStateStore.state.lowFreqVolume"
    :has-lyric="true"
    :renderer="EplorRenderer"
    class="player-background"
  />
  <div pos-relative flex h-full w70vw ma z10 items-center justify-center gap-30>
    <div class="w-50vh" flex flex-wrap items-center flex-col text-align-center color-white>
      <el-image
        class="w-80% h-80% rounded-2xl no-drag"
        fit="cover"
        :src="playerStateStore.state.songInfo.cover || defaultPlayer"
      ></el-image>
      <div v-if="playerStateStore.state.songInfo.songID !== 0">
        <span>{{ playerStateStore.state.songInfo.title }} - {{ playerStateStore.state.songInfo.album }}</span>
      </div>
    </div>
    <LyricPlayer
      ref="playerRef"
      :lyric-lines="playerStateStore.state.lyricLines"
      :current-time="playerStateStore.state.currentTime"
      :enable-spring="true"
      :enable-blur="true"
      :enable-scale="true"
      :hide-passed-lines="false"
      :playing="playerStateStore.state.isPlaying"
      :disabled="!playerStateStore.state.show"
      :align-position="0.2"
      plus-lighter
      class="h-40% w-40%"
      @line-click="onClickLineLyric"
    >
      <template #bottom-line><div>Test Bottom Line</div></template>
    </LyricPlayer>
  </div>
  <div pos-absolute right-0 bottom-80px bg-black bg-op-40 m-xy p-xy rounded-lg color-white flex gap-2 flex-col z20>
    <button type="button" @click="onClickOpenAudio">加载音乐</button>
    <button type="button" @click="onClickOpenTTMLLyric">加载歌词</button>
  </div>
</template>

<style scoped lang="scss">
.player-background {
  @apply pos-fixed w-full h-full overflow-hidden rounded-lg z-5;
}

:deep([class^='lyricMainLine-']) {
  @apply p-xs!;
}

:deep(.lyricLine-0-1-2:has(> *)):hover {
  box-shadow: 0 0 0 0.25rem var(--amll-lyric-view-hover-bg-color, #fff1) !important;
}
</style>
