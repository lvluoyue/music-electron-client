import request from '@renderer/utils/request'

export interface SearchParams {
  keyword: string
  page?: number
  limit?: number
}

export interface SearchSongData {
  meta: Meta
  list: SongDataList[]
}

export interface SongDataList {
  songID: number
  songMID: string
  vid: string
  title: string
  subtitle: string
  album: string
  singer: string
  singerList: SingerList[]
  cover: string
  pay: Pay
  time: Date
  type: number
  bpm: number
  content: string
  grp: SongDataList[]
}

export enum Pay {
  '免费' = '免费',
  '付费' = '付费'
}

export interface SingerList {
  id: number
  mid: string
  name: string
  pmid: string
  title: string
  type: number
  uin: number
}

export interface Meta {
  total: number
  nextPage: number
  perPage: number
}

export async function song(params: SearchParams): Promise<SearchSongData> {
  return await request.get<SearchSongData, SearchSongData>('/music/tencent/search/song', {
    params
  })
}
