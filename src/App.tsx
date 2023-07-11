import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { login, selectIsLogged } from './features/LoginForm/userSlice';
import { getCookie } from './utils';
import { HomePage } from './pages/HomePage';
import { Login } from './pages/Login';
import { AddNewGamePage } from './pages/AddNewGamePage';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { PlayedGamesPage } from './pages/PlayedGamesPage';

export const App = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn: boolean = useAppSelector(selectIsLogged);
  
  useEffect(() => {
    const isLogged: boolean = getCookie('userToken').length > 0 ? true : false;
    if(isLogged) {
      const userToken: string = getCookie('userToken');
      dispatch(login(userToken))
    }
  })


  return (
    <div className='main_wrap'>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/login" element={
            isLoggedIn ? <Navigate to='/' /> : <Login />
          } />
          <Route path="/add-new-game" element={
            <PrivateRoute>
              <AddNewGamePage />
            </PrivateRoute>
            }
          />
          <Route path="/played" element={<PlayedGamesPage />} />
          <Route path="*" element={<p>Такої сторінки не існує!</p>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
