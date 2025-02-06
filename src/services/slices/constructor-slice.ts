import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export type TConstructorState = {
  error: string | null | undefined;
  constructor: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  }
};

export const initialState: TConstructorState = {
  error: null,
  constructor: {
  bun: null,
  ingredients: []
  }
};
const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {  
        if (action.payload.type === 'bun') {
          state.constructor.bun = {
            ...state.constructor.bun,
            ...action.payload
          }
        } else {
          state.constructor.ingredients = [
            ...state.constructor.ingredients,
            action.payload
          ]
        };
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.constructor.ingredients = state.constructor.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ index: number; upwards: boolean }>
    ) => {
      const { index, upwards } = action.payload;
      const ingredientLink = state.constructor.ingredients[index];

      const newIndex = upwards ? index - 1 : index + 1;

      if (newIndex >= 0 && newIndex < state.constructor.ingredients.length) {
        state.constructor.ingredients[index] = state.constructor.ingredients[newIndex];
        state.constructor.ingredients[newIndex] = ingredientLink;
      }
    },
    resetConstructor(state) {
      state.constructor = {
        bun: null,
        ingredients: []
      }
    }
  },
  selectors: {
    getConstructorSelector: (state) => state.constructor
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
