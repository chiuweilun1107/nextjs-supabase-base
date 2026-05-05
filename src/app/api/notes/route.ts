// GET /api/notes    — 列出自己的 notes（分頁）
// POST /api/notes   — 新增 note
//
// 這個檔案是「萬用 CRUD 模板」的起點。
// 開新 entity 時：把整個 api/notes/ 資料夾複製為 api/{your-entity}/，
// 然後把所有 "note" / "notes" 替換成你的 entity 名稱。

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireUser } from '@/lib/api/auth'
import { parseBody, parseQuery, paginationSchema } from '@/lib/api/validation'
import { errors } from '@/lib/api/errors'
import { logger, requestId } from '@/lib/api/logger'
import { createNoteSchema } from '@/lib/schemas/note'

export async function GET(request: NextRequest) {
  const rid = requestId()
  const auth = await requireUser()
  if (!auth.ok) return auth.response

  const queryResult = parseQuery(request.nextUrl.searchParams, paginationSchema)
  if (!queryResult.success) return queryResult.response

  const page = queryResult.data.page ?? 1
  const limit = queryResult.data.limit ?? 20
  const from = (page - 1) * limit
  const to = from + limit - 1

  const supabase = await createClient()
  const { data, error, count } = await supabase
    .from('notes')
    .select('*', { count: 'exact' })
    .eq('user_id', auth.user.id)
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) {
    logger.error('notes.list failed', { rid, error: error.message })
    return errors.internal()
  }

  logger.info('notes.list', { rid, userId: auth.user.id, page, limit, count })
  return NextResponse.json({ data, meta: { page, limit, total: count ?? 0 } })
}

export async function POST(request: NextRequest) {
  const rid = requestId()
  const auth = await requireUser()
  if (!auth.ok) return auth.response

  const bodyResult = await parseBody(request, createNoteSchema)
  if (!bodyResult.success) return bodyResult.response

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('notes')
    .insert({ ...bodyResult.data, user_id: auth.user.id })
    .select()
    .single()

  if (error) {
    logger.error('notes.create failed', { rid, error: error.message })
    return errors.internal()
  }

  logger.info('notes.create', { rid, userId: auth.user.id, noteId: data.id })
  return NextResponse.json({ data }, { status: 201 })
}
