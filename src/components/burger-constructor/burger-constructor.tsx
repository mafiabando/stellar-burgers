import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { isAuthenticatedSelector } from '../../services/slices/user-slice';
import {
  fetchOrderBurgerApi,
  getIsLoadingOrderSelector,
  clearOrder,
  getOrderDataSelector
} from '../../services/slices/order-slice';
import {
  getConstructorSelector,
  resetConstructor
} from '../../services/slices/constructor-slice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(getConstructorSelector);
  const orderModalData = useSelector(getOrderDataSelector);
  const orderRequest = useSelector(getIsLoadingOrderSelector);
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  const onOrderClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    }

    const { bun, ingredients } = constructorItems || {
      bun: null,
      ingredients: []
    };
    if (!constructorItems.bun || orderRequest) return;

    const orderData = [
      bun?._id!,
      ...ingredients.map((item) => item._id),
      bun?._id!
    ];
    dispatch(fetchOrderBurgerApi(orderData));
  };

  const closeOrderModal = () => {
    navigate('/', { replace: true });
    dispatch(clearOrder());
    dispatch(resetConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients?.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
