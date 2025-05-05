import { LyricLine } from '@applemusic-like-lyrics/core'
import { usePlayerInfoStore } from '@renderer/store/modules/playerInfo'
import { Howl, Howler } from 'howler'
import HiFiBassAnalyzer from '@renderer/utils/HiFiBassAnalyzer'

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

    // 低频音量监控，可根据鼓点动态变化背景图片
    // setInterval(() => {
    //   state.value.lowFreqVolume = state.value.lowFreqVolume == 0.1 ? 0.9 : 0.1
    // }, 1000)

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
          const a = new HiFiBassAnalyzer()
          const interval1 = setInterval(() => {
            if (howl.playing()) {
              state.value.lowFreqVolume = a.getTransientBass() * 1.9
            } else {
              clearInterval(interval1)
            }
            console.log(state.value.lowFreqVolume)
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
      // howl.stereo(0) // 默认居中立体声
      // howl.pos(0.1, -0.1, -0.5)
      // howl.orientation(0, 0, 1) // 默认前向方向
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
