export const useAppStore = defineStore('app', () => {
  const sidebar = ref({
    opened: true,
    withoutAnimation: false,
    hide: false
  })

  const device = ref('desktop')

  return {
    sidebar,
    // 切换侧边栏
    toggleSideBar: () => {
      sidebar.value.opened = !sidebar.value.opened
    },
    // 关闭侧边栏
    closeSideBar: () => {
      sidebar.value.opened = false
    },
    // 打开侧边栏
    openSideBar: () => {
      sidebar.value.opened = true
    },
    // 切换设备
    toggleDevice: (val: string) => {
      device.value = val
    },

    device
  }
})
