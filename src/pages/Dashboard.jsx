import React, { useContext } from 'react';
import SellerDashboard from '../seller/SellerDashboard';
import AdminDashboard from '../admin/AdminDashboard';
import AuthContext from '../store/AuthContext';

const Dashboard = () => {
  const authCtx = useContext(AuthContext);
  return <div className="flex flex-col h-[calc(100vh_-_110px)] bg-background ">{authCtx.role === 'admin' ? <AdminDashboard /> : <SellerDashboard />}</div>;
};

export default Dashboard;
