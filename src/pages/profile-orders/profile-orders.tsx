import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import {
  ordersSelector,
  fetchGetOrdersApi
} from '../../services/slices/user-slice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(ordersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetOrdersApi());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
