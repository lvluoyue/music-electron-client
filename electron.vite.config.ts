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
    plugins: [externalizeDepsPlugin()]
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
    ],
    server: {
      open: false
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia', '@vueuse/core', '@vueuse/electron'],
            elementPlus: ['element-plus'],
            lyric: ['@applemusic-like-lyrics/lyric', '@applemusic-like-lyrics/vue'],
            pixi: [
              '@pixi/app',
              '@pixi/core',
              '@pixi/display',
              '@pixi/filter-blur',
              '@pixi/filter-bulge-pinch',
              '@pixi/filter-color-matrix',
              '@pixi/filter-noise',
              '@pixi/sprite'
            ]
            //   axios: ['axios'],
          },
          // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
          entryFileNames: 'js/[name].[hash].js',
          // 用于命名代码拆分时创建的共享块的输出命名
          chunkFileNames: 'js/[name].[hash].js'
        }
      }
    }
  }
})
