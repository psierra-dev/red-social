import AuthService from "./auth";

import { SupabaseClient } from "@supabase/supabase-js"
import { Database } from "../types/database"
import FollowersService from "./followers";
import { Post } from "../types/post";
import { v4 as uuidv4 } from "uuid";



export default class PostService {
    private supabase
    private auth: AuthService
    private followers: FollowersService
    constructor(client: SupabaseClient<Database>){
      this.supabase = client;
      this.auth = new AuthService(client)
      this.followers = new FollowersService(client)
    }
    
    private  post() {
        return   this.supabase.from('posts')
    }

    private async sortPost(data: any) {
        const user = await this.auth.getUser()
        
        if(data === null || data.length === 0) return []
        const posts = data.length >= 1 ? data.map((p: any) => {
            return {
                ...p,
                isLike: p.likes.some((p: any) => p.user_id  === user?.id),
                isOwner: p.user_id === user?.id
            }
        })
        : {
            ...data,
            isLike: data.likes.some((p: any) => p.user_id  === user?.id),
            isOwner: data.user_id === user?.id
        }

        return posts
    }
    async onePost(id: string) {
        
        const {data, error} = await this.post().select("*, users(*), count_like:likes(count), count_comment:comments(count), likes(*)").eq('id', id).limit(1).single()
        console.log(data, 'dataPost')
        let post
        if(data !== null){
            post = await this.sortPost(data)
        }
        return {post, error}
    }
    async getPostPerfil(userId: string){
        
        console.log(userId, 'userId')
        const { data, error } = await this.supabase
        .from("posts")
        .select("*, users(*), count_like:likes(count), count_comment:comments(count), likes(*)")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        let posts = await this.sortPost(data)
        
        console.log(posts, 'posts')
    return { posts, error }
    }
    async allPosts(user_id?: string) {
        if(user_id) {
            return this.getPostPerfil(user_id)
        }

        const userAuth = await this.auth.getUser()

        const {followedId} = await this.followers.getFollwedId(userAuth?.id)

        if((followedId && followedId?.length > 0) || userAuth?.id) {
            const { data, error } = await this.supabase
            .from("posts")
            .select("*, users(*), count_like:likes(count), count_comment:comments(count), likes(*)")
            .in("user_id", [...followedId ?? [], userAuth?.id])
            .order("created_at", { ascending: false })

            let posts = await this.sortPost(data)

            return {posts , error}
        }

        return { posts: [], error:null}
    }

    async uploadImage(user_id: string, file: File) {
        const idImage = uuidv4();
        const { data } = await this.supabase.storage
          .from("post")
          .upload(`${user_id}/${idImage}`, file);
  
        const {
          data: { publicUrl },
        } = this.supabase.storage.from("post").getPublicUrl(data?.path as string);

        return publicUrl
    }

    async add(content: string, file: File ){
        const userAuth = await this.auth.getUser()

        const image_url = await this.uploadImage(userAuth?.id as string, file);

        const {data, error} = await this.supabase
        .from("posts")
        .insert({
            content, 
            user_id: userAuth?.id, 
            image_url
        })
            .eq('id', userAuth?.id as string);
        
        return {data, error}
    }
    async delete(){
        const userAuth = await this.auth.getUser()
        const {data, error} = await this.supabase.from("users").select().eq('id', userAuth?.id as string).limit(1)
        
        return {data, error}
    }

    async like_deslike( post_id: number, type: string) {
        const userAuth = await this.auth.getUser()

        if(type === 'like'){
            const {data, error } = await this.supabase.from('likes').insert({
                "post_id": post_id,
                "user_id": userAuth?.id
            })
    
            return {data, error}
        }

        const {data, error } = await this.supabase
        .from('likes')
        .delete()
        .eq("post_id", post_id)
        .eq("user_id", userAuth?.id as string)

        return {data, error}
    }
}