import { z } from 'zod'

export const createNoteSchema = z.object({
  title: z.string().min(1, '標題必填').max(200, '標題最多 200 字'),
  content: z.string().optional(),
})

export const updateNoteSchema = createNoteSchema.partial()

export type CreateNoteInput = z.infer<typeof createNoteSchema>
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>
