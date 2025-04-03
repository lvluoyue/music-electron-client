<script setup lang="ts"></script>

<template>
  <el-container h-screen>
    <el-header>
      <page-header></page-header>
    </el-header>
    <el-main flex-1 style="--el-main-padding: 0">
      <el-container h-full>
        <page-aside></page-aside>
        <page-content></page-content>
      </el-container>
    </el-main>
    <el-footer>
      <page-footer></page-footer>
    </el-footer>
  </el-container>
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
