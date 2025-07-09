// packages/remark-rules/index.ts

import type { Root } from 'mdast'
import type { VFile } from 'vfile'
import { template } from 'radashi'
import { visit } from 'unist-util-visit'

type Context = [tree: Root, file: VFile]

export default function () {
  return (...[tree, file]: Context) => {
    noFinalMaru(tree, file)
    lineLengthLimit(tree, file)
    forbiddenWords(tree, file)
  }
}

function forbiddenWords(...[tree, file]: Context) {
  const forbidden: string[] = []
  visit(tree, 'text', node => {
    forbidden.filter(word => node.value.includes(word)).forEach(word =>
      file.message(template('禁止語句「{{word}}」が含まれています', { word }), node)
    )
  })
}

function lineLengthLimit(...[tree, file]: Context) {
  visit(tree, 'text', node => {
    if (node.value.length < 120) return
    file.message('1行120文字以内にしてください', node)
  })
}

function noFinalMaru(...[tree, file]: Context) {
  visit(tree, 'text', node => {
    if (!node.value.match(/。$/)) return
    file.message('文末に「。」は使用しないでください', node)
  })
}
