import { Database } from "./database";
import { Likes } from "./likes";
import { User } from "./user";

type Count = {
    count: number
}[]
export type PostEnty = Database['public']['Tables']['posts']['Row']
export type Post = PostEnty & {
    users: User,
    likes: Count
    comments: Count
}