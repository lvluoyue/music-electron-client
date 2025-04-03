<script setup lang="ts">
import { EplorRenderer, LyricLine, LyricLineMouseEvent } from '@applemusic-like-lyrics/core'
import { parseLrc } from '@applemusic-like-lyrics/lyric'
import { BackgroundRender, BackgroundRenderRef, LyricPlayer, LyricPlayerRef } from '@applemusic-like-lyrics/vue'
import { usePlayerStore } from '@renderer/store/modules/player'

const playerStore = usePlayerStore()
const currentInfo = playerStore.currentInfo

const state = reactive({
  audio: new Audio(),
  albumIsVideo: false,
  currentTime: 0,
  lyricLines: [] as LyricLine[]
})
state.audio.controls = true
state.audio.preload = 'auto'
state.audio.onplay = (): void => {
  const onFrame = (): void => {
    if (!state.audio.paused) {
      state.currentTime = (state.audio.currentTime * 1000) | 0
      requestAnimationFrame(onFrame)
    }
  }
  requestAnimationFrame(onFrame)
}

const playerRef = ref<LyricPlayerRef>()
const bgRef = ref<BackgroundRenderRef>()

onMounted(() => {
  console.log(playerRef.value)
  console.log(bgRef.value)
})

const onClickLineLyric = (e: LyricLineMouseEvent): void => {
  state.audio.currentTime = (e.line.getLine().startTime / 1000) | 0
  state.audio.play()
}

const onClickOpenAudio = (): void => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'audio/*'
  input.onchange = (): void => {
    const file = input.files?.[0]
    if (file) {
      if (state.audio.src.trim().length > 0) {
        URL.revokeObjectURL(state.audio.src)
      }
      state.audio.src = URL.createObjectURL(file)
    }
  }
  input.click()
}

const onClickOpenAlbumImage = (): void => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*,video/*'
  input.onchange = (): void => {
    const file = input.files?.[0]
    if (file) {
      if (currentInfo.albumImage.trim().length > 0) {
        URL.revokeObjectURL(currentInfo.albumImage)
      }
      currentInfo.albumImage = URL.createObjectURL(file)
      state.albumIsVideo = file.type.startsWith('video/')
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
      state.lyricLines = result
    }
  }
  input.click()
}

const play = (): void => {
  state.audio.play()
  playerStore.isPlaying = true
}

const pause = (): void => {
  state.audio.pause()
  playerStore.isPlaying = false
}
</script>

<template>
  <BackgroundRender
    ref="bgRef"
    :fps="60"
    :render-scale="0.5"
    :album="currentInfo.albumImage"
    :album-is-video="state.albumIsVideo"
    :flow-speed="50"
    :low-freq-volume="1"
    :has-lyric="true"
    :renderer="EplorRenderer"
    class="player-background"
  />
  <LyricPlayer
    ref="playerRef"
    :lyric-lines="state.lyricLines"
    :current-time="state.currentTime"
    :enable-spring="true"
    :enable-blur="true"
    :enable-scale="true"
    :hide-passed-lines="false"
    :playing="playerStore.isPlaying"
    :align-position="0.5"
    class="player-lyric"
    @line-click="onClickLineLyric"
  >
    <template #bottom-line><div>Test Bottom Line</div></template>
  </LyricPlayer>

  <div
    style="
      position: absolute;
      right: 0;
      bottom: 0;
      background-color: #0004;
      margin: 1rem;
      padding: 1rem;
      border-radius: 0.5rem;
      color: white;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    "
  >
    <button type="button" @click="onClickOpenAudio">加载音乐</button>
    <button type="button" @click="onClickOpenAlbumImage">加载专辑背景资源（图片/视频）</button>
    <button type="button" @click="onClickOpenTTMLLyric">加载歌词</button>
    <button type="button" @click="play">播放</button>
    <button type="button" @click="pause">暂停</button>
  </div>
</template>

<style lang="scss">
.player-background {
  @apply pos-fixed w-full h-full overflow-hidden z-0;
}

.player-lyric {
  position: relative;
  top: 0;
  width: 40%;
  height: 100vh;
  margin: 0 auto;
  mix-blend-mode: plus-lighter;
}

[class^='lyricMainLine-'] {
  padding: 0.75rem !important;
}

.lyricLine-0-1-2:has(> *):hover {
  box-shadow: 0 0 0 0.25rem var(--amll-lyric-view-hover-bg-color, #fff1) !important;
}
</style>
