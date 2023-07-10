import React, { FC } from 'react';
import { Navigate } from 'react-router';
import { getCookie } from '../../utils';

type Props = {
  children: any;
}

export const PrivateRoute: FC<Props> = ({ children }) => {
  const userToken = getCookie('userToken');

  if(userToken.length === 0) {
    return <Navigate to='/login' replace />
  }

  return children;
}