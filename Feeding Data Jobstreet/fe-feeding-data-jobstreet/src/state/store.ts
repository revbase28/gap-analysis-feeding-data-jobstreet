import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./job/jobSlice";
import jobTagReducer from "./jobTag/jobTagSlice";
import exportJobReducer from "./job/exportJobSlice";
import dialogReducer from "./dialog/dialogSlice";

export const store = configureStore({
  reducer: {
    job: jobReducer,
    jobTag: jobTagReducer,
    exportJob: exportJobReducer,
    dialog: dialogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
