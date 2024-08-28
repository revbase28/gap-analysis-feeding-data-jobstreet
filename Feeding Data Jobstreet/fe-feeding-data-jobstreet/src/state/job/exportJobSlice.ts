import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../const";

interface ExportJobState {
  exportLoading: boolean;
  exportError: string | null;
}

const initialState: ExportJobState = {
  exportLoading: false,
  exportError: null,
};

export const exportJobToExcel = createAsyncThunk(
  "exportJob/export",
  async (filter: number) => {
    const params =
      filter != -1
        ? {
            responseType: "blob" as "blob",
            params: {
              tagId: filter,
            },
          }
        : {
            responseType: "blob" as "blob",
          };

    const response = await axios.get(base_url + "job/generate-excel", params);

    return response.data;
  }
);

const exportJobSlice = createSlice({
  name: "exportJob",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(exportJobToExcel.pending, (state) => {
        state.exportLoading = true;
        state.exportError = null;
      })
      .addCase(exportJobToExcel.fulfilled, (state, action) => {
        try {
          const url = window.URL.createObjectURL(action.payload);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "job-export.xlsx");
          document.body.appendChild(link);
          link.click();
          link.parentNode?.removeChild(link);

          state.exportLoading = false;
          state.exportError = null;
        } catch (error) {
          console.log("Error downloading file", error);
        }
      })
      .addCase(exportJobToExcel.rejected, (state, action) => {
        state.exportLoading = false;
        state.exportError =
          action.error.message || "Failed to export job to excel";
      });
  },
});

export default exportJobSlice.reducer;
