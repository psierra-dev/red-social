import { SupabaseClient } from "@supabase/supabase-js"

export default class AuthService {
    private supabase: SupabaseClient
    constructor(client: SupabaseClient) {
        this.supabase = client
    }

    async login(data: any) {
        const {data: response, error} = await this.supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
          });

        return { response, error }
    }

    async register(data: any) {
        const newData = {
            email: data.email,
            password: data.password,
            options: {
              data: {
                full_name: data.fullName,
                user_name: data.usuario,
                avatar_url: "",
              },
            },
          }

          const {data: response, error} = await this.supabase.auth.signUp(newData)

          return {response, error}
    }

    async getUser() {
        const {data: {user}, error} = await this.supabase.auth.getUser()
        return user
    }
    
    
}