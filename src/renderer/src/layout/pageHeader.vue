<script setup lang="ts">
import logo from '@renderer/assets/logo.png'
import { useAppStore } from '@renderer/store'

const isMaximized = ref(false)

const windowMin = (): void => {
  window.api.windowMin()
}
const windowMax = (): void => {
  window.api.windowMax()
  isMaximized.value = !isMaximized.value
}
const windowClose = (): void => {
  window.api.windowClose()
}
const appStore = useAppStore()

const searchOptions = ref({
  loading: false,
  keyword: '',
  options: []
})

const searchHandller = (query: string): void => {
  searchOptions.value.loading = true
  console.log(query)
  setTimeout(() => {
    searchOptions.value.loading = false
  }, 1000)
}
</script>

<template>
  <el-card shadow="never" h-full flex items-center>
    <div flex items-center gap-10>
      <el-image :src="logo"></el-image>
      <div style="-webkit-app-region: no-drag">
        <el-select
          v-model="searchOptions.keyword"
          suffix-icon="search"
          remote-show-suffix
          multiple
          filterable
          remote
          reserve-keyword
          placeholder="输入搜索关键词"
          :remote-method="searchHandller"
          :loading="searchOptions.loading"
          style="width: 240px"
        >
          <template #prefix>
            <i class="i-q-search-16"></i>
          </template>
          <el-option
            v-for="item in searchOptions.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div
        v-if="appStore.isElectron"
        flex
        ml-auto
        gap-4
        text-2xl
        color="#817e7e"
        style="-webkit-app-region: no-drag"
      >
        <i h-60px i-q-windows-minimize-16 @click="windowMin"></i>
        <i
          h-60px
          :class="isMaximized ? 'i-q-windows-unmaximize-16' : 'i-q-windows-maximize-16'"
          @click="windowMax"
        ></i>
        <i h-60px i-q-windows-close-16 @click="windowClose"></i>
      </div>
    </div>
  </el-card>
</template>

<style scoped lang="scss">
.el-card {
  -webkit-app-region: drag;
  -webkit-user-select: none;
  user-select: none;
}
:deep(.el-card__body) {
  width: 100%;
}
</style>
