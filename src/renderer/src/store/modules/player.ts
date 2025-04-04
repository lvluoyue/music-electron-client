interface playListInterface {
  id: number
  mid: string
  title: string
  subtitle: string
  album: string
  albumImage: string
  bpm: number
  playUrl: string
}
export const usePlayerStore = defineStore('player', () => {
  const show = ref(false) // 播放器是否显示
  const isPlaying = ref(false) // 是否播放中
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
  const playerInfo = ref({
    // 播放信息
    id: 0,
    mid: '',
    title: '',
    subtitle: '',
    album: '',
    albumImage: '',
    bpm: 60,
    currentTime: 0,
    maxTime: 200000,
    playUrl: ''
  }) // 当前播放歌曲信息

  const audio = ref(new Audio())
  audio.value.controls = true
  audio.value.preload = 'auto'
  audio.value.onplay = (): void => {
    if (!audio.value.paused) {
      playerInfo.value.currentTime = (audio.value.currentTime * 1000) | 0
    }
  }
  audio.value.ontimeupdate = (): void => {
    playerInfo.value.currentTime = (audio.value.currentTime * 1000) | 0
  }

  return {
    show,
    isPlaying,
    audio,
    playList,
    playerInfo
  }
})
