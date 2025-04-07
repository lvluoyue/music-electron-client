import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'
import presetWind3 from '@unocss/preset-wind3'
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
  rules: [
    ['drag', { '-webkit-app-region': 'drag', '-webkit-user-select': 'none' }],
    ['no-drag', { '-webkit-app-region': 'no-drag' }],
    ['plus-lighter', { 'mix-blend-mode': 'plus-lighter' }]
  ],
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons({
      cdn: 'https://esm.sh/',
      collections: {
        q: () => import('@iconify-json/qlementine-icons/icons.json').then((i) => i.default),
        l: FileSystemIconLoader('./resources/icons', (svg) =>
          svg.replace(/(<svg.*?width=)"(.*?)"/, '$1"1em"').replace(/(<svg.*?height=)"(.*?)"/, '$1"1em"')
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
