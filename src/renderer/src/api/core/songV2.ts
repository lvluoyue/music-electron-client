import request from '@renderer/utils/request'

export interface SearchParams {
  word: string
  page?: number
  limit?: number
  num?: number
  choose?: number
  grp?: number
  quality?: number
  id?: number
  mid?: string
  type?: number
  ekey?: boolean
}

export interface LinkData {
  code: number
  message: string
  data: LinkDataList[]
  time: Date
  pid: number
  tips: string
}

export interface LinkDataList {
  id: number
  mid: string
  vid: string
  song: string
  subtitle: string
  album: string
  singer: string
  cover: string
  pay: string
  time: Date
  type: number
  bpm: number
  quality: string
  grp: LinkDataList[]
}

export async function song(params: SearchParams): Promise<LinkData> {
  return await request.get<LinkData, LinkData>('/music/tencent/search/song', {
    params
  })
}
