import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router';

const PrivateRoute = () => {
    const userId = useSelector(state=>state.user.userId);
  return (
    userId ? <Outlet /> : <Navigate to="/signup" replace/>
  )
}

export default PrivateRoute
