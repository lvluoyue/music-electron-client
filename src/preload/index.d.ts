import { ElectronAPI } from '@electron-toolkit/preload'
import { type Api } from '.'

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}
