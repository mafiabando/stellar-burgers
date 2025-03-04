import { TOrder } from '@utils-types';
import orderReducer, {
  fetchOrderBurgerApi,
  clearOrder,
  TOrderState
} from '../order-slice'; // Путь к вашему orderSlice

// Моковые данные для заказа
const mockOrder: TOrder = {
  _id: '1',
  status: 'done',
  name: 'Test Order',
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
  number: 12345,
  ingredients: ['1', '2']
};

const initialState: TOrderState = {
  isLoading: false,
  data: null,
  error: null
};

describe('orderReducer', () => {
  it('should handle fetchOrderBurgerApi.pending', () => {
    const action = { type: fetchOrderBurgerApi.pending.type };
    const newState = orderReducer(initialState, action);

    expect(newState.isLoading).toBe(true); // Проверяем, что загрузка началась
    expect(newState.error).toBeNull(); // Ошибки нет
  });

  it('should handle fetchOrderBurgerApi.rejected', () => {
    const mockError = 'Order Creation Failed';
    const action = {
      type: fetchOrderBurgerApi.rejected.type,
      error: { message: mockError }
    };
    const newState = orderReducer(initialState, action);

    expect(newState.isLoading).toBe(false); // Загрузка завершена
    expect(newState.error).toBe(mockError); // Ошибка установлена
  });

  it('should handle fetchOrderBurgerApi.fulfilled', () => {
    const action = {
      type: fetchOrderBurgerApi.fulfilled.type,
      payload: { order: mockOrder }
    };
    const newState = orderReducer(initialState, action);

    expect(newState.isLoading).toBe(false); // Загрузка завершена
    expect(newState.data).toEqual(mockOrder); // Данные установлены
    expect(newState.error).toBeNull(); // Нет ошибок
  });

  it('should handle clearOrder', () => {
    const stateWithOrder = {
      ...initialState,
      data: mockOrder
    };

    const action = clearOrder();
    const newState = orderReducer(stateWithOrder, action);

    expect(newState.data).toBeNull(); // Заказ сброшен до null
  });
});
