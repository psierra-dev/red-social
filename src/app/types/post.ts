import { Database } from "./database";
import { Likes } from "./likes";
import { User } from "./user";

export type PostEnty = Database['public']['Tables']['posts']['Row']
export type Post = PostEnty & {
    users: User,
    likes: Likes
}