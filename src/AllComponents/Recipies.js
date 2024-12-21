import React from 'react'
import { Recipie } from './Recipie'
import './style.css'

export const Recipies = (props) => {

  return (
    <>
      <div className='recipies flex flex-col sm:flex-row sm:flex-wrap space-y-5 sm:space-y-0 sm:gap-8 md:gap-10 py-5 sm:py-3 justify-center sm:justify-center w-[100vw]'>
        {props.recipies === null? (
          <p className='text-center p-2 sm:text-lg md:text-xl font-semibold'>No recipie</p>
        ) : (
          props.recipies.map((recipie) => {
            return <Recipie recipie={recipie} search={props.search} key={recipie.idMeal}/>
          })
        )}
      </div>
    </>
  )
}
