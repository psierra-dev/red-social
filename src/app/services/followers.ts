import AuthService from "./auth";

import { SupabaseClient } from "@supabase/supabase-js"
import { Database } from "../types/database"



export default class FollowersService {
    private supabase
    private auth: AuthService
    constructor(client: SupabaseClient<Database>){
      this.supabase = client;
      this.auth = new AuthService(client)
    }
    

    async add(followers_id: string) {
        const user = await this.auth.getUser()

       const {data, error} = await this.supabase.from('followers').insert({
            followers_id,
            owner_id: user?.id
        })

        return {data, error}
    }
    async getFollwing(user_id?: string){
        const { data: following, error } = await this.supabase
        .from("followers")
        .select()
        .eq("followers_id", user_id as string);

        return {following, error}
    }
    async getFollwed(user_id?: string){
        const { data: followed, error } = await this.supabase
        .from("followers")
        .select()
        .eq("owner_id", user_id as string);

        return {followed, error}
    }
    async getFollwedId(user_id?: string){
        const { data: followed, error } = await this.supabase
        .from("followers")
        .select("followers_id")
        .eq("owner_id", user_id as string);

        const followedId = followed?.map(f => f.followers_id)
        return {followedId, error}
    }
}