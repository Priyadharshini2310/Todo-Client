import React from 'react'
import { getInitials } from '../../utils/helper'
const ProfileInfo = ({userInfo, onLogout}) => {
  if (!userInfo) {
    // Return null or a loading placeholder
    return <div>Signin/Signup</div>; // You can customize this as needed
  }
  return (
    <div className='flex items-center gap-3'>
        <div className='w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 text-slate-950 font-medium bg-slate-100'>{userInfo.lastName}</div>
        <div><p className='text-sm font-medium'>{userInfo.firstName}</p>
        <button className="text-sm text-slate-780 underline" onClick={onLogout}>Logout</button>
        </div>
    </div>
  )
}

export default ProfileInfo
