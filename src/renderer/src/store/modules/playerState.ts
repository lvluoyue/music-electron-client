import { LyricLine } from '@applemusic-like-lyrics/core'
import defaultAlbum from '@renderer/assets/default-album.png'
import { usePlayerInfoStore } from '@renderer/store/modules/playerInfo'
import { Howl, Howler } from 'howler'

export const usePlayerStateStore = defineStore(
  'playerState',
  () => {
    const playerInfoStore = usePlayerInfoStore()
    const state = reactive({
      show: false,
      isPlaying: false,
      // 播放进度
      currentTime: 0,
      volume: 1,
      // 播放速度
      bpm: 60,
      // 总时长
      duration: 0,
      // 专辑图片是否为视频
      albumIsVideo: false,
      // 专辑图片
      albumImage: playerInfoStore.setting.albumImage || defaultAlbum,
      lyricLines: [] as LyricLine[],
      playUrl: ''
    })

    const createHowl = (audioFileUrl): Howl => {
      const howl = new Howl({
        src: [audioFileUrl],
        html5: true,
        format: ['mp3', 'ogg', 'wav', 'm4a', 'flac', 'wma', 'aac', 'wavpack', 'dolby', 'mp4'],
        // 加载时无id
        onload: (): void => {
          state.duration = howl.duration() * 1000
          state.currentTime = 0
          state.isPlaying = false
        },
        onplay: (): void => {
          howl.fade(0, 1, 1000)
          // 淡入效果：从 0 淡入到 1 在 1 秒内完成
          const interval = setInterval(() => {
            if (howl.playing()) {
              state.currentTime = howl.seek() * 1000
            } else {
              clearInterval(interval)
            }
          }, 100)
        },
        onend: (): void => {
          state.currentTime = 0
        },
        onvolume: (): void => {
          state.volume = howl.volume() as number
        },
        onfade: (): void => {
          // 淡出效果完成后暂停
          if (!state.isPlaying && state.volume == 0) {
            howl.pause()
          }
        },
        onseek: (): void => {
          state.currentTime = howl.seek() * 1000
        }
      })
      return howl
    }

    const howl = computed(() => {
      console.log('howl重新加载了')
      Howler.unload()
      return createHowl(state.playUrl)
    })
    return {
      state,
      howl
    }
  },
  {
    persist: false
  }
)
