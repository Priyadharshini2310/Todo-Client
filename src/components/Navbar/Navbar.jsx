import React, { useState } from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import {useNavigate} from "react-router-dom";
import SearchBar from '../SearchBar/SearchBar';

const Navbar = ({userInfo,}) => {
    const navigate=useNavigate();
    const [SearchQuery, setSearchQuery]=useState("");
    const onLogout=()=>{
      localStorage.clear();
        navigate("/login");
    }; 
    const handleSearch=()=>{};
    const onClearSearch=()=>{
      setSearchQuery("");
    };
           
  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
      <div className='text-xl font-medium text-black py-2'>Notes
       
      </div>
      <SearchBar

      value ={SearchQuery}
      onChange={({target}) => {
      setSearchQuery(target.value);
      }}
      handleSearch={handleSearch}
      onClearSearch={onClearSearch}
      />
      <ProfileInfo userInfo={userInfo} onLogout={onLogout}/>
    </div>
  )
}

export default Navbar
