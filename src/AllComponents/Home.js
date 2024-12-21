import React, { useState, useEffect } from 'react'
import { Search } from './Search'
import { Recipies } from './Recipies'

export const Home = (props) => {

  //for taking value of user

    const [value, setValue] = useState("")

    //For storing recipies after fecthing

    const [recipies, SetRecipies] = useState([])

    //For loading stop and start

    const [loading, setLoading] = useState(false)

    //For checking user click search or not

    const [search, setSearch] = useState(false)

    //For checking data is fecthed or not so recpies start mounting

    const [fetched, setFetched] = useState(false)

    //Fetching recipies data

    const loadRecipies = () => {

    const fetchData = async() => {
        return new Promise((resolve, reject) => {
            setLoading(true)
            resolve(fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`))
        })
    }

    (
        async() => {
            const getData = await fetchData()
            const data = await getData.json()
            SetRecipies(data.meals)
            setLoading(false)
        }
    )()

    //Setting search false after fecth completion
        setSearch(false)
}

//On clicking search fecthing start

   if(search) {
    loadRecipies()
   }
   else if(!setSearch) {
    setFetched(false)
  }

  //setting fecth true after changing in recipies array

   useEffect(() => {
     setFetched(true)
   }, [recipies])
   
   


  return (
    <>
    <Search value={value} setValue={setValue} loading={loading} setLoading={setLoading} search={search} setSearch={setSearch}/>
    { fetched? <Recipies recipies={recipies} favourite={props.favourite} setFavourite={props.SetFavourite} search={search} fetched={fetched}/>: ""}
    </>
  )
}
