/// <reference types="vitest" />

import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import { VueRouterAutoImports, getPascalCaseRouteName } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import Layouts from 'vite-plugin-vue-layouts'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Layouts(),
    VueRouter({
      routeBlockLang: 'yaml',
      dts: 'src/typed-router.d.ts',
      getRouteName: node => getPascalCaseRouteName(node),
    }),
    Vue({
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    }),
    AutoImport({
      imports: [
        'vue',
        '@vueuse/core',
        VueRouterAutoImports,
      ],
      dirs: [
        'src/composables',
        'src/stores',
        'src/static',
      ],
      dts: 'src/auto-imports.d.ts',
      vueTemplate: true,
    }),
    Components({
      dts: 'src/components.d.ts',
    }),
    UnoCSS(),
  ],
  test: {
    include: ['test/**/*.test.ts'],
    environment: 'jsdom',
  },
})
