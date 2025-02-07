import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export type TIngredientsState = {
  isLoading: boolean;
  data: TIngredient[];
  error: string | null | undefined;
};

export const initialState: TIngredientsState = {
  isLoading: false,
  data: [],
  error: null
};

export const fetchIngredientsApi = createAsyncThunk(
  'ingredients/getAllIngredients',
  async () => getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIsLoadingIngredientsSelector: (state) => state.isLoading,
    getIngredientsDataSelector: (state) => state.data
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsApi.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredientsApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchIngredientsApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      });
  }
});

export default ingredientsSlice.reducer;
export const { getIsLoadingIngredientsSelector, getIngredientsDataSelector } =
  ingredientsSlice.selectors;
