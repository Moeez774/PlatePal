import { useState, useEffect } from "react";
import { Home } from './AllComponents/Home'
import { Favourites } from './AllComponents/Favourites'
import { Header } from "./AllComponents/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom"

function App() {

  const [favourite, SetFavourite] = useState([])

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home favourite={favourite} SetFavourite={SetFavourite} />} />
          <Route path='/favourites' element={<Favourites favourite={favourite} SetFavourite={SetFavourite} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
