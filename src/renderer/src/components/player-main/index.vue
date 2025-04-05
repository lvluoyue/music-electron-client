<script setup lang="ts">
import { EplorRenderer, LyricLineMouseEvent } from '@applemusic-like-lyrics/core'
import { parseLrc } from '@applemusic-like-lyrics/lyric'
import { BackgroundRender, BackgroundRenderRef, LyricPlayer, LyricPlayerRef } from '@applemusic-like-lyrics/vue'
import { usePlayerStateStore } from '@renderer/store/modules/playerState'
import { usePlayerInfoStore } from '@renderer/store/modules/playerInfo'
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
      playerStateStore.howl?.pause()?.unload()
      playerStateStore.state.playUrl = URL.createObjectURL(file)
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
      if (playerStateStore.state.albumImage.trim().length > 0) {
        URL.revokeObjectURL(playerStateStore.state.albumImage)
      }
      playerStateStore.state.albumImage = URL.createObjectURL(file)
      playerStateStore.state.albumIsVideo = file.type.startsWith('video/')
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

const { setting } = usePlayerInfoStore()

watch(
  () => playerStateStore.state.isPlaying,
  (val) => {
    if (val) {
      playerStateStore.howl.fade(0, setting.volume, 1500, playerStateStore.howl.play())
    } else {
      playerStateStore.howl.fade(setting.volume, 0, 1500, playerStateStore.state.playerId)
      setTimeout(() => playerStateStore.howl.pause(), 1500)
    }
  }
)

watch(
  () => playerStateStore.state.volume,
  (val) => {
    playerStateStore.howl.volume(val)
  }
)

watch(
  () => playerStateStore.state.mute,
  () => {
    console.log('mute')
    playerStateStore.howl.mute(playerStateStore.state.mute)
  }
)
</script>

<template>
  <BackgroundRender
    ref="bgRef"
    :fps="60"
    :render-scale="0.5"
    :album="playerStateStore.state.albumImage"
    :album-is-video="playerStateStore.state.albumIsVideo"
    :flow-speed="playerStateStore.state.bpm / 2"
    :low-freq-volume="1"
    :has-lyric="true"
    :renderer="EplorRenderer"
    class="player-background"
  />
  <LyricPlayer
    ref="playerRef"
    z10
    :lyric-lines="playerStateStore.state.lyricLines"
    :current-time="playerStateStore.state.currentTime"
    :enable-spring="true"
    :enable-blur="true"
    :enable-scale="true"
    :hide-passed-lines="false"
    :playing="playerStateStore.state.isPlaying"
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
    <button type="button" @click="playerStateStore.state.isPlaying = !playerStateStore.state.isPlaying">
      播放/暂停
    </button>
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
