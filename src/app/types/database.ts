export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      followed: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      followers: {
        Row: {
          created_at: string
          followers_id: string | null
          id: number
          owner_id: string | null
        }
        Insert: {
          created_at?: string
          followers_id?: string | null
          id?: number
          owner_id?: string | null
        }
        Update: {
          created_at?: string
          followers_id?: string | null
          id?: number
          owner_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "followers_followers_id_fkey"
            columns: ["followers_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "followers_owner_id_fkey"
            columns: ["owner_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      friends: {
        Row: {
          created_at: string
          id: number
          user_one: string | null
          user_two: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          user_one?: string | null
          user_two?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          user_one?: string | null
          user_two?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "friends_user_one_fkey"
            columns: ["user_one"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "friends_user_two_fkey"
            columns: ["user_two"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      likes: {
        Row: {
          created_at: string
          id: number
          post_id: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          post_id?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          post_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "likes_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      message: {
        Row: {
          created_at: string
          id: number
          message: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          message?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          message?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      posts: {
        Row: {
          content: string | null
          created_at: string
          id: number
          image_url: string | null
          likes: []
          user_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: number
          image_url?: string | null
          likes?: number
          user_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: number
          image_url?: string | null
          likes?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string
          id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name: string
          id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
