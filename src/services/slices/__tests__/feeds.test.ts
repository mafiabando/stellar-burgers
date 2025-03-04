import { TOrder, TOrdersData } from '@utils-types';
import feedsReducer, {
  fetchFeedsApi,
  fetchOrderByNumberApi,
  TFeedsState
} from '../feeds-slice'; // Путь к вашему feedsSlice

// Моковые данные для заказов
const mockOrdersData: TOrdersData = {
  orders: [
    {
      _id: '1',
      status: 'done',
      name: 'Test Order',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
      number: 12345,
      ingredients: ['1', '2']
    }
  ],
  total: 10,
  totalToday: 5
};

const initialState: TFeedsState = {
  data: {
    orders: [],
    total: NaN,
    totalToday: NaN
  },
  orderByNumber: null,
  error: null
};

describe('feedsReducer', () => {
  it('should handle fetchFeedsApi.pending', () => {
    const action = { type: fetchFeedsApi.pending.type };
    const newState = feedsReducer(initialState, action);

    expect(newState.error).toBeNull(); // Ошибки нет
  });

  it('should handle fetchFeedsApi.rejected', () => {
    const mockError = 'Network Error';
    const action = {
      type: fetchFeedsApi.rejected.type,
      error: { message: mockError }
    };
    const newState = feedsReducer(initialState, action);

    expect(newState.error).toBe(mockError); // Ошибка установлена
  });

  it('should handle fetchFeedsApi.fulfilled', () => {
    const action = {
      type: fetchFeedsApi.fulfilled.type,
      payload: mockOrdersData
    };
    const newState = feedsReducer(initialState, action);

    expect(newState.data.orders).toEqual(mockOrdersData.orders); // Данные установлены
    expect(newState.data.total).toBe(mockOrdersData.total); // Total установлен
    expect(newState.data.totalToday).toBe(mockOrdersData.totalToday); // TotalToday установлен
    expect(newState.error).toBeNull(); // Нет ошибок
  });

  it('should handle fetchOrderByNumberApi.pending', () => {
    const action = { type: fetchOrderByNumberApi.pending.type };
    const newState = feedsReducer(initialState, action);

    expect(newState.error).toBeNull(); // Ошибки нет
  });

  it('should handle fetchOrderByNumberApi.rejected', () => {
    const mockError = 'Order Fetch Error';
    const action = {
      type: fetchOrderByNumberApi.rejected.type,
      error: { message: mockError }
    };
    const newState = feedsReducer(initialState, action);

    expect(newState.error).toBe(mockError); // Ошибка установлена
  });

  it('should handle fetchOrderByNumberApi.fulfilled', () => {
    const mockOrder: TOrder = {
      _id: '1',
      status: 'done',
      name: 'Test Order',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
      number: 12345,
      ingredients: ['1', '2']
    };

    const action = {
      type: fetchOrderByNumberApi.fulfilled.type,
      payload: { orders: [mockOrder] }
    };
    const newState = feedsReducer(initialState, action);

    expect(newState.orderByNumber).toEqual(mockOrder); // Заказ установлен
    expect(newState.error).toBeNull(); // Нет ошибок
  });
});
