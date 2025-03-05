import React from 'react';
import { useSelector } from '../../services/store';
import {
  isAuthenticatedSelector,
  userSelector,
  isLoadingSelector
} from '../../services/slices/user-slice';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(isAuthenticatedSelector);
  const user = useSelector(userSelector);
  const isLoading = useSelector(isLoadingSelector);
  const location = useLocation();

  if (isLoading) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !isAuthChecked && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && isAuthChecked && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} state={location} />;
  }

  return children;
};
