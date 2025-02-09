import { combineReducers } from 'redux';
import constructorReducer from './slices/constructor-slice';
import feedsReducer from './slices/feeds-slice';
import ingredientsReducer from './slices/ingredients-slice';
import orderReducer from './slices/order-slice';
import userReducer from './slices/user-slice';

export const rootReducer = combineReducers({
  feeds: feedsReducer,
  burgerConstructor: constructorReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  user: userReducer
});
