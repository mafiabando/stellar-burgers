import { getFeedsApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';

export type TFeedsState = {
  data: TOrdersData;
  orderByNumber: TOrder[] | [];
  error: string | null | undefined;
};

export const initialState: TFeedsState = {
  data: {
    orders: [],
    total: NaN,
    totalToday: NaN
  },
  orderByNumber: [],
  error: null
};

export const fetchFeedsApi = createAsyncThunk('feeds/getAllFeeds', async () =>
  getFeedsApi()
);

export const fetchOrderByNumberApi = createAsyncThunk(
  'feeds/getOrder',
  async (number: number) => getOrderByNumberApi(number)
);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getFeedsDataSelector: (state) => state.data?.orders,
    getOrderByNumberSelector: (state) => state.orderByNumber,
    getTotalSelector: (state) => state.data.total,
    getTotalTodaySelector: (state) => state.data.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedsApi.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchFeedsApi.rejected, (state, action) => {
        state.error = action.error.message
      })
      .addCase(fetchFeedsApi.fulfilled, (state, action) => {
        state.error = null;
        state.data = {
          orders: action.payload.orders,
          total: action.payload.total,
          totalToday: action.payload.totalToday
        };
      })
      .addCase(fetchOrderByNumberApi.pending, (state) => {
        state.error = null;

      })
      .addCase(fetchOrderByNumberApi.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchOrderByNumberApi.fulfilled, (state, action) => {
        state.error = null;
        state.orderByNumber = action.payload.orders;
      });
  }
});

export default feedsSlice.reducer;
export const { getFeedsDataSelector, getOrderByNumberSelector, getTotalSelector, getTotalTodaySelector } =
  feedsSlice.selectors;




  