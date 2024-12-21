import React, { useState, useEffect, useRef } from 'react'
import { Favourite } from './Favourite'
import {  ShowFavourite } from './ShowFavourite'
import { useInView } from 'react-intersection-observer'
import './style.css'

export const Favourites = () => {

  //for inView Animation

  const { ref, inView} = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  //Getting recipies from localstorage for showing 

  const [favourite, setFavourite] = useState([])

  //For showing recipie details

  const [show, SetShow] = useState([])

  //for checking whether pic is click or not for details

  const [isClick, SetClick] = useState(false)

  //Getting recipies from local storage

  useEffect(() => {

    const favRecipie = []
    
    for(let i=0;i<localStorage.length;i++) {

      const favouriteKey = localStorage.key(i)

      const fav = JSON.parse(localStorage.getItem(favouriteKey))

      favRecipie.push(fav)
    }

    setFavourite(favRecipie)

  }, [])

  const [remove, setRemove] = useState(false)

  


  
  return (
    <div className='flex flex-col justify-center'>
    <div className='favourites mt-16 mb-48 sm:mb-56'>
      <h1 ref={ref} className={`text-center mx-5 font-bold text-white text-3xl sm:text-4xl md:text-4xl lg:text-5xl ${inView? "tracking-in-expand": ""}`}>Favourites</h1>
    </div>
    <div className='overflow-hidden py-5 mb-20 flex justify-center'>
      <ShowFavourite show={show} isClick={isClick} favourite={favourite} setFavourite={setFavourite} SetClick={SetClick}/>
    </div>
    <div className='flex flex-wrap justify-center mx-2 smx:mx-2 md:mx-4 gap-2'>
       {favourite.map((e) => {
        return <Favourite key={e.idMeal} SetShow={SetShow} show={show} isClick={isClick} SetClick={SetClick} favourite={e}/>
       })}
    </div>
    </div>
  )
}
