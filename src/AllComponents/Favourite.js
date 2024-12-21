import React, { useState, useEffect, useRef } from 'react'
import './style.css'
import { useInView } from 'react-intersection-observer'
export const Favourite = (props) => {

    const { ref, inView} = useInView({
        threshold: 0.1,
        triggerOnce: true,
      })

    //For showing favourite recipies pic which are clickable 

    const [innerClick, SetInnerClick] = useState(false)

    const [isRemoved, SetRemoved] = useState(false)

    const moveDown = {
        transform: 'scale(0)'
    }

    const moveUp = {
        transform: 'scale(1)'
    }

    //Set innerclick false when isClick is false so scale downed pic can scaleup

    useEffect(() => {

        if(!props.isClick) {
            SetInnerClick(false)
        }

    }, [props.isClick])

    //after clicking pic

    const setClick = () => {
        props.show.length = 0
        SetInnerClick(true)
        props.SetClick(true)
        props.SetShow(props.favourite)
    }


    return (
        <div ref={ref} className={`fav -mt-[7rem] smx:-mt-[8rem] sm:-mt-[10rem] flex flex-row justify-center overflow-hidden lg:p-5 lg:space-x-10 cursor-pointer`} onClick={setClick} style={innerClick ?moveDown: moveUp}>
            <div className='recipie block1 favR rounded-3xl py-3 grid place-items-center lg:-translate-x-0' >
                <div className='flex flex-col space-y-3'>
                    <div className='flex justify-center'>
                        <img className='rounded-3xl w-[9rem] smx:w-[13rem] sm:w-[15rem] md:w-[15rem] lg:w-[15rem]' src={props.favourite.strMealThumb} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}
