// .devcontainer/lib/cmd.ts

import { err, ok, type Result } from 'npm:neverthrow'
import { isEqual, template, tryit } from 'npm:radashi'

export function call([exec, args]: [string, string[]], opts?: { cwd: string }): Result<Deno.ChildProcess, Error> {
  const [error, process] = tryit(() => new Deno.Command(exec, { args, cwd: opts?.cwd }).spawn())()
  if (error) return err(error)
  return ok(process)
}

export async function run(
  [exec, args]: [string, string[]],
  opts?: { cwd: string },
  decoder = cache.decoder
): Promise<Result<{ stdout: string } & Omit<Deno.CommandOutput, 'stdout'>, Error>> {
  const [error, output] = await tryit(() => new Deno.Command(exec, { args, cwd: opts?.cwd }).output())()
  if (error) return err(error)
  if (isEqual(output.code, 0)) return ok({ ...output, stdout: decoder.decode(output.stdout) })
  return err(
    new Error(
      template('command failed with exit code {{code}} {{stderr}}', {
        code: output.code,
        stderr: decoder.decode(output.stderr)
      })
    )
  )
}

namespace cache {
  export const decoder = new TextDecoder()
}
