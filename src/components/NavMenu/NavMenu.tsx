import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavMenu = () => {
  return (
    <div className='navmenu_wrap'>
      <NavLink to='/'>Очікується</NavLink>
      <NavLink to='/played'>Зіграні</NavLink>
    </div>
  )
}