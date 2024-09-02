import { createSlice } from "@reduxjs/toolkit";

interface GenerateJobDialogState {
  isGenerateJobDialogShown: boolean;
  isEditJobDialogShown: boolean;
  isAddJobDialogShown: boolean;
  isDeleteConfirmatioDialogShown: boolean;
  isDetailJobDialogShown: boolean;
}

const initialState: GenerateJobDialogState = {
  isGenerateJobDialogShown: false,
  isAddJobDialogShown: false,
  isEditJobDialogShown: false,
  isDeleteConfirmatioDialogShown: false,
  isDetailJobDialogShown: false,
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
    openDeleteConfirmationDialog: (state) => {
      state.isDeleteConfirmatioDialogShown = true;
    },
    closeDeleteConfirmationDialog: (state) => {
      state.isDeleteConfirmatioDialogShown = false;
    },
    openDetailJobDialog: (state) => {
      state.isDetailJobDialogShown = true;
    },
    closeDetailJobDialog: (state) => {
      state.isDetailJobDialogShown = false;
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
  openDeleteConfirmationDialog,
  closeDeleteConfirmationDialog,
  openDetailJobDialog,
  closeDetailJobDialog,
} = dialogSlice.actions;
