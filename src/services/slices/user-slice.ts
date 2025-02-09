import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  TLoginData,
  TRegisterData,
  loginUserApi,
  registerUserApi,
  resetPasswordApi,
  forgotPasswordApi,
  logoutApi,
  updateUserApi,
  getOrdersApi,
  getUserApi
} from '@api';
import { TOrder, TUser } from '@utils-types';
import { setCookie, deleteCookie } from '../../utils/cookie';

export type userState = {
  isLoading: boolean;
  isAuthenticated: boolean;
  data: TUser | null;
  orders: TOrder[] | [];
  error: string | null | undefined;
};

export const initialState: userState = {
  isLoading: false,
  isAuthenticated: false,
  data: null,
  orders: [],
  error: null
};

export const fetchLoginUserApi = createAsyncThunk(
  'user/loginUser',
  async (loginUserData: TLoginData) => {
    const data = await loginUserApi(loginUserData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const fetchRegisterUserApi = createAsyncThunk(
  'user/registerUser',
  async (registerUserData: TRegisterData) => {
    const data = await registerUserApi(registerUserData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const fetchResetPasswordApi = createAsyncThunk(
  'user/resetPassword',
  async (data: { password: string; token: string }) => resetPasswordApi(data)
);

export const fetchForgotPasswordApi = createAsyncThunk(
  'user/forgotPassword',
  async (data: { email: string }) => forgotPasswordApi(data)
);

export const fetchLogoutApi = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

export const fetchUpdateUserApi = createAsyncThunk(
  'user/update',
  async (updateUserData: Partial<TRegisterData>) =>
    updateUserApi(updateUserData)
);

export const fetchGetOrdersApi = createAsyncThunk('user/getOrders', async () =>
  getOrdersApi()
);

export const fetchGetUserApi = createAsyncThunk('user/getUser', async () =>
  getUserApi()
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    }
  },
  selectors: {
    isLoadingSelector: (state) => state.isLoading,
    isAuthenticatedSelector: (state) => state.isAuthenticated,
    userSelector: (state) => state.data,
    ordersSelector: (state) => state.orders,
    errorSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginUserApi.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(fetchLoginUserApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchLoginUserApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchRegisterUserApi.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRegisterUserApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchRegisterUserApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchResetPasswordApi.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchResetPasswordApi.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchResetPasswordApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchForgotPasswordApi.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchForgotPasswordApi.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchForgotPasswordApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchLogoutApi.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.data = null;
        state.error = null;
      })
      .addCase(fetchUpdateUserApi.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.error = null;
      })
      .addCase(fetchGetUserApi.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.error = null;
      })
      .addCase(fetchGetOrdersApi.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.error = null;
      });
  }
});

export default userSlice.reducer;
export const {
  isLoadingSelector,
  isAuthenticatedSelector,
  userSelector,
  ordersSelector,
  errorSelector
} = userSlice.selectors;
export const { resetError } = userSlice.actions;
