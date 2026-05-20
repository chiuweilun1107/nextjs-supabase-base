import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const compat = new FlatCompat({ baseDirectory: __dirname })

// 痛點二 規則 A 的結構化強制：禁止手刻裸互動元件，一律用 shadcn/ui。
// components/ui/** 例外 —— 那裡是 shadcn 元件本體，本來就用裸 HTML 元素。
const BARE_ELEMENT_RULES = [
  {
    selector: "JSXOpeningElement[name.name='button']",
    message: 'Use <Button> from @/components/ui/button instead of bare <button>.',
  },
  {
    selector: "JSXOpeningElement[name.name='input']",
    message: 'Use <Input> from @/components/ui/input instead of bare <input>.',
  },
  {
    selector: "JSXOpeningElement[name.name='select']",
    message: 'Use <Select> from @/components/ui/select instead of bare <select>.',
  },
  {
    selector: "JSXOpeningElement[name.name='textarea']",
    message: 'Use <Textarea> from @/components/ui/textarea instead of bare <textarea>.',
  },
]

export default [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'],
  },
  // 規則 A 強制：所有 src 下的 .tsx 禁裸互動元件（components/ui/ 本體例外）
  {
    files: ['src/**/*.tsx'],
    ignores: ['src/components/ui/**/*.tsx'],
    rules: {
      'no-restricted-syntax': ['error', ...BARE_ELEMENT_RULES],
    },
  },
]
