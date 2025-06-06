import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api";

export const categoryAdd = createAsyncThunk(
  "category/categoryAdd",
  async ({ name, image }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      const { data } = await api.post("/category-add", formData, { withCredentials: true });
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const categoryEdit = createAsyncThunk(
  "category/categoryEdit",
  async ({ name, image, id }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      const { data } = await api.patch(`/category-edit/${id}`, formData, { withCredentials: true });
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCategory = createAsyncThunk(
  "category/getCategory",
  async ({ perPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/category-get?page=${page}&searchValue=${searchValue}&perPage=${perPage}`, {
        withCredentials: true,
      });
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const categoryReducer = createSlice({
  name: "category",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    categories: [],
    totalCategory: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(categoryAdd.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(categoryAdd.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(categoryAdd.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.categories = [...state.categories, payload.category];
      })
      .addCase(categoryEdit.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        const replacedCategories = state.categories.map((e) => {
          if (payload.category._id === e._id) {
            return payload.category;
          }
          return e;
        });
        state.categories = replacedCategories;
      })
      .addCase(getCategory.fulfilled, (state, { payload }) => {
        state.totalCategory = payload.totalCategory;
        state.categories = payload.categories;
      });
  },
});

export const { messageClear } = categoryReducer.actions;
export default categoryReducer.reducer;
