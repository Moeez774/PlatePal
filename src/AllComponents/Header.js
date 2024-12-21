import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import './style.css'

export const Header = () => {

  const [navIn, setNavIn] = useState(false)

  const navInStyle = {
     height: '10rem'
  }

  const navOutStyle = {
    height: '0rem'
  }

  //For mobile checking nav is in or not

  const navTrue = () => {
    if(navIn) {
    setNavIn(false)
    }
    else {
      setNavIn(true)
    }
  }

  //For navigation through pages

  const navigate = useNavigate()

  const goFavourite = () => {
    navigate('/favourites')
    setNavIn(false)
  }

  const goHome = () => {
    navigate('/')
    setNavIn(false)
  }


  return (
    <div>
    <div className='mobileNav bg-white h-0 flex items-end absolute smxx:text-lg sm:text-xl z-10 w-[100vw]' style={navIn? navInStyle: navOutStyle}>
      <div className='pl-10 smx:pl-14 pb-8 mr-auto'>
      <h1 onClick={goHome} className='text-white cursor-pointer'>Home</h1>
      </div>
      <div className='pr-10 smx:pr-14 pb-8 ml-auto'>
      <h1 onClick={goFavourite} className='text-white cursor-pointer'>Favourites</h1>
      </div>
    </div>
    <div className='header h-28 rounded-md flex items-center px-4 lg:px-12 relative z-20'>
      <div className='hidden lg:block'>
        <div className='name flex items-center gap-10'>
        <h1 onClick={() => navigate('/')} className='text-center text-3xl font-bold cursor-pointer'>PlatePal</h1>
            <h1 onClick={() => navigate('/')} className='headings text-white text-lg font-semibold cursor-pointer'>Home</h1>
            <h1 onClick={() => navigate('/favourites')} className='headings text-lg font-semibold cursor-pointer'>Favourites</h1>
        </div>
      </div>
        <div className='block lg:hidden'>
          <div className='flex flex-col space-y-1 cursor-pointer' onClick={navTrue}>
          <h1 className='w-5 h-0.5 bg-white' style={navIn? {background: 'black'}: {background: 'white'}}></h1>
          <h1 className='w-5 h-0.5 bg-white' style={navIn? {background: 'black'}: {background: 'white'}}></h1>
          <h1 className='w-5 h-0.5 bg-white' style={navIn? {background: 'black'}: {background: 'white'}}></h1>
          </div>
        </div>
        <div className='name mx-auto lg:hidden -left-[0.6rem] smx:-left-[0.7rem] relative'>
            <h1 onClick={() => navigate('/')} className='text-center text-3xl font-bold cursor-pointer'>PlatePal</h1>
        </div>
    </div>
    </div>
  )
}
