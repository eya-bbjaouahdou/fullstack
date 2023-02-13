import React from 'react';
import { BrowserRouter, Route , Routes } from "react-router-dom";
import Login from './pages/Login';
import Movieflix from './pages/Movieflix';
import Movies from './pages/Movies';
import Player from './pages/Player';
import Signup from './pages/Signup';
import TVShows from './pages/TVShows';
import UserListedMovies from './pages/UserListedMovies';

export default function 
hello() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/signup' element={<Signup/>}/>
      <Route exact path='/player' element={<Player/>}/>
      <Route exact path='/movies' element={<Movies/>}/>
      <Route exact path='/tv' element={<TVShows/>}/>
      <Route exact path='/mylist' element={<UserListedMovies/>}/>
      <Route exact path='/' element={<Movieflix/>}/>
    </Routes>
    </BrowserRouter>
  );
}

