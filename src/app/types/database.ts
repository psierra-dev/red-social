import { Likes } from "./likes"
import { User } from "./user"

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
      comments: {
        Row: {
          content: string
          created_at: string
          id: number
          post_id: number | null
          user_id: string | null
        }
        Insert: {
          content?: string
          created_at?: string
          id?: number
          post_id?: number | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: number
          post_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
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
      notifications: {
        Row: {
          created_at: string
          emisor_id: string | null
          id: number
          read: boolean | null
          receptor_id: string | null
          type: string | null,
          from: User,
          to: User,
          post_id: string | null,
          show: boolean
        }
        Insert: {
          created_at?: string
          emisor_id?: string | null
          id?: number
          read?: boolean | null
          receptor_id?: string | null
          type?: string | null
        }
        Update: {
          created_at?: string
          emisor_id?: string | null
          id?: number
          read?: boolean | null
          receptor_id?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_emisor_id_fkey"
            columns: ["emisor_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_receptor_id_fkey"
            columns: ["receptor_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      posts: {
        Row: {
          content: string | null
          create: string | null
          created_at: string
          id: number
          image_url: string | null
          user_id: string | null
          count_like: [{count: number}]
          count_comment: [{count: number}]
          likes: Likes[]
          isLike: boolean
          isOwner: boolean
        }
        Insert: {
          content?: string | null
          create?: string | null
          created_at?: string
          id?: number
          image_url?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          create?: string | null
          created_at?: string
          id?: number
          image_url?: string | null
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
