import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};
const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.bun = payload;
        } else {
          state.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(
        (item) => item._id !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ index: number; upwards: boolean }>
    ) => {
      const { index, upwards } = action.payload;
      const ingredientLink = state.ingredients[index];

      const newIndex = upwards ? index - 1 : index + 1;

      if (newIndex >= 0 && newIndex < state.ingredients.length) {
        state.ingredients[index] = state.ingredients[newIndex];
        state.ingredients[newIndex] = ingredientLink;
      }
    },
    resetConstructor(state) {
      state = {
        bun: null,
        ingredients: []
      };
    }
  },
  selectors: {
    getConstructorSelector: (state) => state
  }
});
export default constructorSlice.reducer;
export const { getConstructorSelector } = constructorSlice.selectors;
export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetConstructor
} = constructorSlice.actions;
