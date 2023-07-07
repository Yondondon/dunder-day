import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getCookie } from './utils'
import { NavMenu } from './components/NavMenu/NavMenu';
import { DunderList } from './features/DunderList/DunderList';

export const App = () => {
  // const [isLogged, ] = useState<boolean>(getCookie('userToken') ? true : false); //додати змінну в редакс

  return (
    <div className="main_wrap">
      <h1 className='main_title'>
        <span>Дундердей</span>
        <NavLink to='/login' className={'login_link'}>
          <img src="images/dundyk.png" alt="" />
        </NavLink>
      </h1>
      <NavMenu />
      <NavLink to='/addnewgame' className={'add_new_game_btn'}>Додати гру</NavLink>
      <DunderList />
    </div>
  );
}
