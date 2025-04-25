<script setup lang="ts">
import { type SearchParams, song, type SongDataList } from '@renderer/api/core/search'
import songList from './components/song-list.vue'

const route = useRoute()

const params = ref<SearchParams>({
  keyword: route.params.keyword as string,
  page: 1,
  limit: 10
})

const list = ref<SongDataList[]>([])

const songRef = ref<InstanceType<typeof songList>>()

const load = async (): Promise<void> => {
  const { meta, list: newlist } = await song(params.value)
  params.value.page = meta.nextPage
  list.value = list.value.concat(newlist)
}

watch(
  () => route.params.keyword,
  async () => {
    console.log(1)
    params.value = {
      keyword: route.params.keyword as string,
      page: 1,
      limit: 10
    }
    list.value = []
    await load()
  },
  {
    immediate: true
  }
)
</script>

<template>
  <el-tabs v-model="route.params.searchType as string">
    <el-tab-pane label="歌曲" name="song">
      <song-list ref="songRef" :data="list" :scroll="load" :show-album="true" :show-interval="true"></song-list>
    </el-tab-pane>
    <el-tab-pane label="视频" name="mv">视频</el-tab-pane>
    <el-tab-pane label="专辑" name="album">专辑</el-tab-pane>
    <el-tab-pane label="歌单" name="playlist">歌单</el-tab-pane>
    <el-tab-pane label="歌词" name="lyric">歌词</el-tab-pane>
    <el-tab-pane label="歌手" name="singer">歌手</el-tab-pane>
  </el-tabs>
</template>

<style scoped lang="scss"></style>
