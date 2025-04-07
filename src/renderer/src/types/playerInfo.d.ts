import { LyricLine } from '@applemusic-like-lyrics/core'

declare global {
  export interface playerInfo {
    id: number
    mid: string
    title: string
    subtitle: string
    album: string
    albumImage: string
    bpm: number
    playUrl: string
  }

  export interface playerState extends playerInfo {
    show: boolean
    isPlaying: boolean
    // 播放进度
    currentTime: number
    volume: number
    // 总时长
    duration: number
    // 专辑图片是否为视频
    albumIsVideo: boolean
    lyricLines: LyricLine[]
  }
}
