import React, {useCallback, useEffect, useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoafing] = useState(false);
  const [error, setError] = useState(null);


  const  fetchMovieHandler = useCallback(async () =>{
    setIsLoafing(true);
    setError(null);
    try {
      const response = await fetch('https://swapi.dev/api/films')
      if(!response.ok){
        throw new Error('Something got wrong')
      }
      const data = await response.json();
      const transformedMovies = data.results.map(movieData => {
            return {
              id: movieData.episode_id,
              title: movieData.title,
              openingText: movieData.opening_crawl,
              releaseDate: movieData.release_date
            }
          }
      )
      setMovies(transformedMovies);
      setIsLoafing(false);
    }catch (error){
      setError(error.message);
    }
    setIsLoafing(false);
  }, []);

    useEffect(() => {
        fetchMovieHandler();
    }, [fetchMovieHandler])


  let content = <p>Found no movies</p>

  if (movies.length > 0){
    content = <MoviesList movies={movies}/>
  }

  if(error){
    content = <p>{error}</p>
  }

 if(isLoading){
   content = <p>Loading</p>
 }


  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
