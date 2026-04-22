import { Button } from '@mui/material';
import React from 'react'
// import styles from './Header.module.css'
import { RiMenu2Line } from "react-icons/ri";


function Header() {
  return (
    <header className='w-full h-20 pl-10 bg-[#f1f1f1] flex items-center justify-between '>
        <div className="part1">
          <Button className='w-10! h-10! rounded-full! min-w-10! mx-auto '>
            <RiMenu2Line className=' text-[18px] text-[rgba(0,0,0)0.8]' />

          </Button>
        </div>
    </header>
  );
}

export default Header