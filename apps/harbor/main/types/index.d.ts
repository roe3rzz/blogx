// apps/harbor/main/types/index.d.ts

import {} from 'honox'

declare global {
  type PropsOf<T extends keyof import('hono/jsx').JSX.IntrinsicElements> = import('hono/jsx').PropsWithChildren<
    RIS<import('hono/jsx').JSX.IntrinsicElements[T]>
  >
  type RIS<T> = { // remove index signature
    [
      K in keyof T as K extends string ? (string extends K ? never : K)
        : (number extends K ? never : K)
    ]: T[K]
  }
}
