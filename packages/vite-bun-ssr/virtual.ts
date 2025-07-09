// packages/vite-bun-ssr/virtual.ts

import { Hono } from 'hono'

// hono doesn't expose `notFoundHandler` by default
type HonoWithHandler = { notFoundHandler?: Parameters<Hono['notFound']>[0] } & Hono

const modules = import.meta.glob<HonoWithHandler>(['/src/server.ts'], { eager: true, import: 'default' })

const worker = new Hono()

for (const [, app] of Object.entries(modules)) {
  worker.route('/', app)
  if (app.notFoundHandler) {
    worker.notFound(app.notFoundHandler)
  }
}

export default {
  fetch: worker.fetch,
  idleTimeout: 255,
  port: 8080
}
