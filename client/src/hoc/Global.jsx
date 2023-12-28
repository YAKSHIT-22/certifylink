import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useLocation } from 'react-router-dom';
import DashboardHeader from '../components/DashboardHeader';

const Global = ({children}) => {
  const location = useLocation();
  return (
    <>
    {location.pathname === '/' ? <Header/> : ["/"].some(path => path === location.pathname || /^\/dashboard\//.test(location.pathname)) ? <DashboardHeader/> : location.pathname === "/login" ? null : <Header/>}
    {children}
    {["/login"].some(path => path === location.pathname || /^\/dashboard\//.test(location.pathname)) ? null : <Footer />}
    </>
  )
}

export default Global