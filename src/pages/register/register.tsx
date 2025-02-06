import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';

import {
  fetchRegisterUserApi,
  errorSelector,
  resetError
} from '../../services/slices/user-slice';
import { useDispatch, useSelector } from '../../services/store';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const error = useSelector(errorSelector);
  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      fetchRegisterUserApi({ name: userName, email: email, password: password })
    );
  };

  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  return (
    <RegisterUI
      errorText={error!}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
