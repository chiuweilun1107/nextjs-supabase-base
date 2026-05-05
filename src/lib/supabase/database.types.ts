// 這個檔案由 `npm run db:types` 自動產生，請勿手動修改。
// 執行指令：npm run db:types（需先啟動 supabase local 或連遠端 project）

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          display_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          display_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          display_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      notes: {
        Row: {
          id: string
          user_id: string
          title: string
          content: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          content?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          content?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      attachments: {
        Row: {
          id: string
          user_id: string
          file_name: string
          storage_path: string
          mime_type: string
          size_bytes: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          file_name: string
          storage_path: string
          mime_type: string
          size_bytes: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          file_name?: string
          storage_path?: string
          mime_type?: string
          size_bytes?: number
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: { [_ in never]: never }
    CompositeTypes: { [_ in never]: never }
  }
}
