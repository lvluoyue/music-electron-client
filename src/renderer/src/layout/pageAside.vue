<script setup lang="ts">
const router = useRouter()
const route = useRoute()
</script>

<template>
  <el-aside width="200px" h-full bg-white>
    <el-scrollbar>
      <el-menu :default-openeds="['1', '3']" :default-active="route.path" router>
        <el-menu-item index="/">
          <template #title> 首页 </template>
          <i i-q-home-16 text-xl mr2></i>
        </el-menu-item>
        <el-menu-item index="/like">
          <template #title> 喜欢 </template>
          <i i-q-heart-filled-16 text-xl mr2></i>
        </el-menu-item>
        <el-menu-item>
          <template #title> 最近播放 </template>
          <i i-q-layout-screen-vertical-16 text-xl mr2></i>
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

<style scoped>
.el-menu-item {
  border-radius: 15px;
  margin: 0 10px;
}
</style>
