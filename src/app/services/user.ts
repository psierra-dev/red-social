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

    
    async findUserName(user: string) {
      const { data , error } = await this.supabase.from("users").select('user_name').eq('user_name', user).limit(1).single()

      const user_name = data?.user_name
      return {user_name , error}
    }
    
    async getUser(user_name?: string){
        const userAuth = await this.auth.getUser();
        const search = user_name ? {key: 'user_name', value: user_name} : {key: 'id',value:userAuth?.id as string};
        const { data, error } = await this.supabase.from("users").select().eq(search.key, search.value).limit(1).single()
        
        return {data, error}
    }


    async uploadImage(user_id: string, file: File) {
      const idImage = uuidv4();
      const { data } = await this.supabase.storage
        .from("avatar")
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