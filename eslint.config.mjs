// eslint.config.mjs

import jsonc from 'eslint-plugin-jsonc'
import perfectionist from 'eslint-plugin-perfectionist'
import eslint from 'typescript-eslint'

export default [
  ...eslint.configs.recommended,
  ...[perfectionist.configs['recommended-alphabetical']],
  ...jsonc.configs['flat/all'],
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      ],
      'perfectionist/sort-imports': [
        'error',
        { newlinesBetween: 'never' }
      ]
    }
  },
  {
    files: ['**/*.json'],
    rules: {
      'jsonc/array-element-newline': 'off',
      'jsonc/indent': ['error', 2, {}],
      'jsonc/key-name-casing': 'off'
    }
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off'
    }
  },
  {
    ignores: ['**/*.js', '**/dist/*', '**/snippets/*'] // snippets @ts-nocheck uses
  }
]
