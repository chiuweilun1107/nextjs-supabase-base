import { z, ZodSchema } from 'zod'
import { NextResponse } from 'next/server'
import { errors } from './errors'

type ParseResult<T> =
  | { success: true; data: T }
  | { success: false; response: NextResponse }

export async function parseBody<T>(
  request: Request,
  schema: ZodSchema<T>
): Promise<ParseResult<T>> {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return { success: false, response: errors.validation('請求 body 必須是 JSON') }
  }

  const result = schema.safeParse(body)
  if (!result.success) {
    return {
      success: false,
      response: errors.validation(result.error.flatten().fieldErrors),
    }
  }
  return { success: true, data: result.data }
}

export function parseQuery<T>(
  searchParams: URLSearchParams,
  schema: ZodSchema<T>
): ParseResult<T> {
  const raw = Object.fromEntries(searchParams.entries())
  const result = schema.safeParse(raw)
  if (!result.success) {
    return {
      success: false,
      response: errors.validation(result.error.flatten().fieldErrors),
    }
  }
  return { success: true, data: result.data }
}

// pagination 常用 query schema
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
})
