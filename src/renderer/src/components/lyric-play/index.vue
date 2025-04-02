<template>
  <BackgroundRender
    ref="bgRef"
    :fps="30"
    :render-scale="0.5"
    :album="state.albumUrl"
    :album-is-video="state.albumIsVideo"
    :has-lyric="true"
    :flow-speed="5"
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
    :playing="state.playing"
    align-anchor="top"
    class="player-lyric"
    @line-click="onClickLineLyric"
  >
    <template #bottom-line> Test Bottom Line </template>
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
    <div>AMLL Vue 绑定调试页面</div>
    <div>为了减少依赖，没有过多的调试设置。</div>
    <div>更加详尽的调试可以直接使用 Core 模块调试。</div>
    <button type="button" @click="onClickOpenAudio">加载音乐</button>
    <button type="button" @click="onClickOpenAlbumImage">加载专辑背景资源（图片/视频）</button>
    <button type="button" @click="onClickOpenTTMLLyric">加载歌词</button>
    <button type="button" @click="play">播放</button>
    <button type="button" @click="pause">暂停</button>
  </div>
</template>

<script setup lang="ts">
import { EplorRenderer, LyricLine, LyricLineMouseEvent } from '@applemusic-like-lyrics/core'
import { parseLrc } from '@applemusic-like-lyrics/lyric'
import {
  LyricPlayer,
  BackgroundRender,
  BackgroundRenderRef,
  LyricPlayerRef
} from '@applemusic-like-lyrics/vue'

const state = reactive({
  audio: new Audio(),
  albumUrl: '',
  albumIsVideo: false,
  currentTime: 0,
  lyricLines: [] as LyricLine[],
  playing: false
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
      if (state.albumUrl.trim().length > 0) {
        URL.revokeObjectURL(state.albumUrl)
      }
      state.albumUrl = URL.createObjectURL(file)
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
  state.playing = true
}

const pause = (): void => {
  state.audio.pause()
  state.playing = false
}
</script>

<style>
.player-background {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.player-lyric {
  position: relative;
  top: 0;
  width: 40%;
  height: 100vh;
  margin: 0 auto;
  mix-blend-mode: plus-lighter;
}
</style>
