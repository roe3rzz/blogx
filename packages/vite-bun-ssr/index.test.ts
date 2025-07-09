// packages/vite-bun-ssr/index.test.ts

import { expect, test } from 'bun:test'
import { isFunction } from 'radashi'
import invariant from 'tiny-invariant'
import bun from 'vite-bun-ssr'

test('vite-bun-ssr exposes correct build config', async () => {
  const plugin = bun()
  const hook = plugin.config
  invariant(isFunction(hook), 'expected config to be a function')
  const config = await hook({}, { command: 'build', mode: 'test' })
  const build = config?.build
  expect(build).toBeDefined()
  expect(build?.ssr).toBe(true)
  expect(build?.outDir).toBe('./dist')
  expect(build?.rollupOptions?.output).toEqual({ entryFileNames: 'server.mjs' })
})
