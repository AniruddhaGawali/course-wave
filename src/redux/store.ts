import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "./features/course-slice";
import userReducer from "./features/user-slice";

export const store = configureStore({
  reducer: {
    courseReducer,
    userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
