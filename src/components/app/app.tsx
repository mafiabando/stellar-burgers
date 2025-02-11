import '../../index.css';
import styles from './app.module.css';
import ConstructorPage from '../../pages/constructor-page';
import Feed from '../../pages/feed';
import {
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { AppHeader, OrderInfo, IngredientDetails, Modal } from '@components';
import { ProtectedRoute } from '../protected-route/protected-route';

import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { fetchGetUserApi } from '../../services/slices/user-slice';
import { fetchIngredientsApi } from '../../services/slices/ingredients-slice';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const backgroundlocation = location.state?.background;

  const handleClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(fetchGetUserApi());
    dispatch(fetchIngredientsApi());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundlocation || location}>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <Modal title={'информация о заказе'} onClose={handleClose}>
                <OrderInfo />
              </Modal>
            </ProtectedRoute>
          }
        />
      </Routes>
      {backgroundlocation && (
        <Routes>
          <Route
            path='feed/:number'
            element={
              <Modal title={'информация о заказе'} onClose={handleClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='ingredients/:id'
            element={
              <Modal title={'информация об ингредиенте'} onClose={handleClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title={'информация о заказе'} onClose={handleClose}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
