import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "./features/course-slice";

export const store = configureStore({
  reducer: {
    courseReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
