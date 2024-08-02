import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

const Welcome = () => {
  return (
    <>
      <div className="w-full h-[90px] fixed border-b border-solid flex justify-center items-center p-[14px] border-gray-300">
        <div className="font-black text-slate-800 text-[25px] logo">Todo Mate</div>
      </div>
      <div className="h-[100vh] w-full flex flex-col justify-center items-center">
        <div className="text-center mb-[40px] hidden custom pl-[20px] pr-[20px] font-bold text-slate-800/[90%] text-[25px] md:block">
        Stay organized and productive with our easy-to-use to-do list manager.
        </div>
        <div className="text-center mb-[20px] md:mb-[40px] custom pl-[20px] pr-[20px] font-bold text-slate-800/[90%] text-[18px] md:hidden">
            Join Todo Mate
        </div>

        <div className="mb-[20px]">
          <div className="font-black text-green-500 flex justify-center text-[18px] md:text-[25px] logo">20K + Users</div>
          <AvatarGroup total={9}>
            <Avatar alt="img1" src="/images/toon_10.png" />
            <Avatar alt="img2" src="/images/upstream_1.png" />
            <Avatar alt="img3" src="/images/upstream_2.png" />
            <Avatar alt="img4" src="/images/upstream_3.png" />
          </AvatarGroup>
        </div>
        <div className="flex justify-center w-full">
          <Link to="/login">
            <Button variant="contained" className="p-[25px]" >Get Started</Button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Welcome
