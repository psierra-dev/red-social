import AuthService from "./auth";

import { SupabaseClient } from "@supabase/supabase-js"
import { Database } from "../types/database"
import FollowersService from "./followers";




export default class PostService {
    private supabase
    private auth: AuthService
    private followers: FollowersService
    constructor(client: SupabaseClient<Database>){
      this.supabase = client;
      this.auth = new AuthService(client)
      this.followers = new FollowersService(client)
    }
    
    async getPostPerfil(userId: string){
        const { data, error } = await this.supabase
        .from("posts")
        .select("*, users(*), likes(count), comments(count)")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })


    return {data, error}
    }
    async allPosts(){
        const userAuth = await this.auth.getUser()

        const {followedId} = await this.followers.getFollwedId(userAuth?.id)

        if(followedId && followedId?.length > 0) {
            const { data, error } = await this.supabase
            .from("posts")
            .select("*, users(*), comments(count), likes(count)")
            .in("user_id", followedId)
            .order("created_at", { ascending: false })

            return {data , error}
        }

        return { data: [], error:null}
    }
    async add(){
        const userAuth = await this.auth.getUser()
        const {data, error} = await this.supabase.from("users").select().eq('id', userAuth?.id as string).limit(1)
        
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