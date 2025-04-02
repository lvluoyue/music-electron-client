export const useAppStore = defineStore('app', () => {
  const isElectron = !!window.electron

  return {
    isElectron
  }
})
