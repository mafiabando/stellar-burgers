import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../../root-reducer';

describe('rootReducer', () => {
  it('should initialize correctly', () => {
    const store = configureStore({ reducer: rootReducer });
    const initialState = store.getState();

    expect(initialState).toBeDefined();
    expect(initialState.feeds).toBeDefined(); // Проверка наличия слайса constructor
    expect(initialState.burgerConstructor).toBeDefined(); // Проверка наличия слайса ingredients
    expect(initialState.ingredients).toBeDefined();
    expect(initialState.order).toBeDefined();
    expect(initialState.user).toBeDefined();
  });
});
