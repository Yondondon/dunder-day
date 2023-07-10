import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout, selectIsLogged } from '../../features/LoginForm/userSlice';
import { eraseCookie } from '../../utils';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  const isLogged = useAppSelector(selectIsLogged);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    eraseCookie('userToken');
    dispatch(logout());
    window.location.reload();
  }

  return (
    <>
      <h1 className='main_title'>
        <span>Дундердей</span>
        { !isLogged && (
            <NavLink to='/login' className={'login_link'}>
              <img src='images/dundyk.png' alt='' />
            </NavLink>
          ) 
        }
        { isLogged && (
            <button className='logout_btn' onClick={handleLogout} title='Logout'>
              <img src='images/dundyk.png' alt='' />
            </button>
          )
        }
      </h1>
    </>
  )
}