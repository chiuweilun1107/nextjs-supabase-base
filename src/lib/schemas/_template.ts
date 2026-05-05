// 複製這個檔案來建立新 entity 的 zod schema
// 使用方式：把 "example" 換成你的 entity 名稱
//
// 完整範例：參考 note.ts

import { z } from 'zod'

export const createExampleSchema = z.object({
  title: z.string().min(1, '標題必填').max(200, '標題最多 200 字'),
  content: z.string().optional(),
})

export const updateExampleSchema = createExampleSchema.partial()

export type CreateExampleInput = z.infer<typeof createExampleSchema>
export type UpdateExampleInput = z.infer<typeof updateExampleSchema>
