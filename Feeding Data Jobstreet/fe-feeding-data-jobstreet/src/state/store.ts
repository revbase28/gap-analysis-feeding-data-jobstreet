import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./job/jobSlice";
import jobTagReducer from "./jobTag/jobTagSlice";

export const store = configureStore({
  reducer: {
    job: jobReducer,
    jobTag: jobTagReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
