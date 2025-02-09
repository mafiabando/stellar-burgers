import { FC, useState } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';

import { userSelector } from '../../services/slices/user-slice';

export const AppHeader: FC = () => {
  const user = useSelector(userSelector);
  const [isOpen, setIsOpen] = useState(false);
  
  return <AppHeaderUI userName={user?.name} />;
};
