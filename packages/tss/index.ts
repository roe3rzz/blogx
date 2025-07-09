// packages/tss/index.ts

import type { Assert, Draft, Input, Merge, Ref, Style, Tree } from 'tss/types'
import { css as hono } from 'hono/css'
import { isFunction, list, sum, template } from 'radashi'
import { resolve, t } from 'tss/parser'
import { store } from 'tss/store'

class Builder {
  constructor(private path: string, private keys: string[] = []) {}
  merge(draft: Draft): Merge {
    return { src: [{ keys: this.keys, path: this.path, type: 'pick' }, draft], type: 'merge' }
  }
  omit(keys: (keyof Style)[] | string[]) {
    return new Builder(this.path, [...this.keys, ...keys])
  }
}

export function calc({ input, unit }: { input: string[], unit?: string }) {
  const values = input.map(v => parseFloat(v))
  return template('{{value}}{{unit}}', { unit, value: sum(values) })
}

export function define<T extends Tree>(styles: T) {
  Object.assign(store, styles)
  return styles
}

export function object<T extends Record<string, Merge | Ref | Style>>(
  style: { [K in keyof T]: T[K] extends Style ? Assert<T[K]> & T[K] : T[K] }
) {
  return style
}

export function parse(input: Input) {
  return hono`${template('{{t}}', { t: t(resolve(input)) })}`
}

export function pick(path: string) {
  return new Builder(path)
}

export function ref(_path: string) {
  return '1px' // mock
}

export function repeat(value: (() => string) | string, count: number) {
  const fn = isFunction(value) ? value : () => value
  return list(0, count - 1, fn)
}

export function style<const T extends Style>(value: Assert<T> extends never ? never : T) {
  return value
}

export const s = { calc, define, object, parse, pick, ref, repeat, style, var: template }

export { t }
