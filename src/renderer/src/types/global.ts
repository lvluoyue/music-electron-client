import { LyricLine } from '@applemusic-like-lyrics/core'
import { type SongDataList } from '@renderer/api/core/search'
import 'vue-router'

declare module 'vue-router' {
  /** Meta，路由属性 */
  export interface RouteMeta {
    /** 是否隐藏(true-是 false-否) */
    hidden?: boolean
    /** ICON */
    icon?: string
    /** 【菜单】是否开启页面缓存 */
    keepAlive?: boolean
    /** 路由title */
    title?: string
    params?: string | null
  }
}

declare global {
  /**
   * 响应数据
   */
  interface ResponseData<T> {
    code: string
    data: T
    message: string
    time?: Date
    pid?: number
    tips?: string
  }

  // export interface playerInfo {
  //   id: number
  //   mid: string
  //   title: string
  //   subtitle: string
  //   album: string
  //   albumImage: string
  //   bpm: number
  //   playUrl: string
  // }

  export interface playerState {
    show: boolean
    isPlaying: boolean
    // 播放进度
    currentTime: number
    volume: number
    lowFreqVolume: number
    // 总时长
    duration: number
    // 专辑图片是否为视频
    albumIsVideo: boolean
    lyricLines: LyricLine[]
    songInfo: SongDataList
    playUrl: string
  }
}
