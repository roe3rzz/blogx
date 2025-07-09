// apps/harbor/main/src/routes/index.tsx

import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'

export const routes = new Hono()
  .use('/*', serveStatic({ root: './dist' }))

export default routes

export type Routes = typeof routes
