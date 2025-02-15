import eslintReact from 'eslint-plugin-react'
import eslintReactHooks from 'eslint-plugin-react-hooks'
import eslintReactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import js from '@eslint/js'
import prettierPlugin from 'eslint-plugin-prettier'
import tseslint from 'typescript-eslint'
import typescriptPlugin from 'eslint-plugin-typescript'

export default [
  {
    plugins: {
      'react-hooks': eslintReactHooks,
      react: eslintReact,
      'react-refresh': eslintReactRefresh,
      prettier: prettierPlugin,
      typescript: typescriptPlugin,
    },
  },
  {
    ignores: ['node_modules', '**/dist'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  eslintReact.configs.flat['jsx-runtime'],
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2021,
      },
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],


    rules: {
      '@typescript-eslint/no-restricted-imports': [
  'error',
  {
    paths: [
      {
        name: '@ideanick/backend',
        message: 'Imports from backend workspace are restricted',
        allowTypeImports: true,
      },
    ],
    patterns: [
      {
        group: ['@ideanick/backend/**', '!@ideanick/backend/**/', '!@ideanick/backend/**/input'],
        message: 'Only types and input schemas are allowed to be imported from backend workspace',
        allowTypeImports: true,
      },
    ],
  },
],
      'typescript/no-explicit-any': 'off',
      'no-console': 'warn',
      'react-refresh/only-export-components': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'error',
      'no-restricted-syntax': ['error', {
        selector: '[object.type=MetaProperty][property.name=env]',
        message: 'Import meta.env directly is restricted. Use instead import { env } from "lib/env.ts".',
      }],
      '@typescript-eslint/no-empty-object-type': 'off'
    },
  },
]
