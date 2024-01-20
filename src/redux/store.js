import { configureStore } from "@reduxjs/toolkit";

//Reducers
import authSlice from "./reducers/Authentication";
import notificationSlice from "./reducers/Notification";
import todoSlice from "./reducers/Todo";
import drawerSlice from "./reducers/Drawer";
import demoSlice from "./reducers/Demo";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    notif: notificationSlice,
    todo: todoSlice,
    drawer: drawerSlice,
    demo: demoSlice,
  },
  devTools: process.env.NODE_ENV === "development",
});
