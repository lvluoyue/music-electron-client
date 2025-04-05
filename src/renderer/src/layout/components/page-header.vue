<script setup lang="ts">
import logo from '@renderer/assets/logo.png'
import { useAppStore } from '@renderer/store'
import { usePlayerStateStore } from '@renderer/store/modules/playerState'

const appStore = useAppStore()
const { state } = usePlayerStateStore()

const isMaximized = ref(false)

const windowMinHandller = (): void => {
  window.api.windowMin()
}
const windowMaxHandller = (): void => {
  window.api.windowMax()
  isMaximized.value = !isMaximized.value
}
const windowCloseHandller = (): void => {
  window.api.windowClose()
}

const windowMinClass = computed(() => [
  'hover:color-green',
  'i-q-windows-minimize-16',
  state.show ? 'color-coolGray-3' : 'color-coolGray-5'
])

const windowMaxClass = computed(() => [
  'hover:color-green',
  state.show ? 'color-coolGray-3' : 'color-coolGray-5',
  isMaximized.value ? 'i-q-windows-unmaximize-16' : 'i-q-windows-maximize-16'
])

const windowCloseClass = computed(() => [
  'hover:color-green',
  'i-q-windows-close-16',
  state.show ? 'color-coolGray-3' : 'color-coolGray-5'
])

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
  <el-card shadow="never" h-full flex items-center drag>
    <div flex items-center gap-10>
      <el-image :src="logo"></el-image>
      <div no-drag>
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
          <!--          <el-option v-for="item in searchOptions.options" :key="item.value" :label="item.label" :value="item.value" />-->
        </el-select>
      </div>
      <transition name="icon-header" cursor-pointer z-20 items-center no-drag>
        <div v-show="!(appStore.isPageLeave && state.show) && appStore.isElectron" flex ml-auto gap-4 text-2xl>
          <el-tooltip :show-after="1000" placement="top-start" content="最小化">
            <i transition-color-300 :class="windowMinClass" @click="windowMinHandller"></i>
          </el-tooltip>
          <el-tooltip :show-after="1000" placement="top-start" :content="isMaximized ? '最大化' : '还原'">
            <i transition-color-300 :class="windowMaxClass" @click="windowMaxHandller"></i>
          </el-tooltip>
          <el-tooltip :show-after="1000" placement="top-start" content="退出">
            <i transition-color-300 :class="windowCloseClass" @click="windowCloseHandller"></i>
          </el-tooltip>
        </div>
      </transition>
    </div>
  </el-card>
</template>

<style scoped lang="scss">
:deep(.el-card__body) {
  width: 100%;
}
</style>
