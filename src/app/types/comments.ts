import { Database } from "./database";
import { User } from "./user";

export type CommentEnty = Database['public']['Tables']['comments']['Row']
export type Comment = CommentEnty & {
    users: User
}