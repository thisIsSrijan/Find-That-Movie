import React from "react";
import {useEffect , useState} from "react";
import './App.css';
import searchIcon from './search.svg';
import MovieCard from "./MovieCard";
//API Key: f3345c0e

const API_URL  = ' http://www.omdbapi.com/?i=tt3896198&apikey=f3345c0e';

function App(){
    const [Movies , setMovies] = useState([]); //default value of the Movies is an empty array
    const [searchTerm , setSearchTerm] = useState(''); //setting initial value as an empty string because when page loads the search bar should be empty
    var i = 0;
    const searchMovie = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json(); //parsing the fetched data into JSON 

        setMovies(data.Search);
        console.log(Movies);
    } 

    useEffect(() => {
        searchMovie('random');
    } , []);

    return (
        <div className = "app"> 
            <h1>SearchThatMovie</h1>

            <div className="search">
                <input placeholder="search movies" value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value)}} />
                <img src={searchIcon} alt="search" onClick={() => {searchMovie(searchTerm)}}/>
            </div>

            {
                Movies?.length>0 ? (<div className="container"> { Movies.map((movie) =>{return <MovieCard key = {i++} movie = {movie}/>} )} </div>) : (<div className = "empty"><h2>No movies found</h2></div>)
            }

        </div>
    )
}

export default App;