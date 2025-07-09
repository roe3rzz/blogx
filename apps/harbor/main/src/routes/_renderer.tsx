// apps/harbor/main/src/routes/_renderer.tsx

import { Style } from 'hono/css'
import { jsxRenderer } from 'hono/jsx-renderer'
import { Script } from 'honox/server'
import { template } from 'radashi'
import { s } from 'tss'

const Html = Object.assign(
  function ({ children }: PropsOf<'html'>) {
    return (
      <Html.Root>
        <Html.Head lang='ja'>
          <Html.Head.Meta charset='utf-8' />
          <Html.Head.Meta content='width=device-width, initial-scale=1.0' name='viewport' />
          <Html.Head.Link href='https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css' rel='stylesheet' />
          <Html.Head.Style />
          <Html.Head.Script />
        </Html.Head>
        <Html.Body>{children}</Html.Body>
      </Html.Root>
    )
  },
  {
    Body: ({ children }: PropsOf<'body'>) => <body class={s.parse(html.body.style)}>{children}</body>,
    Head: Object.assign(
      ({ children }: PropsOf<'head'>) => <head>{children}</head>,
      {
        Link: (props: PropsOf<'link'>) => <link {...props} />,
        Meta: (props: PropsOf<'meta'>) => <meta {...props} />,
        Script: () => {
          return (
            <>
              {import.meta.env.DEV
                ? (
                  <>
                    <Script src='/src/client.ts' />
                    {/* bugfix patches/@hono%2Fvite-dev-server@0.19.1.patch */}
                    <script src='/@vite/client' type='module' />
                  </>
                )
                : (
                  <script src={template('/{{client}}', { client: cache.client() })} type='module' />
                )}
            </>
          )
        },
        Style: () => <Style />
      }
    ),
    Root: ({ children }: PropsOf<'html'>) => <html class={s.parse(html.root.style)}>{children}</html>
  }
)

const html = s.define({
  body: s.object({
    style: s.style({
      '@media print': s.style({ p: '0' }),
      m: '0',
      w: '100%'
    })
  }),
  root: s.object({
    style: s.style({
      '& h1': s.style({ bd: '0', ta: 'center' }),
      '& h2': s.style({ bd: '0', p: '0' }),
      '& h3': s.style({ bd: '0', p: '0' }),
      '& tr': s.style({ va: 'baseline' }),
      d: 'grid',
      ff: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
      placeContent: 'center',
      w: '100%'
    })
  })
})

namespace cache {
  export function client() {
    if (import.meta.env.DEV) return '/src/client.ts'
    const manifest = Object.values(
      import.meta.glob('/dist/.vite/manifest.json', { eager: true, import: 'default' })
    )[0] as Record<string, { file: string }> | undefined
    return manifest?.['src/client.ts']?.file ?? 'client.js'
  }
}

export { Html }
export default jsxRenderer(({ children }) => <Html>{children}</Html>)
