import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import wasm from 'vite-plugin-wasm'
import UnoCSS from 'unocss/vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {
  ElementPlusResolver,
  VueUseComponentsResolver,
  VueUseDirectiveResolver
} from 'unplugin-vue-components/resolvers'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [
      externalizeDepsPlugin(),
      AutoImport({
        imports: ['vue', '@vueuse/core', 'vue-router', 'pinia'],
        resolvers: [ElementPlusResolver(), VueUseComponentsResolver(), VueUseDirectiveResolver()],
        eslintrc: {
          enabled: true
        },
        dts: 'src/types/auto-imports.d.ts'
      }),
      Components({
        resolvers: [ElementPlusResolver(), VueUseComponentsResolver(), VueUseDirectiveResolver()],
        // 指定自定义组件位置(默认:src/components)
        dirs: ['src/components', 'src/**/components'],
        // 指定自动导入组件TS类型声明文件路径 (false:关闭自动生成)
        // dts: false,
        dts: 'src/types/components.d.ts'
      })
    ]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [
      vue(),
      vueDevTools({
        // 启用 Vue DevTools
        componentInspector: true,
        // 将默认编辑器从 VS Code 更改为 WebStorm
        launchEditor: 'webstorm'
      }),
      vueJsx(), // 添加对 JSX 的支持
      wasm(),
      UnoCSS(),
      AutoImport({
        imports: ['vue', '@vueuse/core', 'vue-router', 'pinia'],
        resolvers: [ElementPlusResolver(), VueUseComponentsResolver(), VueUseDirectiveResolver()],
        eslintrc: {
          enabled: true
        },
        dts: 'src/types/auto-imports.d.ts'
      }),
      Components({
        resolvers: [ElementPlusResolver(), VueUseComponentsResolver(), VueUseDirectiveResolver()],
        // 指定自定义组件位置(默认:src/components)
        dirs: ['src/components', 'src/**/components'],
        // 指定自动导入组件TS类型声明文件路径 (false:关闭自动生成)
        // dts: false,
        dts: 'src/types/components.d.ts'
      })
    ]
  }
})
