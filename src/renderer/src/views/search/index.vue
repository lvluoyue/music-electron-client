<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <el-tabs v-model="route.params.searchType as string">
    <el-tab-pane label="歌曲" name="song"><song></song></el-tab-pane>
    <el-tab-pane label="视频" name="mv">视频</el-tab-pane>
    <el-tab-pane label="专辑" name="album">专辑</el-tab-pane>
    <el-tab-pane label="歌单" name="playlist">歌单</el-tab-pane>
    <el-tab-pane label="歌词" name="lyric">歌词</el-tab-pane>
    <el-tab-pane label="歌手" name="singer">歌手</el-tab-pane>
  </el-tabs>
</template>

<style scoped lang="scss"></style>
