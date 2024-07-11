import { SupabaseClient } from "@supabase/supabase-js"
import AuthService from "./auth"
import { Database } from "../types/database"


class NotificationService {
    private supabase: SupabaseClient<Database>
    private auth: AuthService
    constructor(client: SupabaseClient<Database>) {
        this.auth = new AuthService(client)
        this.supabase = client
    }

    async getAll() {
        const user = await this.auth.getUser()
        const {data, error} = await this.supabase.from('notifications').select(`
        *,
        from:emisor_id(*),
        to:receptor_id(*)
      `)
      .eq('receptor_id', user?.id as string)
      .order("created_at", { ascending: false })

        return {data, error}
    }

    async add({...prop}) {
        const user = await this.auth.getUser()

        if(prop.receptor_id === user?.id) {
            console.log('null, notifications add')
            return null
        }
        const {data, error} = await this.supabase.from('notifications').insert({
            ...prop,
            read: false,
            emisor_id: user?.id
        })
    
        return {data, error}
    }

    async count() {
        const user = await this.auth.getUser()

        const {data, error} = await this.supabase.from('notifications').select('*').eq('receptor_id', user?.id as string).eq('show', false)
        
       
        let count = data?.length
      return {count, error}
    }
}

export default NotificationService