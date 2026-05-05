// POST /api/attachments  — 上傳檔案（multipart/form-data，欄位名：file）
// GET  /api/attachments  — 列出自己的附件

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireUser } from '@/lib/api/auth'
import { errors } from '@/lib/api/errors'
import { logger, requestId } from '@/lib/api/logger'
import { randomUUID } from 'crypto'

const BUCKET = 'attachments'
const MAX_SIZE = 10 * 1024 * 1024 // 10 MB

export async function GET(request: NextRequest) {
  const rid = requestId()
  const auth = await requireUser()
  if (!auth.ok) return auth.response

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('attachments')
    .select('*')
    .eq('user_id', auth.user.id)
    .order('created_at', { ascending: false })

  if (error) {
    logger.error('attachments.list failed', { rid, error: error.message })
    return errors.internal()
  }

  return NextResponse.json({ data })
}

export async function POST(request: NextRequest) {
  const rid = requestId()
  const auth = await requireUser()
  if (!auth.ok) return auth.response

  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return errors.validation('請求必須是 multipart/form-data')
  }

  const file = formData.get('file')
  if (!(file instanceof File)) {
    return errors.validation('請上傳欄位名為 "file" 的檔案')
  }

  if (file.size > MAX_SIZE) {
    return errors.validation(`檔案大小不得超過 ${MAX_SIZE / 1024 / 1024} MB`)
  }

  const fileExt = file.name.split('.').pop() ?? 'bin'
  const storagePath = `${auth.user.id}/${randomUUID()}.${fileExt}`

  const supabase = await createClient()

  // 上傳到 Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, file, { contentType: file.type })

  if (uploadError) {
    logger.error('attachments.upload storage failed', { rid, error: uploadError.message })
    return errors.internal('檔案上傳失敗')
  }

  // 寫入 DB
  const { data, error: dbError } = await supabase
    .from('attachments')
    .insert({
      user_id: auth.user.id,
      file_name: file.name,
      storage_path: storagePath,
      mime_type: file.type || 'application/octet-stream',
      size_bytes: file.size,
    })
    .select()
    .single()

  if (dbError) {
    logger.error('attachments.upload db failed', { rid, error: dbError.message })
    // 回滾：刪除已上傳的 storage 檔
    await supabase.storage.from(BUCKET).remove([storagePath])
    return errors.internal()
  }

  logger.info('attachments.upload', { rid, attachmentId: data.id, size: file.size })
  return NextResponse.json({ data }, { status: 201 })
}
