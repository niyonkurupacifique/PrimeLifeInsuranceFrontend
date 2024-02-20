import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import SignUp from './pages/pagesComponentsFolder/Signup';
import { OpenModalContext } from './pages/context';
import { useState } from 'react';
import PaymentPage from './pages/pagesComponentsFolder/payment';
import Dashboard from './pages/pagesComponentsFolder/userDashboard';
import Welcome from './pages/pagesComponentsFolder/welcome';
import React from 'react';
import FamilyInsuranceSummary from './pages/pagesComponentsFolder/familyInsuranceSummary';
import Header2 from './pages/pagesComponentsFolder/header2';
import MyPolicies from './pages/pagesComponentsFolder/myPolicies';
import TemporaryDrawer from './pages/pagesComponentsFolder/topDrawer';

import { LoginForm } from './sections/auth/login';
import Nav from './layouts/dashboard/nav';
// ----------------------------------------------------------------------

export default function Router() {
  const [Message,setMessage]=useState("")
  const[messageStatus,setmessageStatus]=useState(true)
  const[messageType,setMessageType]=useState("")
  const[token,setToken]=useState("")
  const[names,setNames]=useState("")
  const[nationaId,setNationalId]=useState("")
  const[userName,setUsername]=useState("")
  const[loginCalled,setLoginCalled]=useState(false)
  const[loginFromHeader,setLoginFromHeader]=useState(false)
  const[myPoliciesButtonClicked,setMyPoliciesButtonClicked]=useState(false)
  const[istokenIsActive,setIsTokenActive]=useState(false) 

  const routes = useRoutes([
       
    {
      path: '/Home',
      element: (
  
       <OpenModalContext.Provider value={{istokenIsActive,setIsTokenActive, myPoliciesButtonClicked,setMyPoliciesButtonClicked, loginFromHeader,setLoginFromHeader,loginCalled,setLoginCalled,token,setToken,names,setNames,nationaId,setNationalId,userName,setUsername}}>
          <DashboardLayout />
        </OpenModalContext.Provider>
      ),
      children: [
        { element: <Navigate to="/Home/products" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        
      ],
    },
    {
      path: 'login',
      element: (
        <OpenModalContext.Provider  value={{ loginCalled,setLoginCalled, istokenIsActive,setIsTokenActive, myPoliciesButtonClicked,setMyPoliciesButtonClicked, loginFromHeader,setLoginFromHeader, token,setToken,names,setNames,nationaId,setNationalId,userName,setUsername}}>
          <LoginPage />
        </OpenModalContext.Provider>
      ),
    },
    {
      path: 'signup',
      element: (
        <OpenModalContext.Provider value={{  istokenIsActive,setIsTokenActive,  myPoliciesButtonClicked,setMyPoliciesButtonClicked,  loginFromHeader,setLoginFromHeader, token,setToken,names,setNames,nationaId,setNationalId,userName,setUsername}}>
          <SignUp />
        </OpenModalContext.Provider>
      ),
    },
    {
      path: 'payment',
      element: (
       
       <OpenModalContext.Provider value={{  istokenIsActive,setIsTokenActive,  myPoliciesButtonClicked,setMyPoliciesButtonClicked, loginFromHeader,setLoginFromHeader, token,setToken,names,setNames,nationaId,setNationalId,userName,setUsername}}>
       <PaymentPage />
      </OpenModalContext.Provider>
          
       
      ),
    },
    {
      path: 'welcome',
      element: (
       
          <Welcome />
       
      ),
    },
    {
      path: 'userdashboard',
      element: (
       <OpenModalContext.Provider value={{token,setToken}}>
          <Dashboard />
       </OpenModalContext.Provider>
      ),
    },
    {
      path: 'familyinsuranceS',
      element: (
       <OpenModalContext.Provider value={{ istokenIsActive,setIsTokenActive, myPoliciesButtonClicked,setMyPoliciesButtonClicked, token,setToken,names,setNames,nationaId,setNationalId,userName,setUsername}}>
          <FamilyInsuranceSummary />
       </OpenModalContext.Provider>
      ),
    },
    {
      path: 'header2gdyegyegy',
      element: (
       <OpenModalContext.Provider value={{ istokenIsActive,setIsTokenActive, myPoliciesButtonClicked,setMyPoliciesButtonClicked, loginFromHeader,setLoginFromHeader,  token,setToken,names,setNames,nationaId,setNationalId,userName,setUsername}}>
          <Header2/>
       </OpenModalContext.Provider>
      ),
    },
    {
      path: 'huhuytywvxrefgdyegyegy',
      element: (
       <OpenModalContext.Provider value={{ istokenIsActive,setIsTokenActive, myPoliciesButtonClicked,setMyPoliciesButtonClicked, loginFromHeader,setLoginFromHeader,  token,setToken,names,setNames,nationaId,setNationalId,userName,setUsername}}>
          <TemporaryDrawer/>
       </OpenModalContext.Provider>
      ),
    },
    {
      path: 'huhuytywvxrefgdyegyeguy',
      element: (
       <OpenModalContext.Provider value={{ istokenIsActive,setIsTokenActive, myPoliciesButtonClicked,setMyPoliciesButtonClicked, loginFromHeader,setLoginFromHeader,  token,setToken,names,setNames,nationaId,setNationalId,userName,setUsername}}>
          <Nav/>
       </OpenModalContext.Provider>
      ),
    },
    {
      path: 'mypoliciiiies',
      element: (
       <OpenModalContext.Provider value={{istokenIsActive,setIsTokenActive, myPoliciesButtonClicked,setMyPoliciesButtonClicked, loginFromHeader,setLoginFromHeader,  token,setToken,names,setNames,nationaId,setNationalId,userName,setUsername}}>
          <Header2/>
       </OpenModalContext.Provider>
      ),
    },
    {
      element: (
        <OpenModalContext.Provider value={{istokenIsActive,setIsTokenActive, myPoliciesButtonClicked,setMyPoliciesButtonClicked, token,setToken,names,setNames,nationaId,setNationalId,userName,setUsername}}>
          <SimpleLayout />
        </OpenModalContext.Provider>
      ),
      children: [
        { element: <Navigate to="/Home/products" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
