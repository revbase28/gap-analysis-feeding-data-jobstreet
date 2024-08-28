import { createSlice } from "@reduxjs/toolkit";

interface GenerateJobDialogState {
  isGenerateJobDialogShown: boolean;
  isEditJobDialogShown: boolean;
  isAddJobDialogShown: boolean;
}

const initialState: GenerateJobDialogState = {
  isGenerateJobDialogShown: false,
  isAddJobDialogShown: true,
  isEditJobDialogShown: false,
};

export const dialogSlice = createSlice({
  name: "dialogSlice",
  initialState: initialState,
  reducers: {
    openGenerateJobDialog: (state) => {
      state.isGenerateJobDialogShown = true;
    },
    closeGenerateJobDialog: (state) => {
      state.isGenerateJobDialogShown = false;
    },
    openAddJobDialog: (state) => {
      state.isAddJobDialogShown = true;
    },
    closeAddJobDialog: (state) => {
      state.isAddJobDialogShown = false;
    },
    openEditJobDialog: (state) => {
      state.isEditJobDialogShown = true;
    },
    closeEditJobDialog: (state) => {
      state.isEditJobDialogShown = false;
    },
  },
});

export default dialogSlice.reducer;
export const {
  openGenerateJobDialog,
  closeGenerateJobDialog,
  openAddJobDialog,
  closeAddJobDialog,
  openEditJobDialog,
  closeEditJobDialog,
} = dialogSlice.actions;
