import React from 'react';
import { NavMenu } from '../components/NavMenu/NavMenu';
import { Header } from '../components/Header/Header';
import { PlayedList } from '../features/PlayedList/PlayedList';

export const PlayedGamesPage = () => {
  return (
    <>
      <Header />
      <NavMenu />
      <PlayedList />
    </>
  )
}