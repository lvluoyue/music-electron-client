<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <el-aside width="210px" h-full bg-white>
    <el-scrollbar>
      <el-menu :default-active="route.path" router>
        <el-menu-item index="/index">
          <template #title> 首页 </template>
          <i i-q-home-16 text-xl mr2></i>
        </el-menu-item>
        <el-menu-item index="/like">
          <template #title> 喜欢 </template>
          <i i-q-heart-16 text-xl mr2></i>
          <!--i-q-heart-filled-16-->
        </el-menu-item>
        <el-menu-item>
          <template #title> 最近播放 </template>
          <i i-q-clock-16 text-xl mr2></i>
        </el-menu-item>
        <el-menu-item>
          <template #title> 本地和下载 </template>
          <i i-q-layout-screen-vertical-16 text-xl mr2></i>
        </el-menu-item>
        <el-divider></el-divider>
        <el-menu-item> 歌单 </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<style scoped lang="scss">
.el-menu-item {
  @apply h12 rounded-xl m-x-3 m-y-1;
  &.is-active {
    background: var(--el-color-primary-light-9);
  }
  &:hover {
    background-color: var(--el-menu-hover-bg-color) !important;
  }
}
</style>
