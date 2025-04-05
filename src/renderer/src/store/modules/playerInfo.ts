import { LyricLine } from '@applemusic-like-lyrics/core'

export const usePlayerInfoStore = defineStore('playerInfo', () => {
  const playList = ref<playListInterface[]>([
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
    volume: 1, //音量，
    mute: false, // 静音
    lyricLines: [] as LyricLine[],
    // 专辑图片
    albumImage: '',
    // 专辑图片是否为视频
    albumIsVideo: false
  })
  return {
    playList,
    setting
  }
})
