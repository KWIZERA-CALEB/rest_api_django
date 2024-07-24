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
        <div className="text-center mb-[40px] custom pl-[200px] pr-[200px] font-bold text-slate-800/[90%] text-[25px]">
        Stay organized and productive with our easy-to-use to-do list manager. Whether you’re planning your day, setting goals, or tracking tasks, our app is here to help you stay on top of it all. Add tasks, set deadlines, and prioritize your activities to achieve more every day.
        </div>

        <div className="mb-[20px]">
          <div className="font-black text-green-500 text-[25px] logo">20K + Users</div>
          <AvatarGroup total={9}>
            <Avatar alt="img1" src="/images/toon_10.png" />
            <Avatar alt="img2" src="/images/upstream_1.png" />
            <Avatar alt="img3" src="/images/upstream_2.png" />
            <Avatar alt="img4" src="/images/upstream_3.png" />
          </AvatarGroup>
        </div>
        <Link to="/login">
          <Button variant="contained" className="p-[25px]" >Get Started</Button>
        </Link>
      </div>
    </>
  )
}

export default Welcome
