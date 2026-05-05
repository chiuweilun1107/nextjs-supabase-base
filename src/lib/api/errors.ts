import { NextResponse } from 'next/server'

export type ApiError = {
  error: {
    code: string
    message: string
    details?: unknown
  }
}

export function apiError(
  code: string,
  message: string,
  status: number,
  details?: unknown
): NextResponse<ApiError> {
  return NextResponse.json({ error: { code, message, details } }, { status })
}

export const errors = {
  unauthorized: () => apiError('UNAUTHORIZED', '請先登入', 401),
  forbidden: () => apiError('FORBIDDEN', '權限不足', 403),
  notFound: (resource = '資源') => apiError('NOT_FOUND', `${resource}不存在`, 404),
  validation: (details: unknown) => apiError('VALIDATION_ERROR', '資料格式錯誤', 422, details),
  internal: (message = '伺服器錯誤') => apiError('INTERNAL_ERROR', message, 500),
  conflict: (message = '資料衝突') => apiError('CONFLICT', message, 409),
}
