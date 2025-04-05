import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { useIpcRenderer } from '@vueuse/electron'
import { queryParam } from '../main/sqlite.d'

const { send } = useIpcRenderer()

// Custom APIs for renderer
const api = {
  windowMin: (): void => send('window-min'),
  windowMax: (): void => send('window-max'),
  windowClose: (): void => send('window-close'),
  sqlQuery: <R>(param: queryParam): Promise<R[]> => ipcRenderer.invoke('sql-query', param)
}

export type Api = typeof api

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
