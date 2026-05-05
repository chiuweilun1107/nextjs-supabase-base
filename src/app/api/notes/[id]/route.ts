// GET    /api/notes/[id]  — 取得單筆 note
// PATCH  /api/notes/[id]  — 修改 note
// DELETE /api/notes/[id]  — 刪除 note

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireUser } from '@/lib/api/auth'
import { parseBody } from '@/lib/api/validation'
import { errors } from '@/lib/api/errors'
import { logger, requestId } from '@/lib/api/logger'
import { updateNoteSchema } from '@/lib/schemas/note'

type Params = { params: Promise<{ id: string }> }

export async function GET(_request: NextRequest, { params }: Params) {
  const rid = requestId()
  const auth = await requireUser()
  if (!auth.ok) return auth.response

  const { id } = await params
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('id', id)
    .eq('user_id', auth.user.id)
    .single()

  if (error || !data) {
    return errors.notFound('Note')
  }

  logger.info('notes.get', { rid, noteId: id })
  return NextResponse.json({ data })
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const rid = requestId()
  const auth = await requireUser()
  if (!auth.ok) return auth.response

  const bodyResult = await parseBody(request, updateNoteSchema)
  if (!bodyResult.success) return bodyResult.response

  const { id } = await params
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('notes')
    .update(bodyResult.data)
    .eq('id', id)
    .eq('user_id', auth.user.id)
    .select()
    .single()

  if (error || !data) {
    return errors.notFound('Note')
  }

  logger.info('notes.update', { rid, noteId: id })
  return NextResponse.json({ data })
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const rid = requestId()
  const auth = await requireUser()
  if (!auth.ok) return auth.response

  const { id } = await params
  const supabase = await createClient()
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id)
    .eq('user_id', auth.user.id)

  if (error) {
    logger.error('notes.delete failed', { rid, error: error.message })
    return errors.internal()
  }

  logger.info('notes.delete', { rid, noteId: id })
  return new NextResponse(null, { status: 204 })
}
