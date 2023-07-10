import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavMenu } from '../components/NavMenu/NavMenu';
import { DunderList } from '../features/DunderList/DunderList';
import { Header } from '../components/Header/Header';
import { useAppSelector } from '../store/hooks';
import { selectIsLogged } from '../features/LoginForm/userSlice';

export const HomePage = () => {
  const isLogged = useAppSelector<boolean>(selectIsLogged);

  return (
    <>
      <Header />
      <NavMenu />
      { isLogged && <NavLink to='/add-new-game' className={'add_new_game_btn'}>Додати гру</NavLink> }
      <DunderList />
    </>
  )
}