import React from 'react'
import './style.css'
import { useInView } from 'react-intersection-observer'

export const Search = (props) => {

  const { ref, inView} = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  //Style for loading

    const loadingStyle = {
        animation: 'movingCircle 1.5s infinite linear'
    }

    const startLoading = {
        display: 'block',
        overflow: 'hidden'
    }

    const stopLoading = {
        display: 'none'
    }

    const searchSecStyle = {
      position: 'absolute',
      zIndex: '10'
    }

    const clickAction = () => {
        props.setSearch(true)
    }

  return (
    <>
    <div ref={ref} className={`searchHeading my-16 opacity-0 flex flex-col justify-center gap-7 lg:gap-10 w-[100vw] overflow-x-hidden ${inView? "showing": ""}`} style={props.loading? searchSecStyle: null}>
      <div className='searchHeading'>
        <h1 className='text-center text-3xl md:text-4xl font-bold py-2'>Search any meal</h1>
      </div>
      <div>
        <p className='text-center mx-10 text-sm font-normal'>Search by Meal, Ingredient, Category and Cuisine name</p>
      </div>
      <div className='flex justify-center'>
        <input value={props.value} onChange={(e) => props.setValue(e.target.value)} className='outline-none rounded-3xl border text-black font-normal pl-4 py-2 sm:pr-1 md:w-[23rem] border-gray-400' type="text"/>
      </div>
      <div className='flex justify-center'>
        <button className='searchBtn bg-blue-600 py-2 px-6 rounded-3xl font-semibold md:px-8 lg:px-10' onClick={clickAction}>Search</button>
      </div>
    </div>
    <div style={props.loading? startLoading: stopLoading}>
    <div className='loading h-[35vh] sm:h-[35vh] md:h-[40vh] lg:h-[60vh] justify-center relative z-20 flex flex-col items-center space-y-1' style={loadingStyle}>
        <div className='flex space-x-1'>
           <div className='circle w-5 h-5'></div>
           <div className='circle w-5 h-5'></div>
        </div>
        <div className='flex space-x-1'>
        <div className='circle w-5 h-5'></div>
        <div className='circle w-5 h-5'></div>
        </div>
    </div>
    </div>
    </>
  )
}
