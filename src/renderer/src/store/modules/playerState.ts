import { LyricLine } from '@applemusic-like-lyrics/core'
import { usePlayerInfoStore } from '@renderer/store/modules/playerInfo'
import { Howl, Howler } from 'howler'

export const usePlayerStateStore = defineStore(
  'playerState',
  () => {
    const playerInfoStore = usePlayerInfoStore()
    const state = ref<playerState>({
      songInfo: playerInfoStore.setting.songInfo,
      show: false,
      isPlaying: false,
      currentTime: 0,
      volume: 1,
      lowFreqVolume: 1,
      duration: 0,
      albumIsVideo: false,
      lyricLines: [] as LyricLine[],
      playUrl: ''
    })

    setInterval(() => {
      state.value.lowFreqVolume = state.value.lowFreqVolume == 0.1 ? 0.9 : 0.1
      console.log('lowFreqBolume', state.value.lowFreqVolume)
    }, 1000)

    watch(
      () => playerInfoStore.setting.songInfo,
      (data) => (state.value.songInfo = data)
    )

    const createHowl = (audioFileUrl): Howl => {
      const howl = new Howl({
        src: [audioFileUrl],
        // html5: true,
        format: ['mp3', 'ogg', 'wav', 'm4a', 'flac', 'wma', 'aac', 'wavpack', 'dolby', 'mp4'],
        // 加载时无id
        onload: (): void => {
          state.value.duration = howl.duration() * 1000
          state.value.currentTime = 0
          state.value.isPlaying = false
        },
        onplay: (id): void => {
          howl.fade(0, 1, 1000)
          // 淡入效果：从 0 淡入到 1 在 1 秒内完成
          const interval = setInterval(() => {
            if (howl.playing(id)) {
              state.value.currentTime = howl.seek() * 1000
            } else {
              clearInterval(interval)
            }
          }, 100)
        },
        onend: (): void => {
          state.value.currentTime = 0
          state.value.isPlaying = false
        },
        onvolume: (): void => {
          state.value.volume = howl.volume() as number
        },
        onfade: (): void => {
          // 淡出效果完成后暂停
          if (!state.value.isPlaying && state.value.volume == 0) {
            howl.pause()
          }
        },
        onseek: (): void => {
          state.value.currentTime = howl.seek() * 1000
        }
      })
      // howl.pannerAttr({
      //   coneInnerAngle: 360,
      //   // coneOuterAngle?: number | undefined;
      //   // coneOuterGain?: number | undefined;
      //   // distanceModel?: "inverse" | "linear";
      //   // maxDistance?: number;
      //   panningModel: 'HRTF'
      //   // refDistance?: number;
      //   // rolloffFactor?: number;
      // })
      // howl.stereo(-1)
      // howl.pos(0.5, 0.5, 0.5)
      return howl
    }

    const howl = computed(() => {
      console.log('howl重新加载了')
      Howler.unload()
      return createHowl(state.value.playUrl)
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
