<script setup lang="ts">
import { EplorRenderer, LyricLine, LyricLineMouseEvent } from '@applemusic-like-lyrics/core'
import { parseLrc } from '@applemusic-like-lyrics/lyric'
import { BackgroundRender, BackgroundRenderRef, LyricPlayer, LyricPlayerRef } from '@applemusic-like-lyrics/vue'
import { usePlayerStore } from '@renderer/store/modules/player'
import defaultAlbum from '@renderer/assets/default-player.png'

const playerStore = usePlayerStore()
const playerInfo = playerStore.playerInfo

const state = reactive({
  albumIsVideo: false,
  lyricLines: [] as LyricLine[]
})

const playerRef = ref<LyricPlayerRef>()
const bgRef = ref<BackgroundRenderRef>()

onMounted(() => {
  console.log(playerRef.value)
  console.log(bgRef.value)
})

const onClickLineLyric = (e: LyricLineMouseEvent): void => {
  playerStore.audio.currentTime = (e.line.getLine().startTime / 1000) | 0
  playerStore.isPlaying = true
}

const onClickOpenAudio = (): void => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'audio/*'
  input.onchange = (): void => {
    const file = input.files?.[0]
    if (file) {
      if (playerStore.audio.src.trim().length > 0) {
        URL.revokeObjectURL(playerStore.audio.src)
      }
      playerStore.audio.src = URL.createObjectURL(file)
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
      if (playerInfo.albumImage.trim().length > 0) {
        URL.revokeObjectURL(playerInfo.albumImage)
      }
      playerInfo.albumImage = URL.createObjectURL(file)
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

watch(
  () => playerStore.isPlaying,
  (val) => {
    if (val) {
      playerStore.audio.play()
    } else {
      playerStore.audio.pause()
    }
  }
)
</script>

<template>
  <BackgroundRender
    ref="bgRef"
    :fps="60"
    :render-scale="0.5"
    :album="playerInfo.albumImage || defaultAlbum"
    :album-is-video="state.albumIsVideo"
    :flow-speed="playerInfo.bpm / 2"
    :low-freq-volume="1"
    :has-lyric="true"
    :renderer="EplorRenderer"
    class="player-background"
  />
  <LyricPlayer
    ref="playerRef"
    z10
    :lyric-lines="state.lyricLines"
    :current-time="playerInfo.currentTime"
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

  <div pos-absolute right-0 bottom-80px bg-gray-6 m-xy p-xy rounded-lg color-white flex gap-2 flex-col z20>
    <button type="button" @click="onClickOpenAudio">加载音乐</button>
    <button type="button" @click="onClickOpenAlbumImage">加载专辑背景资源（图片/视频）</button>
    <button type="button" @click="onClickOpenTTMLLyric">加载歌词</button>
    <button type="button" @click="playerStore.isPlaying = !playerStore.isPlaying">播放/暂停</button>
  </div>
</template>

<style lang="scss">
.player-background {
  @apply pos-fixed w-full h-full overflow-hidden rounded-xl z-5;
}

.player-lyric {
  position: relative;
  top: 0;
  width: 40%;
  height: 100%;
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
