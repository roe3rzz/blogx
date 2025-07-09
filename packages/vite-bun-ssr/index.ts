// packages/vite-bun-ssr/index.ts

import type { Plugin } from 'vite'
import { builtinModules } from 'node:module'
import { resolve } from 'node:path'

export default function bun(): Plugin {
  const build = {
    emptyOutDir: false,
    minify: true,
    outDir: './dist',
    rollupOptions: {
      external: [/^bun:/, /^node:/, ...builtinModules],
      input: resolve(__dirname, 'virtual.ts'),
      output: { entryFileNames: 'server.mjs' }
    },
    ssr: true
  }
  return {
    async config() {
      return { build }
    },
    name: 'vite-bun-ssr'
  }
}
