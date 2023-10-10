import AuthService from "./auth";

import { SupabaseClient } from "@supabase/supabase-js"
import { Database } from "../types/database"
import { v4 as uuidv4 } from "uuid";


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
        const { data, error } = await this.supabase.from("users").select().eq('id', id as string).limit(1).single()
        
        return {data, error}
    }


    async uploadImage(user_id: string, file: File) {
      const idImage = uuidv4();
      const { data } = await this.supabase.storage
        .from("post")
        .upload(`${user_id}/${idImage}`, file);

      const {
        data: { publicUrl },
      } = this.supabase.storage.from("avatar").getPublicUrl(data?.path as string);

      return publicUrl
  }
    async update(data_update: any, file: File | null, isChangeImage: boolean) {
      const userAuth = await this.auth.getUser();

      let avatar_url = null;
      
      if (isChangeImage && file !== null) avatar_url = await this.uploadImage(userAuth?.id as string, file);
      

      const newData =
      avatar_url === null ? data_update : { avatar_url, ...data_update };

      const { data, error } = await this.supabase.from("users").update(newData).eq('id', userAuth?.id as string)

      return {data, error}
    }
}