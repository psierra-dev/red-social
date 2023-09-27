"use client";
import { createContext, useReducer, useEffect } from "react";
import { TNotification } from "../types/notification";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type NotificationsContextProp = {
  notifications: TNotification[];
  count: number;
};
export const NotificationsContext = createContext<NotificationsContextProp>(
  {} as NotificationsContextProp
);
export const NotificationsDispatchContext =
  createContext<React.Dispatch<NotificationAction> | null>(null);

const initialNotifications: NotificationsContextProp = {
  notifications: [],
  count: 0,
};
export function NotificationsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, dispatch] = useReducer(
    notificationsReducer,
    initialNotifications
  );

  const supabase = createClientComponentClient();

  /*useEffect(() => {
    const chanel = supabase
      .channel("schema-db-change")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
        },
        (payload) => {
          console.log(payload.errors);
          if (payload.errors === null) {
            dispatch({ type: "ADD_NOTIFICATION", payload: 1 });
          }
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(chanel);
    };
  }, [supabase]);*/

  return (
    <NotificationsContext.Provider value={notifications}>
      <NotificationsDispatchContext.Provider value={dispatch}>
        {children}
      </NotificationsDispatchContext.Provider>
    </NotificationsContext.Provider>
  );
}

type NotificationAction =
  | { type: "SET_NOTIFICATIONS"; payload: number }
  | { type: "DELETE_NOTIFICATION"; payload: number }
  | { type: "ADD_NOTIFICATION"; payload: 1 }
  | { type: "DELETE_NOTIFICATION"; payload: 0 };

function notificationsReducer(
  state: NotificationsContextProp,
  action: NotificationAction
) {
  switch (action.type) {
    case "SET_NOTIFICATIONS":
      return {
        ...state,
        count: action.payload,
      };
    case "ADD_NOTIFICATION":
      return {
        ...state,
        count: state.count + 1,
      };
    case "DELETE_NOTIFICATION":
      return {
        ...state,
        count: 0,
      };
    default:
      return state;
  }
}
