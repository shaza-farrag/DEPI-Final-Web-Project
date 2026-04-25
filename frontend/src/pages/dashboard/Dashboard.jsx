import React from 'react'
import DashboardHeader from './dashboard_header/DashboardHeader'
import DashboardSidebar from './dashboard_sidebar/DashboardSidebar';
import { Outlet } from 'react-router-dom';
import './Dashboard.module.css';


function Dashboard() {
  return (
    <>
    <section className='main'>
      <DashboardHeader />
      <div className='contentMain flex'>

        <div className='sidebarWrapper w-[20%]'>
          <DashboardSidebar />
        </div>

          <div className='mainContent w-[75%] bg-[#F8ECEC]'>

          <Outlet />
        </div>


      </div> 
      </section>

    </>
  );
}

export default Dashboard