// GET    /api/attachments/[id]  — 取得 signed URL（60 分鐘有效）
// DELETE /api/attachments/[id]  — 刪除附件（含 storage 檔案）

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireUser } from '@/lib/api/auth'
import { errors } from '@/lib/api/errors'
import { logger, requestId } from '@/lib/api/logger'

const BUCKET = 'attachments'
const SIGNED_URL_EXPIRES = 60 * 60 // 1 小時

type Params = { params: Promise<{ id: string }> }

export async function GET(_request: NextRequest, { params }: Params) {
  const rid = requestId()
  const auth = await requireUser()
  if (!auth.ok) return auth.response

  const { id } = await params
  const supabase = await createClient()

  const { data: attachment, error } = await supabase
    .from('attachments')
    .select('*')
    .eq('id', id)
    .eq('user_id', auth.user.id)
    .single()

  if (error || !attachment) {
    return errors.notFound('Attachment')
  }

  const { data: signedData, error: signedError } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(attachment.storage_path, SIGNED_URL_EXPIRES)

  if (signedError || !signedData) {
    logger.error('attachments.signedUrl failed', { rid, error: signedError?.message })
    return errors.internal('無法取得下載連結')
  }

  return NextResponse.json({
    data: { ...attachment, signed_url: signedData.signedUrl },
  })
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const rid = requestId()
  const auth = await requireUser()
  if (!auth.ok) return auth.response

  const { id } = await params
  const supabase = await createClient()

  const { data: attachment, error } = await supabase
    .from('attachments')
    .select('storage_path')
    .eq('id', id)
    .eq('user_id', auth.user.id)
    .single()

  if (error || !attachment) {
    return errors.notFound('Attachment')
  }

  // 先刪 storage，再刪 DB
  await supabase.storage.from(BUCKET).remove([attachment.storage_path])

  const { error: dbError } = await supabase
    .from('attachments')
    .delete()
    .eq('id', id)
    .eq('user_id', auth.user.id)

  if (dbError) {
    logger.error('attachments.delete db failed', { rid, error: dbError.message })
    return errors.internal()
  }

  logger.info('attachments.delete', { rid, attachmentId: id })
  return new NextResponse(null, { status: 204 })
}
