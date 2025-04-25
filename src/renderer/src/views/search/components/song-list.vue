<script setup lang="ts">
import { type SongDataList } from '@renderer/api/core/search'
import { formatDuring } from '@renderer/utils'
import { usePlayerInfoStore } from '@renderer/store/modules/playerInfo'
import { usePlayerStateStore } from '@renderer/store/modules/playerState'

const playerInfoStore = usePlayerInfoStore()
const playerStateStore = usePlayerStateStore()

const props = withDefaults(
  defineProps<{
    data: SongDataList[]
    scroll?: () => Promise<void> | void
    showAlbum?: boolean
    showInterval?: boolean
  }>(),
  {
    scroll: () => {},
    showInterval: false,
    showAlbum: false
  }
)

const scrollData = reactive({
  loading: false,
  hoverID: -1
})

const load = async (): Promise<void> => {
  if (!scrollData.loading && props.scroll) {
    scrollData.loading = true
    await props.scroll()
    scrollData.loading = false
  }
}

const imageClickHandller = (data): void => {
  if (playerInfoStore.playList?.filter((item) => item.songID === data.songID)?.length === 0) {
    playerInfoStore.playList?.push(data)
  }
  playerInfoStore.setting.songInfo = data
  // playerStateStore.state = { ...playerStateStore.state, ...data }
}
</script>

<template>
  <el-table
    v-infinite-scroll="load"
    :infinite-scroll-delay="500"
    :data="props.data"
    :row-style="{ height: '60px' }"
    @cell-mouse-enter="(row: SongDataList) => (scrollData.hoverID = row.songID)"
    @cell-mouse-leave="scrollData.hoverID = -1"
  >
    <el-table-column prop="song" label="歌名/歌手">
      <template #default="{ row }">
        <div class="song-item" flex items-center gap-2>
          <album-image
            class="w-40px h-40px"
            :image="row.cover"
            :hover="true"
            @click="imageClickHandller(row)"
          ></album-image>
          <div truncate whitespace-normal>
            <div line-clamp-1>{{ row.title }}</div>
            <div line-clamp-1>{{ row.singer }}</div>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column width="150">
      <template #default="{ row }">
        <div v-show="scrollData.hoverID === row.songID" flex gap-4 text-1rem>
          <i i-q-heart-16></i>
          <i i-q-layout-screen-vertical-16></i>
        </div>
      </template>
    </el-table-column>
    <el-table-column v-if="props.showAlbum" prop="album" label="专辑" width="250" />
    <el-table-column v-if="props.showInterval" prop="interval" label="时长" width="150">
      <template #default="{ row }">
        <span text-black text-op-30 font-100>{{ formatDuring(row.interval * 1000) }}</span>
      </template>
    </el-table-column>
    <template #append>
      <div v-if="scrollData.loading" class="loading-text">加载中...</div>
      <div v-if="scrollData.loading" class="no-more-text">没有更多数据了</div>
    </template>
  </el-table>
</template>

<style scoped lang="scss">
.el-table {
  :deep(.el-table__inner-wrapper):before {
    @apply w-auto!; // 解决动态加载表格滚动条始终为最下面的问题
  }
}
</style>
