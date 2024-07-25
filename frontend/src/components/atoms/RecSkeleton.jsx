import React from 'react'
import Skeleton from '@mui/material/Skeleton';

const RecSkeleton = () => {
  return (
    <>
      <Skeleton variant="rectangular" className="rounded-[20px]" height={170} />
      <Skeleton variant="rectangular" className="rounded-[20px]" height={170} />
      <Skeleton variant="rectangular" className="rounded-[20px]" height={170} />
      <Skeleton variant="rectangular" className="rounded-[20px]" height={170} />
      <Skeleton variant="rectangular" className="rounded-[20px]" height={170} />
      <Skeleton variant="rectangular" className="rounded-[20px]" height={170} />
      <Skeleton variant="rectangular" className="rounded-[20px]" height={170} />
    </>
  )
}

export default RecSkeleton
