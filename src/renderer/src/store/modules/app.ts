export const useAppStore = defineStore('app', () => {
  const isElectron = !!window.electron
  const isPageLeave = ref(false)
  return {
    isElectron,
    isPageLeave
  }
})
