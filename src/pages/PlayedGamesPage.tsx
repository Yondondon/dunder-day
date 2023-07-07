import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavMenu } from '../components/NavMenu/NavMenu';

export const PlayedGamesPage = () => {
  return (
    <div className='main_wrap'>
      <h1 className='main_title'>
        <span>Дундердей</span>
        <NavLink to='/login' className={'login_link'}>
          <img src='images/dundyk.png' alt='' />
        </NavLink>
      </h1>
      <NavMenu />

      <div>Тут поки нічого нема.</div>
    </div>
  )
}