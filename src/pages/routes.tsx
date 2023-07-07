import { createBrowserRouter } from 'react-router-dom';
import { App } from '../App';
import { Login } from './Login';
import { PlayedGamesPage } from './PlayedGamesPage';
import { AddNewGamePage } from './AddNewGamePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/played',
    element: <PlayedGamesPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/addnewgame',
    element: <AddNewGamePage />,
  },
]);