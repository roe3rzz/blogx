// apps/harbor/main/vite.config.ts

import mdx from '@mdx-js/rollup'
import { config } from 'dotenv'
import honox from 'honox/vite'
import client from 'honox/vite/client'
import { resolve } from 'path'
import { isEqual } from 'radashi'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { defineConfig } from 'vite'
import bun from 'vite-bun-ssr'

config({ path: resolve(__dirname, '../../../.env') })

export default defineConfig(({ isSsrBuild, mode }) => {
  return {
    esbuild: { include: /\.(m?[jt]s|[jt]sx)$/, target: 'es2020' }, // for Symbol.asyncDispose
    plugins: [
      isEqual(isSsrBuild, false) && honox(),
      isEqual(isSsrBuild, false) && isEqual(mode, 'client') && client({ assetsDir: './' }),
      isEqual(mode, 'production') && bun(),
      mdx({
        jsxImportSource: 'hono/jsx',
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm]
      })
    ].filter(Boolean),
    resolve: { alias: { harbor: resolve(resolve(__dirname, '../../../'), 'apps/harbor') } },
    server: {
      host: true, // for container
      port: 8080,
      watch: {
        usePolling: true // for container
      }
    }
  }
})
