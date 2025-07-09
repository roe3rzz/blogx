// packages/tss/index.test.ts

import { expect, test } from 'bun:test'
import { t } from 'tss'

test('generates display style', () => {
  const res = t({ display: 'grid' })
  expect(res).toBe('display:grid;')
})

test('generates selector style', () => {
  const res = t({
    // @ts-expect-error just testing the output — ts can chill
    '[data-date]:nth-child(2n)': {
      borderRight: '1px solid #000'
    }
  })
  expect(res).toBe('[data-date]:nth-child(2n){border-right:1px solid #000;}')
})
