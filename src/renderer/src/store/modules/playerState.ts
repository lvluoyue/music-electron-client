import { LyricLine } from '@applemusic-like-lyrics/core'
import defaultAlbum from '@renderer/assets/default-album.png'
import { usePlayerInfoStore } from '@renderer/store/modules/playerInfo'
import { Howl } from 'howler'

export const usePlayerStateStore = defineStore(
  'playerState',
  () => {
    const playerInfoStore = usePlayerInfoStore()

    const state = reactive({
      show: false,
      isPlaying: false,
      // 播放器唯一ID（howl）
      playerId: 0,
      // 音量
      volume: 100,
      // 静音
      mute: false,
      // 播放进度
      currentTime: 0,
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

    watchEffect(() => {
      state.mute = playerInfoStore.setting.mute
    })

    const createHowl = (audioFileUrl): Howl => {
      const howl = new Howl({
        src: [audioFileUrl],
        // html5: true,
        format: ['mp3', 'ogg', 'wav', 'm4a', 'flac', 'wma', 'aac', 'wavpack', 'dolby', 'mp4'],
        onplay: (id): void => {
          state.playerId = id
        },
        onpause: (): void => {
          console.log('onpause')
        },
        onend: (): void => {
          // playerStore.isPlaying = false
          // 淡出效果：从当前音量淡出到 0 在 1 秒内完成
          // howl?.fade(howl.volume(), 0, 1000)
          console.log('onend')
        },
        onvolume: (): void => {
          if (howl) {
            state.volume = howl.volume()
          }
          console.log('onvolume')
        },
        onload: (): void => {
          state.duration = howl.duration() * 1000
          state.currentTime = 0
          console.log('onload')
        },
        onfade: (): void => {
          console.log('onfade')
        }
      })
      howl.on('seek', () => {
        state.currentTime = howl.seek() * 1000
        console.log('seek')
      })
      howl.on('end', () => {
        state.currentTime = 0
        console.log('end')
      })
      howl.on('load', () => {
        state.currentTime = 0
      })
      howl.on('play', () => {
        // 淡入效果：从 0 淡入到 1 在 1 秒内完成
        const interval = setInterval(() => {
          if (state.isPlaying) {
            state.currentTime = howl.seek() * 1000
          } else {
            clearInterval(interval)
          }
        }, 100)
      })
      howl.on('pause', () => {
        // 淡出效果：从当前音量淡出到 0 在 1 秒内完成
      })
      return howl
    }

    const howl = computed(() => createHowl(state.playUrl))
    return {
      state,
      howl
    }
  },
  {
    persist: false
  }
)
