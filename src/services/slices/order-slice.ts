import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export type TOrderState = {
  isLoading: boolean;
  data: TOrder | null;
  error: string | null | undefined;
};

export const initialState: TOrderState = {
  isLoading: false,
  data: null,
  error: null
};

export const fetchOrderBurgerApi = createAsyncThunk(
  'order/orderBurger',
  async (order: string[]) => orderBurgerApi(order)
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.data = null;
    }
  },
  selectors: {
    getIsLoadingOrderSelector: (state) => state.isLoading,
    getOrderDataSelector: (state) => state.data
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderBurgerApi.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderBurgerApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOrderBurgerApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload.order;
      });
  }
});

export default orderSlice.reducer;
export const { clearOrder } = orderSlice.actions;
export const { getIsLoadingOrderSelector, getOrderDataSelector } =
  orderSlice.selectors;
