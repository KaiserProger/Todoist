import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import BrandBar from './components/BrandBar';
import AppRouter from './components/AppRouter';

function App() {
  const [isAuth, setAuth] = useState<boolean>(false);
  return (
    <BrowserRouter>
      <BrandBar></BrandBar>
      <AppRouter authSetter={setAuth} isAuth={isAuth} />
    </BrowserRouter>
  );
}

export default App;
