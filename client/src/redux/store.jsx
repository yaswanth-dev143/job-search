import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./features/alertSlice";
import { authSLice } from "./features/auth/authSlice";

export default configureStore({
  reducer: {
    alerts: alertSlice.reducer,
    auth: authSLice.reducer,
  },
});
