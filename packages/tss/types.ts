// packages/tss/types.ts

import type { SystemStyleObject as Panda } from '@pandacss/dev'
import { dash } from 'radashi'
import { shorthand } from 'tss/shorthand'

export const accept = [
  'background',
  'border',
  'borderRadius',
  'borderRight',
  'color',
  'cursor',
  'display',
  'fontSize',
  'fontWeight',
  'flexFlow',
  'gap',
  'gridTemplateColumns',
  'gridTemplateRows',
  'height',
  'lineHeight',
  'margin',
  'minHeight',
  'minWidth',
  'overflow',
  'padding',
  'placeContent',
  'textAlign',
  'textOverflow',
  'visibility',
  'whiteSpace',
  'width',
  'top',
  'right'
] as const
export const props = accept.map(prop => dash(prop))
export type Assert<T> = Reject<T> extends never ? T : ['error: unknown style property found:', Reject<T>]
export type Draft = Record<string, unknown> & Style
export type Input = Draft | Merge | Ref
export type Merge = { src: (Merge | Ref | Style)[], type: 'merge' }
export type Output = Native & Partial<Tree>
export type Ref = { keys?: string[], path: string, type: 'pick' }
export type Style = { [K in keyof Shorthand]?: Value<K> } & Native
export type Tree = Record<string, Branch | Merge | Ref>
type Accept = (typeof accept)[number]
type Branch = Record<string, Merge | Ref | Style>
type Native = Pick<Panda, Accept>
type Reject<T> = Exclude<keyof T, keyof Style | Selector>
type Selector =
  | `[data-${string}]${string}`
  | `@${string}`
  | `&${string}`
  | `${string}:${string}`
  | `${string} ${string}`
type Shorthand = typeof shorthand
type Value<K extends keyof Shorthand> = K extends keyof Shorthand
  ? Shorthand[K] extends keyof Panda ? Panda[Shorthand[K]]
  : never
  : never
