import React, { useState, useEffect } from 'react'
import './style.css'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

export const ShowFavourite = (props) => {

    
      //Collecting ingredients from recipie for showing
    
      const [allIngrd, SetAllIngrd] = useState([])
    
      //using useEffect so items load in ingredients array only once and not duplicate
    
      useEffect(() => {
    
        const ingredients = []
    
        //Taking all elements which have strIngredient in their name
    
        for (let ingredient in props.show) {
          if (ingredient.includes("strIngredient") && props.show[ingredient] != "") {
            ingredients.push(props.show[ingredient])
            console.log(ingredient)
          }
        }

        console.log(ingredients)
    
        SetAllIngrd(ingredients)
    
      }, [props.show])
    
      //Checking for screen
    
      const [isMobile, SetMobile] = useState(false)
    
      const [currentSlide, SetCurrentSlide] = useState(1)
    
      const [userClick, SetUserClick] = useState(false)
    
      const [pcSlides, SetPcSlides] = useState(0)
    
      //For checking screen
      
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
    
      //For swiping in mobile responsiveness
    
      //Currently setting second block as front
    
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
        window.open(props.show.strYoutube)
      }

      //Transition for scale up and down

      const scaleUp = {
        transform: 'scale(0.8)',
        zIndex: '10'
      }

      const scaleDown = {
        transform: 'scale(0)',
        zIndex: '10'
      }

      //Set click false on go back

      const setClick = () => {
        props.SetClick(false)
      }

      const remove = () => {
        props.SetClick(false)
        localStorage.removeItem(props.show.idMeal)

        props.setFavourite(props.favourite.filter((item) => item !== props.show))
      }

  return (
    <div className='show absolute sm:mx-5 md:mx-8 lg:mx-0 rounded-3xl flex flex-row lg:justify-center overflow-hidden w-[100vw] lg:p-5 h-[50vh] sm:h-[50vh] lg:h-[52vh] xxxl:h-[96vh] lg:space-x-10' style={props.isClick? scaleUp: scaleDown}>
          <div className='block1 recipie instruct p-3 smx:p-5 grid place-items-center h-[45vh] sm:h-[50vh] lg:h-[48vh] xxxl:h-[91vh] overflow-auto lg:-ml-5 -translate-x-[100%] lg:-translate-x-0' style={isMobile && userClick? mobileTranform: pcSlides===-1? mainSlide: sideSlide} onTouchStart={startTouch} onTouchEnd={endTouch} >
            <p className='text-lg smx:text-lg md:text-xl font-normal text-center'>{props.show.strInstructions}</p>
          </div>
          <div className='flex items-center relative z-20 justify-start'>
            <div className='hidden lg:block'>
            <button onClick={leftBtn} className='moveBtns px-6 py-6'><FaArrowLeft/></button>
            </div>
          </div>
          <div className='recipie block1 rounded-3xl py-5 smxx:p-5 sm:py-5 sm:px-2 md:p-5 sm:w-[46vw] lg:w-[30vw] h-[45vh] sm:h-[50vh] lg:h-[48vh] xxxl:h-[91vh] grid place-items-center -translate-x-[100%] lg:-translate-x-0' style={isMobile && userClick? mobileTranform: pcSlides===0? mainSlide: sideSlide} onTouchStart={startTouch} onTouchEnd={endTouch}>
            <div className='flex flex-col space-y-3'>
              <div className='flex justify-center'>
                <img className='rounded-3xl w-[15rem] sm:w-[15rem] md:w-[15rem] lg:w-[15rem]' src={props.show.strMealThumb} alt="" />
              </div>
              <div className='overflow-hidden'>
                <h1 className='text-center font-bold text-xl smx:text-2xl md:text-3xl lg:text-xl mx-2'>{props.show.strMeal}</h1>
              </div>
              <div className='arrows text-lg flex px-10 sm:px-8'>
                <div className='mr-auto flex flex-col'>
                  <p style={left}><FaArrowLeft /></p>
                  <p className='font-semibold text-sm' style={scale}>Instr</p>
                </div>
                <div className='ml-auto flex flex-col relative z-20'>
                  <p className='ml-auto' style={right}><FaArrowRight /></p>
                  <p className='font-semibold text-sm' style={scale}>Ingr</p>
                </div>
              </div>
              <div className='flex flex-col lg:flex-row mx-auto justify-center font-semibold space-y-0 lg:space-y-0 lg:space-x-3 smxx:text-lg lg:text-sm lgx:text-lg'>
                <p className='p-2 text-center'>Cuisine: {props.show.strArea}</p>
                <p className='p-2 text-center'>Category: {props.show.strCategory}</p>
              </div>
              <div className='flex justify-center space-x-3 py-2 smxx:space-x-3 text-sm font-semibold'>
                <button onClick={video} className='Btn pt-2 pb-2 px-3 smxx:px-6 sm:px-4  md:px-6'>Video</button>
              </div>
              <div className='flex justify-center space-x-3 py-2 smxx:space-x-3 text-sm font-semibold'>
                <button className='Btn pt-2 pb-2 px-3 smxx:px-6 sm:px-4  md:px-6' onClick={setClick}>Go Back</button>
                <button className='Btn pt-2 pb-2 px-3 smxx:px-6 sm:px-4  md:px-6' onClick={remove}>Remove</button>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-start relative z-20'>
          <div className='hidden lg:block ml-[1rem]'>
            <button onClick={rightBtn} className='moveBtns moveBtn1 px-6 py-6'><FaArrowRight/></button>
          </div>
          </div>
          <div className='block1 ingred recipie p-3 smx:p-5 h-[45vh] sm:h-[50vh] lg:h-[48vh] xxxl:h-[91vh] grid place-items-center -translate-x-[100%] lg:-translate-x-0' style={isMobile && userClick? mobileTranform: pcSlides===1? mainSlide: sideSlide} onTouchStart={startTouch} onTouchEnd={endTouch}>
            <div className='text-lg sm:text-xl md:text-2xl lg:text-lg px-3 xl:text-xl font-normal text-center flex flex-wrap justify-center items-center gap-3'>{allIngrd.map((e, index) => {
              return <p key={index}>{index + 1}. {e}</p>
            })}</div>
          </div>
        </div>
  )
}
