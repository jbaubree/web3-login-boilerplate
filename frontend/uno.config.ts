import { defineConfig, presetIcons, presetUno } from 'unocss'
import { colors, safelist } from './config'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      scale: 1,
      warn: true,
    }),
  ],
  safelist,
  theme: {
    colors,
  },
})
