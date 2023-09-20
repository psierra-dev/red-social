import AuthService from "./auth";

import { SupabaseClient } from "@supabase/supabase-js"
import { Database } from "../types/database"



export default class UserService {
    private supabase
    private auth: AuthService
    constructor(client: SupabaseClient<Database>){
      this.supabase = client;
      this.auth = new AuthService(client)
    }
    
    async getUser(user_id?: string){
        const userAuth = await this.auth.getUser()
        const id = user_id || userAuth?.id
        const {data, error} = await this.supabase.from("users").select().eq('id', id as string).limit(1).single()
        
        return {data, error}
    }
}