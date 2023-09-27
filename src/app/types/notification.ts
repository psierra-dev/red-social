import { Database } from "./database";
import { User } from "./user";

export type NotificationsEmty = Database['public']['Tables']['notifications']['Row']
export type TNotification = NotificationsEmty & {
    from: User,
    to: User
}