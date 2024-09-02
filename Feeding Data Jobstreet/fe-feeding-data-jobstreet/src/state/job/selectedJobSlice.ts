import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JobData } from "../../typeDef";

interface SelectedJobState {
  selectedJob: JobData | undefined;
}

const initialState: SelectedJobState = {
  selectedJob: undefined,
};

const selectedJobSlice = createSlice({
  name: "selectedJob",
  initialState: initialState,
  reducers: {
    selectJob: (state, action: PayloadAction<JobData>) => {
      state.selectedJob = action.payload;
    },
    cleanSelectedJob: (state) => {
      state.selectedJob = undefined;
    },
  },
});

export default selectedJobSlice.reducer;
export const { selectJob, cleanSelectedJob } = selectedJobSlice.actions;
