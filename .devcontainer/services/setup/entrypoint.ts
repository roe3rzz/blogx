// .devcontainer/services/setup/entrypoint.ts

import { template, tryit } from 'npm:radashi'
import { cert } from '../../lib/cert.ts'
import { run } from '../../lib/cmd.ts'

const bun = await run(['bun', ['i']])

if (bun.isOk()) {
  console.log('\nSuccess', bun.value.stdout.trim())
} else {
  console.error('\nFailure', bun.error.message.trim())
}

if (bun.isErr()) Deno.exit(1)

const [, stat] = await tryit(() => Deno.stat(cert.path('bundle', { withDir: true })))()

if (stat) Deno.exit(0)

const mkcert = await run(['mkcert', [cert.domain]])

if (mkcert.isOk()) {
  console.log('\nSuccess', template('mkcert {{domain}}', { domain: cert.domain }))
} else {
  console.error('\nFailure', mkcert.error.message.trim())
}

if (mkcert.isErr()) Deno.exit(1)

Deno.mkdirSync(cert.dir, { recursive: true })

// move mkcert output into certs/ directory, deno has not mv
Deno.renameSync(cert.path('cert'), cert.path('cert', { withDir: true }))
Deno.renameSync(cert.path('key'), cert.path('key', { withDir: true }))

Deno.writeTextFileSync(
  cert.path('bundle', { withDir: true }),
  template('{{cert}}{{key}}', {
    cert: Deno.readTextFileSync(cert.path('cert', { withDir: true })),
    key: Deno.readTextFileSync(cert.path('key', { withDir: true }))
  })
)

// deno --allow-run --allow-read --allow-write .devcontainer/services/setup/entrypoint.ts
