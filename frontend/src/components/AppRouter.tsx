import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import MainPage from '../pages/MainPage';
import NotePage from '../pages/NotePage';
import RegisterPage from '../pages/RegisterPage';

const AppRouter = (props: {
  authSetter: React.Dispatch<React.SetStateAction<boolean>>,
  isAuth: boolean,
}) => {
  return (
    <Routes>
      {props.isAuth && <Route path='/notes' element={<NotePage />} />}
      <Route path='/' element={<MainPage />} />
      <Route path='/login' element={<LoginPage authSetter={props.authSetter}/>} />
      <Route path='/register' element={<RegisterPage />} />
    </Routes>
  )
}

export default AppRouter;