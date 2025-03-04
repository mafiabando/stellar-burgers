import { TUser } from '@utils-types';
import reducer, { userState } from '../user-slice';
import {
  fetchGetUserApi,
  fetchLoginUserApi,
  fetchRegisterUserApi,
  fetchUpdateUserApi,
  fetchLogoutApi,
  resetError
} from '../user-slice';

const mockUser: TUser = {
  email: 'test@example.com',
  name: 'Test User'
};

const initialState: userState = {
  isLoading: false,
  isAuthenticated: false,
  data: null,
  orders: [],
  error: null
};

describe('userReducer', () => {
  it('should handle fetchLoginUserApi.pending', () => {
    const action = { type: fetchLoginUserApi.pending.type };
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(true); // Загрузка началась
    expect(newState.error).toBeNull(); // Ошибки нет
  });

  it('should handle fetchLoginUserApi.rejected', () => {
    const mockError = 'Login Failed';
    const action = {
      type: fetchLoginUserApi.rejected.type,
      error: { message: mockError }
    };
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(false); // Загрузка завершена
    expect(newState.isAuthenticated).toBe(false); // Не авторизован
    expect(newState.error).toBe(mockError); // Ошибка установлена
  });

  it('should handle fetchLoginUserApi.fulfilled', () => {
    const action = {
      type: fetchLoginUserApi.fulfilled.type,
      payload: mockUser
    };
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(false); // Загрузка завершена
    expect(newState.isAuthenticated).toBe(true); // Авторизован
    expect(newState.data).toEqual(mockUser); // Данные пользователя установлены
    expect(newState.error).toBeNull(); // Нет ошибок
  });

  it('should handle fetchRegisterUserApi.pending', () => {
    const action = { type: fetchRegisterUserApi.pending.type };
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(true); // Загрузка началась
    expect(newState.isAuthenticated).toBe(false); // Не авторизован
    expect(newState.error).toBeNull(); // Ошибки нет
  });

  it('should handle fetchRegisterUserApi.rejected', () => {
    const mockError = 'Registration Failed';
    const action = {
      type: fetchRegisterUserApi.rejected.type,
      error: { message: mockError }
    };
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(false); // Загрузка завершена
    expect(newState.isAuthenticated).toBe(false); // Не авторизован
    expect(newState.error).toBe(mockError); // Ошибка установлена
  });

  it('should handle fetchRegisterUserApi.fulfilled', () => {
    const action = {
      type: fetchRegisterUserApi.fulfilled.type,
      payload: mockUser
    };
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(false); // Загрузка завершена
    expect(newState.isAuthenticated).toBe(true); // Авторизован
    expect(newState.data).toEqual(mockUser); // Данные пользователя установлены
    expect(newState.error).toBeNull(); // Нет ошибок
  });

  it('should handle fetchLogoutApi.fulfilled', () => {
    const stateWithUserData = {
      ...initialState,
      isAuthenticated: true,
      data: mockUser
    };

    const action = { type: fetchLogoutApi.fulfilled.type };
    const newState = reducer(stateWithUserData, action);

    expect(newState.isAuthenticated).toBe(false); // Не авторизован
    expect(newState.data).toBeNull(); // Данные пользователя сброшены
    expect(newState.error).toBeNull(); // Нет ошибок
  });

  it('should handle fetchGetUserApi.fulfilled', () => {
    const action = {
      type: fetchGetUserApi.fulfilled.type,
      payload: { user: mockUser }
    };
    const newState = reducer(initialState, action);

    expect(newState.data).toEqual(mockUser); // Данные пользователя установлены
    expect(newState.isAuthenticated).toBe(true); // Авторизован
    expect(newState.error).toBeNull(); // Нет ошибок
  });

  it('should handle fetchUpdateUserApi.fulfilled', () => {
    const updatedUser: TUser = {
      email: 'updated@example.com',
      name: 'Updated User'
    };

    const action = {
      type: fetchUpdateUserApi.fulfilled.type,
      payload: { user: updatedUser }
    };
    const newState = reducer(initialState, action);

    expect(newState.data).toEqual(updatedUser); // Обновленные данные пользователя установлены
    expect(newState.isAuthenticated).toBe(true); // Авторизован
    expect(newState.error).toBeNull(); // Нет ошибок
  });

  it('should handle resetError', () => {
    const stateWithError = {
      ...initialState,
      error: 'Some Error'
    };

    const action = resetError();
    const newState = reducer(stateWithError, action);

    expect(newState.error).toBeNull(); // Ошибка сброшена
  });
});
