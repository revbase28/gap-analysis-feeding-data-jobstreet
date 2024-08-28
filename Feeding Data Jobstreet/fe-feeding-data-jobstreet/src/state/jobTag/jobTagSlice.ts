import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { JobTag } from "../../typeDef";
import axios from "axios";
import { base_url } from "../../const";

interface JobTagState {
  data: JobTag[];
  loading: boolean;
  error: string | null;
}

const initialState: JobTagState = {
  data: [],
  loading: true,
  error: null,
};

export const fetchJobTagData = createAsyncThunk(
  "jobTag/fetchJobTagData",
  async () => {
    const response = await axios.get(base_url + "tags");
    return response.data;
  }
);

const jobTagSlice = createSlice({
  name: "jobTag",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobTagData.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchJobTagData.fulfilled, (state, action) => {
        (state.loading = false), (state.data = action.payload);
      })
      .addCase(fetchJobTagData.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.error.message || "Failed to fetch job data");
      });
  },
});

export default jobTagSlice.reducer;
