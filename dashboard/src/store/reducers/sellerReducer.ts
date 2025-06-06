import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api";

export const getSellerRequest = createAsyncThunk(
  "seller/getSellerRequest",
  async ({ perPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/request-seller-get?page=${page}&searchValue=${searchValue}&perPage=${perPage}`, {
        withCredentials: true,
      });
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSeller = createAsyncThunk(
  "seller/getSeller",
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get-seller/${sellerId}`, {
        withCredentials: true,
      });
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sellerStatusUpdate = createAsyncThunk(
  "seller/sellerStatusUpdate",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/seller-status-update`, info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getActiveSellers = createAsyncThunk(
  "seller/getActiveSellers",
  async ({ perPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get-sellers?page=${page}&searchValue=${searchValue}&perPage=${perPage}`, {
        withCredentials: true,
      });
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDeactiveSellers = createAsyncThunk(
  "seller/getDeactiveSellers",
  async ({ perPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/get-deactive-sellers?page=${page}&searchValue=${searchValue}&perPage=${perPage}`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createStripeConnectAccount = createAsyncThunk("seller/createStripeConnectAccount", async () => {
  try {
    const {
      data: { url },
    } = await api.get(`/payment/create-stripe-connect-account`, {
      withCredentials: true,
    });
    window.location.href = url;
  } catch (error) {
    console.log(error);
  }
});

export const sellerReducer = createSlice({
  name: "seller",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    sellers: [],
    totalSeller: 0,
    seller: "",
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSellerRequest.fulfilled, (state, { payload }) => {
        state.sellers = payload.sellers;
        state.totalSeller = payload.totalSeller;
      })
      .addCase(getSeller.fulfilled, (state, { payload }) => {
        state.seller = payload.seller;
      })
      .addCase(sellerStatusUpdate.fulfilled, (state, { payload }) => {
        state.seller = payload.seller;
        state.successMessage = payload.message;
      })
      .addCase(getActiveSellers.fulfilled, (state, { payload }) => {
        state.sellers = payload.sellers;
        state.totalSeller = payload.totalSeller;
      })
      .addCase(getDeactiveSellers.fulfilled, (state, { payload }) => {
        state.sellers = payload.sellers;
        state.totalSeller = payload.totalSeller;
      });
  },
});

export const { messageClear } = sellerReducer.actions;
export default sellerReducer.reducer;
