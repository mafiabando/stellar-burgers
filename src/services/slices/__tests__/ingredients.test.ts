import { TIngredient } from '@utils-types';
import reducer, {
  fetchIngredientsApi,
  TIngredientsState
} from '../ingredients-slice';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Test Ingredient',
    type: 'main',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 100,
    price: 50,
    image: 'image.jpg',
    image_large: 'image_large.jpg',
    image_mobile: 'image_mobile.jpg'
  },
  {
    _id: '2',
    name: 'Test Ingredient 2',
    type: 'bun',
    proteins: 20,
    fat: 10,
    carbohydrates: 40,
    calories: 200,
    price: 100,
    image: 'image2.jpg',
    image_large: 'image_large2.jpg',
    image_mobile: 'image_mobile2.jpg'
  }
];

const initialState: TIngredientsState = {
  isLoading: false,
  data: [],
  error: null
};

describe('ingredientsReducer', () => {
  it('should handle fetchIngredientsApi.pending', () => {
    const action = { type: fetchIngredientsApi.pending.type };
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(true); // Проверяем, что загрузка началась
    expect(newState.error).toBeNull(); // Ошибки нет
  });

  it('should handle fetchIngredientsApi.rejected', () => {
    const mockError = 'Network Error';
    const action = {
      type: fetchIngredientsApi.rejected.type,
      error: { message: mockError }
    };
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(false); // Загрузка завершена
    expect(newState.error).toBe(mockError); // Ошибка установлена
  });

  it('should handle fetchIngredientsApi.fulfilled', () => {
    const action = {
      type: fetchIngredientsApi.fulfilled.type,
      payload: mockIngredients
    };
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(false); // Загрузка завершена
    expect(newState.data).toEqual(mockIngredients); // Данные установлены
    expect(newState.error).toBeNull(); // Нет ошибок
  });
});
