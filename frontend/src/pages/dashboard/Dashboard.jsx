import React from 'react'
import DashboardHeader from './dashboard_header/DashboardHeader'
import DashboardSidebar from './dashboard_sidebar/DashboardSidebar';
import { Outlet } from 'react-router-dom';
import './Dashboard.module.css';
import Content from './pages/Content'
import { SidebarProvider } from "./context/SidebarContext";
import Breadcrumb from './components/BreadcrumbAuto';


function Dashboard() {
  return (
    <>
    <section className='main'>
      <SidebarProvider>
      <DashboardHeader />
      <div className='contentMain flex'>
         
        <div className='sidebarWrapper w-[18%]'>
          <DashboardSidebar />
        </div>

          <div className='mainContent bg-[#F8ECEC] w-full     xl:w-[82%] px-5 py-4'>
           <Breadcrumb/> 
          <Outlet />
        </div>


      </div> 
      </SidebarProvider>
      </section>

    </>
  );
}

export default Dashboard