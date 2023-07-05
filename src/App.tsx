import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getCookie } from './utils'

export const App = () => {
  const [isLogged, ] = useState<boolean>(getCookie('userToken') ? true : false)

  return (
    <>
      <NavLink to='/login'>Login</NavLink>
      { isLogged && <p>Logged in!</p>}
    </>
  );
}
