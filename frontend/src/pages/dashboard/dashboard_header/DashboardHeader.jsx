import { Button } from '@mui/material';
import React ,{useState} from 'react'
// import styles from './Header.module.css'
import { RiMenu2Line } from "react-icons/ri";
// import { IoMdNotificationsOutline } from "react-icons/io";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { FaRegBell } from "react-icons/fa";
import './dashboardHeader.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";
import { FiActivity } from "react-icons/fi";
import { PiSignOutBold } from "react-icons/pi";
import { useSidebar } from "../context/SidebarContext";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 4px',
  },
}));

function DashboardHeader() {
  const { toggleSidebar } = useSidebar();
 const [anchorMyAcc, setanchorMyAcc] = useState(null);
  const openMyAcc = Boolean(anchorMyAcc);
  const handleClickMyAcc = (event) => {
    setanchorMyAcc(event.currentTarget);
  };
  const handleCloseMyAcc = () => {
    setanchorMyAcc(null);
  };

  const [anchorNotif, setAnchorNotif] = useState(null);
  const openNotif = Boolean(anchorNotif);
  const handleClickNotif = (event) => {
    setAnchorNotif(event.currentTarget);
  };
  const handleCloseNotif = () => {
  setAnchorNotif(null);
};
  return (
    <header className='w-full h-auto py-2  pl-4 pr-7 bg-[#ffff]  flex items-center justify-between shadow-md '>
        <div className="part1">
          {/* الزرار ده هيظهر من مقاس اللابتوب ولّي أصغر بس، ويختفي على الشاشات الكبيرة */}
          <Button onClick={toggleSidebar} className=' w-10! h-10! rounded-full! min-w-10! hover:bg-[#F8ECEC]!'>
            <RiMenu2Line className=' text-[35px] text-black' />
          </Button>
        </div>

        <div className="part2 w-[40%] flex items-center  justify-end gap-5">
        <IconButton
          aria-label="cart"
          onClick={handleClickNotif}
          className="hover:bg-[#F8ECEC]!"
        >
          <StyledBadge badgeContent={4} color="secondary">
            <FaRegBell />
          </StyledBadge>
        </IconButton>
        
        <Menu
          anchorEl={anchorNotif}
          open={openNotif}
          onClose={handleCloseNotif}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          slotProps={{
            paper: {
              className: "mt-2! rounded-xl! shadow-lg!",
              style: { minWidth: 260 },
            },
          }}
        >
          <div className="px-4 py-3 border-b border-gray-100">
            <span className="font-semibold text-zinc-600 text-sm">Notifications</span>
          </div>
        
          <div className="px-4 py-8 text-center text-gray-400 text-sm">
            No Notification Found
          </div>
        </Menu>
         < div className='relative'>
               <div className='rounded-full w-10 h-10 overflow-hidden cursor-pointer' 
                 onClick={handleClickMyAcc}>
                 <img src='https://ecme-react.themenate.net/img/avatars/thumb-1.jpg' className='w-full h-full object-cover'></img>
              </div>
                <Menu
        anchorEl={anchorMyAcc}
        id="account-menu"
        open={openMyAcc}
        onClose={handleCloseMyAcc}
        onClick={handleCloseMyAcc}
        slotProps={{
            paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleCloseMyAcc} className='bg-white!'>
            <div className='flex items-center gap-3' >
               <div className='rounded-full w-10 h-10 overflow-hidden cursor-pointer' >
                 <img src='https://ecme-react.themenate.net/img/avatars/thumb-1.jpg' className='w-full h-full object-cover'></img>
              </div>
              <div className="info">
                <h3 className='text-[16px] font-medium leading-5'>Angelina Gotelli</h3>
                <p className='text-[12px] font-normal opacity-70'>admin-01@ecme.com</p>
              </div>
            </div>
        </MenuItem>
         <Divider />
        <MenuItem onClick={handleCloseMyAcc} className='flex items-center gap-3 hover:bg-[#F8ECEC]!'>
         <FaRegUserCircle className='text-[14px]' /> <span className='text-[14px]'>Profile</span>
        </MenuItem> 

        <MenuItem onClick={handleCloseMyAcc} className='flex items-center gap-3 hover:bg-[#F8ECEC]!'>
         <MdOutlineSettings  className='text-[14px]' /> <span className='text-[14px]'>Account Setting</span>
        </MenuItem> 

         <MenuItem onClick={handleCloseMyAcc} className='flex items-center gap-3 hover:bg-[#F8ECEC]!'>
         <FiActivity className='text-[14px]' /> <span className='text-[14px]'>Activity Log</span>
        </MenuItem>        
        <hr className=' opacity-19'></hr>
        <MenuItem onClick={handleCloseMyAcc} className='flex items-center gap-3 hover:bg-[#F8ECEC]!'>
         <PiSignOutBold className='text-[14px]' /> <span className='text-[14px]'>Sign out</span>
        </MenuItem>

      </Menu>
         </div>
      </div>
    </header>
  );
}

export default DashboardHeader