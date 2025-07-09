// .devcontainer/lib/haproxy.ts

import { crush, isArray, isEmpty, isEqual, isNullish, keys, set, sift, template } from 'npm:radashi'
import { cert } from './cert.ts'

function block(name: string, rules: ReturnType<typeof rule>[]) {
  return { name, rules }
}

function parse(blocks: ReturnType<typeof block>[]) {
  return blocks.map(({ name, rules }) => transform(name, rules)).join('\n'.repeat(2)) + '\n'
}

function path(file: 'cfg' | 'crt', dir = h.dir) {
  const file_ = isEqual(file, 'cfg') ? 'haproxy.cfg' : cert.path('bundle', { withDir: true })
  return template('{{dir}}{{file}}', { dir, file: file_ })
}

function rule(key: string, value?: (number | string)[] | null | number | string) {
  return set({}, key, value ?? null)
}

rule.on = rule

rule.off = function (..._: Parameters<typeof rule>) {
  return undefined as unknown as object // keeps the same structure as `rule`, but returns nothing
}

function transform(name: string, rules: ReturnType<typeof rule>[], delimiter = '\n' + ' '.repeat(2)) {
  const lines = sift(rules.map(rule_ => {
    if (isEmpty(rule_)) return
    const obj = crush(rule_)
    // crush() flattens nested objects, but also array values into `.0`, `.1`, ...
    // so if there's only one key, we trust the original rule instead
    const [[k, v]] = Object.entries(!isEqual(keys(obj).length, 1) ? rule_ : obj) as Parameters<typeof rule>[]
    return template('{{k}} {{v}}', { k, v: isNullish(v) ? '' : isArray(v) ? v.join(' ') : v })
  })).join(delimiter)
  return template('{{name}}{{delimiter}}{{lines}}', { delimiter, lines, name })
}

export const h = { block, dir: '/etc/haproxy/', parse, path, rule }
