// .devcontainer/services/shell/entrypoint.ts

import { call } from '../../lib/cmd.ts'

const result = call(['sleep', ['infinity']])

if (!result.isOk()) {
  console.error('\nFailure', result.error.message.trim())
}

if (result.isErr()) Deno.exit(1)

// deno --allow-run .devcontainer/services/shell/entrypoint.ts
