import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import PageLogin from './pages/PageLogin';
import PrivateRoute from './auth/PrivateRoute';
import PageHome from './pages/PageHome';
import Report from './components/Report';

const App = () => {
  useEffect(() => {
    document.title = 'FullStack Social';
  }, []);
  return (
      <Routes>
      <Route exact path="/login" element={
          <PageLogin />
        } />
        <Route path='/' >
          <Route index element={
            <PrivateRoute >
              <PageHome />
            </PrivateRoute>
          } />
        </Route>
        <Route path='/report' >
          <Route index element={
            <PrivateRoute >
              <Report />
            </PrivateRoute>
          } />
        </Route>
      </Routes>
  );
};

export default App;
