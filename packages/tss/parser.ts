// packages/tss/parser.ts

import type { Draft, Input, Merge, Ref, Style } from 'tss/types'
import { dash, isEqual, isObject, template } from 'radashi'
import invariant from 'tiny-invariant'
import { shorthand } from 'tss/shorthand'
import { store } from 'tss/store'

export function resolve(input: Input): Style {
  return expand(evaluate(input))
}

export function t(style: Style) {
  return flatten(style).join('')
}

function dereference(path: string, keys: string[]): Draft {
  const target = path.split('.').reduce<unknown>((acc, part) => {
    invariant(isObject(acc) && part in acc, template('cannot find style at path: {{path}}', { path }))
    return (acc as Record<string, unknown>)[part]
  }, store)
  const draft = { ...(target as Draft) }
  for (const key of keys) delete draft[key]
  return draft
}

function evaluate(input: Input): Draft {
  if (isPick(input)) return dereference(input.path, input.keys ?? [])
  if (isMerge(input)) return input.src.map(evaluate).reduce((acc, cur) => ({ ...acc, ...cur }), {})
  return input
}

function expand(draft: Draft): Draft {
  return Object.fromEntries(
    Object.entries(draft).map(([key, value]) => {
      const prop = shorthand[key as keyof typeof shorthand] ?? key
      return [prop, value]
    })
  )
}

function flatten(draft: Draft): string[] {
  return Object.entries(expand(draft)).flatMap(([key, value]) => {
    if (!value) return []
    if (isObject(value) && !isSelector(key)) {
      return flatten(value as Draft)
    }
    if (isObject(value) && isSelector(key)) {
      const body = flatten(value as Draft).join('')
      return [template('<selector>{<body>}', { body, selector: key }, /<(.+?)>/g)]
    }
    return [template('{{prop}}:{{value}};', { prop: dash(key), value })]
  })
}

function isMerge(obj: unknown): obj is Merge {
  return isObject(obj) && 'type' in obj && isEqual(obj.type, 'merge')
}

function isPick(obj: unknown): obj is Ref {
  return isObject(obj) && 'type' in obj && isEqual(obj.type, 'pick')
}

function isSelector(value: string) {
  return /^[\[\].#:]/.test(value) || value.includes(' ')
}
