import {BrowserRouter, Route, Routes} from "react-router-dom"
import Netlix from "./pages/Netlix"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Player from "./pages/Player"
import Movies from "./pages/Movies"
import TvShow from "./pages/TvShow"

function App() {
 

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Netlix/>}/>
    <Route path="/signup" element={<SignUp/>}/>
    <Route path="/player" element={<Player/>}/>
    <Route path="/movies" element={<Movies/>}/>
    <Route path="/tv" element={<TvShow/>}/>
    <Route path="/login" element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  
  )
}

export default App
