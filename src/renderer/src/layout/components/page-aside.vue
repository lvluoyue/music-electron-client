<script setup lang="ts">
const route = useRoute()
const router = useRouter()
console.log()
</script>

<template>
  <el-aside width="210px" h-full bg-white>
    <el-scrollbar>
      <el-menu :default-active="route.path" router>
        <template v-for="item in router.getRoutes().at(-1)?.children" :key="item.path">
          <el-menu-item v-if="!item.meta?.hidden" :index="item.path">
            <template #title>{{ item.meta?.title }}</template>
            <i :class="item.meta?.icon" text-xl mr2></i>
          </el-menu-item>
        </template>
        <el-divider></el-divider>
        <el-menu-item> 歌单 </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<style scoped lang="scss">
:deep(.el-scrollbar__wrap--hidden-default) {
  @apply h-full;
}
.el-scrollbar {
  border-right: 1px solid var(--el-menu-border-color);
}
.el-menu {
  @apply b-r-none select-none;
  &-item {
    @apply h12 rounded-xl m-x-3 m-y-1;
    &.is-active {
      background: var(--el-color-primary-light-9);
    }
    &:hover {
      background-color: var(--el-menu-hover-bg-color) !important;
    }
  }
}
</style>
