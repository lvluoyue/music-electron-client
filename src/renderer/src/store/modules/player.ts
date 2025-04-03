export const usePlayerStore = defineStore('player', () => {
  const show = ref(false) // 播放器是否显示
  const isPlaying = ref(false) // 是否播放中
  const playList = ref()
  const currentInfo = ref({
    albumImage: 'https://y.qq.com/music/photo_new/T002R800x800M000000wd19g0wTd0d.jpg'
  })
  return {
    show,
    isPlaying,
    playList,
    currentInfo
  }
})
