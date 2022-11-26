import './App.css'
import axios from 'axios';
import {useState,useEffect} from "react"

const movie_url = "https://www.omdbapi.com/?apikey=45f0782a&s=war"

let MovieList =[];

function App() {
  const[movies,setMovies] = useState(null);
  // const[searchItem,setSearchItem]=useState([])

  useEffect(()=>{
    axios.get(movie_url).then(response => {
      MovieList = response.data.Search
      setMovies(response.data.Search)
    }).catch(err => console.log(err))
  },[])

  const searchedMovies = (searchvalue) => {
     if(movies){
      setMovies(MovieList.filter(movie => movie.Title.toLowerCase().includes(searchvalue)))
     }
  }
  return (
  <div className='App'>
  <input className= "search" type="text" placeholder='search' onChange={(e) => searchedMovies(e.target.value.toLowerCase())}/>
  <ul className='movies'>
    {movies ?
    movies.map(movie => <li>
      <a href="/"><img src={movie.Poster}/></a>
      <p>{movie.Title}</p>
    </li>)
   :<li><p>no movies</p></li>
  }
  </ul>
  </div>
  )
}

export default App;
