import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../const";
import { JobData } from "../../typeDef";

interface JobState {
  data: JobData[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  activeFilter: number;
}

const initialState: JobState = {
  data: [],
  loading: true,
  error: null,
  totalPages: 0,
  currentPage: 0,
  activeFilter: -1,
};

export const fetchData = createAsyncThunk(
  "job/fetchData",
  async ({ page, activeFilter }: { page: number; activeFilter: number }) => {
    const params = {
      params:
        activeFilter == -1
          ? {
              page: page,
              size: 15,
            }
          : {
              page: page,
              size: 15,
              tagId: activeFilter,
            },
    };

    const response = await axios.get(base_url + "job", params);
    return response.data;
  }
);

export const deleteData = createAsyncThunk(
  "job/deleteData",
  async (id: string) => {
    const response = await axios.delete(base_url + "job/" + id);
    return response.data;
  }
);

const jobSlice = createSlice({
  name: "job",
  initialState: initialState,
  reducers: {
    // Page related
    nextPage: (state) => {
      state.currentPage =
        state.currentPage != state.totalPages - 1
          ? state.currentPage + 1
          : state.currentPage;
    },
    prevPage: (state) => {
      state.currentPage =
        state.currentPage != 0 ? state.currentPage - 1 : state.currentPage;
    },
    toPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },

    // Filter related
    changeFilter: (state, action: PayloadAction<number>) => {
      state.currentPage = 0;
      state.activeFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.content;
        state.currentPage = action.payload.pageable.pageNumber;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchData.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.error.message || "Failed to fetch job data");
      });
  },
});

export default jobSlice.reducer;
export const { nextPage, prevPage, toPage, changeFilter } = jobSlice.actions;
