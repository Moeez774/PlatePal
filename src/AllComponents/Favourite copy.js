import React, { useState, useEffect } from 'react'
import './style.css'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
export const Favourite = (props) => {

    //Collecting ingredients from recipie for showing
    
      const [allIngrd, SetAllIngrd] = useState([])
    
    //   //using useEffect so items load in ingredients array only once and not duplicate
    
      useEffect(() => {
    
        const ingredients = []
    
    //     //Taking all elements which have strIngredient in their name
    
        for (let ingredient in props.favourite) {
          if (ingredient.includes("strIngredient") && props.favourite[ingredient] != "") {
            ingredients.push(props.favourite[ingredient])
          }
        }
    
        SetAllIngrd(ingredients)
    
      }, [])
    
    //   //Checking for screen
    
      const [isMobile, SetMobile] = useState(false)
    
      const [currentSlide, SetCurrentSlide] = useState(1)
    
      const [userClick, SetUserClick] = useState(false)
    
      const [pcSlides, SetPcSlides] = useState(0)
    
    //   //For checking screen
      
      useEffect(() => {
        if(window.matchMedia("(max-width: 1024px)").matches) {
           SetMobile(true)
        }
        else {
          SetMobile(false)
        }
      }, [])
      
    
      const leftBtn = () => {
        if(pcSlides > -1) {
         SetPcSlides(pcSlides - 1)
      }
      }
    
      const rightBtn = () => {
        if(pcSlides < 1) {
        SetPcSlides(pcSlides + 1)
        }
     }
    
    //   //For swiping in mobile responsiveness
    
    //   //Currently setting second block as front
    
            let startX;
    
      
          const startTouch = ((e) => {
    
            if(window.matchMedia("(max-width: 1024px)").matches) {
              SetUserClick(true)
            startX = e.touches[0].clientX
            } else {
              return
            }
          })
      
          const endTouch = ((e) => {
    
            if(window.matchMedia("(max-width: 1024px)").matches) {
            const endX = e.changedTouches[0].clientX
      
            if (startX - endX > 50 && currentSlide < 2) {
              SetCurrentSlide(currentSlide + 1)
            }
            else if (endX - startX > 50 && currentSlide > 0) {
              SetCurrentSlide(currentSlide - 1)
            }
          } else {
            return
          }
          })
    
          let mobileTranform;    
          
          //Running transition for mobile responsiveness
    
          if(window.matchMedia("(max-width: 1024px)").matches) {
    
          mobileTranform = {
            transform: `translateX(${currentSlide * -100}%)`
          }
        }
      
    
      //Styles for arrows and their heeadings for swipe awareness
    
      const right = {
        animation: 'moveRight 2s infinite linear'
      }
    
      const left = {
        animation: 'moveLeft 2s infinite linear'
      }
    
      const scale = {
        animation: 'scaleUp 2s infinite linear'
      }
    
      let sideSlide;
      let mainSlide;
    
      //Transition of slides for pc responsiveness
    
      if(window.matchMedia("(min-width: 1300px)").matches) {
        sideSlide = {
          transform: `translateX(calc((${pcSlides * - 50}vw) - (-10px))) scale(0.5)`,
          filter: 'blur(4px)'
        }
      
        mainSlide = {
            transform: `translateX(calc((${pcSlides * - 50}vw) - (-10px)))`,
          filter: 'blur(0px)'
        }
      }
      else if(window.matchMedia("(min-width: 1024px)").matches) {
    
      sideSlide = {
        transform: `translateX(calc((${pcSlides * - 52.3}vw) - (-10px))) scale(0.5)`,
        filter: 'blur(4px)'
      }
    
      mainSlide = {
          transform: `translateX(calc((${pcSlides * - 52.3}vw) - (-10px)))`,
        filter: 'blur(0px)'
      }
    
    }
    
    
    
      //Click event for video button
    
      const video = () => {
        window.open(props.favourite.strYoutube)
      }

  return (
    <div className='fav sm:mx-5 md:mx-8 lg:mx-0 rounded-3xl flex flex-row lg:justify-center overflow-hidden w-[100vw] lg:p-5 h-[45vh] sm:h-[45vh] xxxl:h-[91vh] lg:space-x-10'>
          <div className='block1 recipie instruct p-3 smx:p-5 grid place-items-center h-[40vh] sm:h-[45vh] lg:h-[43vh] xxxl:h-[86vh] overflow-auto lg:-ml-5 -translate-x-[100%] lg:-translate-x-0' style={isMobile && userClick? mobileTranform: pcSlides===-1? mainSlide: sideSlide} onTouchStart={startTouch} onTouchEnd={endTouch} >
            <p className='text-xs smx:text-sm font-normal text-center sm:text-lg lg:text-sm'>{props.favourite.strInstructions}</p>
          </div>
          <div className='flex items-center relative z-20 justify-start'>
            <div className='hidden lg:block'>
            <button onClick={leftBtn} className='moveBtns px-6 py-6'><FaArrowLeft/></button>
            </div>
          </div>
          <div className='recipie block1 rounded-3xl py-5 smxx:p-5 sm:py-5 sm:px-2 md:p-5 sm:w-[46vw] lg:w-[30vw] h-[40vh] sm:h-[45vh] lg:h-[43vh] xxxl:h-[86vh] grid place-items-center -translate-x-[100%] lg:-translate-x-0' style={isMobile && userClick? mobileTranform: pcSlides===0? mainSlide: sideSlide} onTouchStart={startTouch} onTouchEnd={endTouch}>
            <div className='flex flex-col space-y-3'>
              <div className='flex justify-center'>
                <img className='rounded-3xl w-[15rem] sm:w-[15rem] md:w-[15rem] lg:w-[15rem]' src={props.favourite.strMealThumb} alt="" />
              </div>
              <div className='overflow-hidden'>
                <h1 className='text-center font-bold text-xl smx:text-2xl md:text-3xl lg:text-xl mx-2'>{props.favourite.strMeal}</h1>
              </div>
              <div className='arrows text-lg flex px-5'>
                <div className='mr-auto flex flex-col'>
                  <p style={left}><FaArrowLeft /></p>
                  <p className='font-semibold text-sm' style={scale}>Instr</p>
                </div>
                <div className='ml-auto flex flex-col relative z-20'>
                  <p className='ml-auto' style={right}><FaArrowRight /></p>
                  <p className='font-semibold text-sm' style={scale}>Ingr</p>
                </div>
              </div>
              <div className='flex flex-col lg:flex-row mx-auto justify-center font-semibold space-y-2 lg:space-y-0 lg:space-x-3 smxx:text-lg lg:text-sm lgx:text-lg'>
                <p className='p-2 text-center'>Cuisine: {props.favourite.strArea}</p>
                <p className='p-2 text-center'>Category: {props.favourite.strCategory}</p>
              </div>
              <div className='flex justify-center space-x-3 py-2 smxx:space-x-3 text-sm font-semibold'>
                <button onClick={video} className='Btn pt-2 pb-2 px-3 smxx:px-6 sm:px-4  md:px-6'>Video</button>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-start relative z-20'>
          <div className='hidden lg:block ml-[1rem]'>
            <button onClick={rightBtn} className='moveBtns moveBtn1 px-6 py-6'><FaArrowRight/></button>
          </div>
          </div>
          <div className='block1 ingred recipie p-3 smx:p-5 h-[40vh] sm:h-[45vh] lg:h-[43vh] xxxl:h-[86vh] grid place-items-center -translate-x-[100%] lg:-translate-x-0' style={isMobile && userClick? mobileTranform: pcSlides===1? mainSlide: sideSlide} onTouchStart={startTouch} onTouchEnd={endTouch}>
            <div className='text-lg sm:text-xl md:text-2xl lg:text-lg px-3 xl:text-xl font-normal text-center flex flex-wrap justify-center items-center gap-3'>{allIngrd.map((e, index) => {
              return <p key={index}>{index + 1}. {e}</p>
            })}</div>
          </div>
        </div>
  )
}
