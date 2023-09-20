import { SupabaseClient} from "@supabase/auth-helpers-nextjs"
import AuthService from "./auth"
import { Database } from "../types/database"

export default class CommetsService {
    private supabase: SupabaseClient<Database>
    private auth: AuthService
    constructor(client: SupabaseClient<Database>) {
        this.auth = new AuthService(client)
        this.supabase = client
    }

    async get(post_id: string) {
        const {data, error, count} = await this.supabase
        .from("comments")
        .select('* , users(*)')
        .eq("post_id", post_id)
        .order("created_at", { ascending: false })
        return {data, error}   
    }
    async add(post_id: string | number, content: string) {
        const user = await this.auth.getUser()
        const {data, error} = await this.supabase.from("comments").insert({
            "post_id": post_id as number ,
            "content":content,
            "user_id": user?.id 
        }).select('*, users(*)').limit(1).single()

        return {data, error}
    }

    async delete(comment_id: number) {
        const {data, error} = await this.supabase.from("comments").delete().eq("id", comment_id)

        return {data,  error}
    }

    async count(post_id: number) {
        const {data,count, error} = await this.supabase.from("comments").select('*', {count: 'exact', head: true}).eq("post_id", post_id)
        return {count, error, data}
    }

    
}