import { LyricLine } from '@applemusic-like-lyrics/core'
import { Howler } from 'howler'

export const usePlayerInfoStore = defineStore('playerInfo', () => {
  const playList = ref<playerInfo[]>([
    {
      id: 0,
      mid: '',
      title: '',
      subtitle: '',
      album: '',
      albumImage: 'https://y.qq.com/music/photo_new/T002R800x800M000000wd19g0wTd0d.jpg',
      bpm: 60,
      playUrl: ''
    },
    {
      id: 0,
      mid: '',
      title: '',
      subtitle: '',
      album: '',
      albumImage: 'https://y.qq.com/music/photo_new/T002R800x800M000000wd19g0wTd0d.jpg',
      bpm: 60,
      playUrl: ''
    }
  ])
  //用来持久化当前播放歌曲的信息以及设置
  const setting = ref({
    volume: 100, //音量，
    mute: false, // 静音
    lyricLines: [] as LyricLine[],
    // 专辑图片
    albumImage: '',
    // 专辑图片是否为视频
    albumIsVideo: false
  })

  //音量监听,静音监听
  watchEffect(() => {
    Howler.mute(setting.value.mute).volume(setting.value.volume / 100)
  })

  return {
    playList,
    setting
  }
})
