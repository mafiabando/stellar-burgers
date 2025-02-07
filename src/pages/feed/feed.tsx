import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  fetchFeedsApi,
  getFeedsDataSelector
} from '../../services/slices/feeds-slice';
import { useSelector, useDispatch } from '../../services/store';

const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders = useSelector(getFeedsDataSelector);

  const getFeeds = () => {
    dispatch(fetchFeedsApi());
  };

  useEffect(() => {
    getFeeds();
  }, []);

  if (!orders.length || !Array.isArray(orders)) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        getFeeds();
      }}
    />
  );
};

export default Feed;
