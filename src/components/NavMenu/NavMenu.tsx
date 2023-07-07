import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavMenu = () => {
  return (
    <div className='navmenu_wrap'>
      <NavLink to='/' className={'navlink'}>Очікується</NavLink>
      <NavLink to='/played' className={'navlink'}>Зіграні</NavLink>
    </div>
  )
}