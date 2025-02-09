import eslintConfigPrettier from 'eslint-config-prettier'
import eslintReact from 'eslint-plugin-react'
import eslintReactHooks from 'eslint-plugin-react-hooks'
import eslintReactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import js from '@eslint/js'
import prettierPlugin from 'eslint-plugin-prettier'
import tseslint from 'typescript-eslint'
import typescriptPlugin from 'eslint-plugin-typescript'
import nodePlugin from 'eslint-plugin-node'

/** @type {import{'eslint'}.Linter.FlatConfig[]} */
export default [
  {
    plugins: {
      'react-hooks': eslintReactHooks,
      react: eslintReact,
      'react-refresh': eslintReactRefresh,
      prettier: prettierPlugin,
      typescript: typescriptPlugin,
      node: nodePlugin,
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
      'no-console': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-refresh/only-export-components': 'warn',
      'typescript/no-explicit-any': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'prettier/prettier': ['error', eslintConfigPrettier],
      'no-shadow': 'warn',
      'no-debugger': 'error',
      'prefer-const': 'warn',
      'import/no-unresolved': 'off',
      curly: 'error',
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['all', 'single', 'multiple', 'none'],
          allowSeparatedGroups: false,
        },
      ],
      'no-irregular-whitespace': [
        'error',
        {
          skipTemplates: true,
          skipStrings: true,
        },
      ],
      '@typescript-eslint/no-non-null-assertion': 'error',
      'linebreak-style': ['error', 'unix'],
      'node/no-process-env': 'error',
      'no-restricted-syntax': ['error', {
        selector: '[object.type=MetaProperty][property.name=env]',
        message: 'Import meta.env directly is restricted. Use instead import { env } from "lib/env.ts".',
      }]
    },
  },
]
