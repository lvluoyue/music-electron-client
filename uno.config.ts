import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

export default defineConfig({
  shortcuts: [
    // ...
  ],
  theme: {
    colors: {
      // ...
    }
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      cdn: 'https://esm.sh/',
      collections: {
        q: () => import('@iconify-json/qlementine-icons/icons.json').then((i) => i.default),
        l: FileSystemIconLoader('./resources/icons', (svg) =>
          svg
            .replace(/(<svg.*?width=)"(.*?)"/, '$1"1em"')
            .replace(/(<svg.*?height=)"(.*?)"/, '$1"1em"')
        )
      }
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // ...
      }
    })
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()]
})
