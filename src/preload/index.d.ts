import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      windowMin: () => void
      windowMax: () => void
      windowClose: () => void
    }
  }
}
