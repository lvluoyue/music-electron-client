<script setup lang="ts">
const playListShow = ref(false)
</script>

<template>
  <el-container h-screen p2 rounded-9 overflow-hidden>
    <el-header>
      <page-header></page-header>
    </el-header>
    <el-main flex-1 style="--el-main-padding: 0" no-drag>
      <el-container h-full>
        <page-aside></page-aside>
        <page-content></page-content>
      </el-container>
    </el-main>
    <el-footer no-drag>
      <page-footer
        :play-list-show="playListShow"
        @update:play-list-show="(value) => (playListShow = value)"
      ></page-footer>
    </el-footer>
  </el-container>

  <el-drawer v-model="playListShow" :show-close="false">
    <template #header="{ close, titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">This is a custom header!</h4>
      <el-button type="danger" @click="close">
        <el-icon class="el-icon--left"></el-icon>
        Close
      </el-button>
    </template>
    This is drawer content.
  </el-drawer>
</template>

<style scoped lang="scss">
.el-header {
  --el-header-padding: 0;
  --el-header-height: 80px; // 默认60px
}
.el-footer {
  --el-footer-padding: 0;
  --el-footer-height: 80px; // 默认60px
}
</style>
