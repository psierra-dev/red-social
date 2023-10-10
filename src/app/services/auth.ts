import { SupabaseClient } from "@supabase/supabase-js"

export default class AuthService {
    private supabase: SupabaseClient
    constructor(client: SupabaseClient) {
        this.supabase = client
    }

    async signUp(data: any) {
        
    }

    async getUser() {
        const {data: {user}, error} = await this.supabase.auth.getUser()
        return user
    }
    
    
}