import React, { Component } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './AllMovies.css';

class AllMovies extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      
    }
  }

  render() {
    // Destructure and bind variables from the data passed from the home component
    const {movies, maxDate, minDate} = this.props.data;
    return (
      <div className="movies">
        {/* If movies exists in props map over them and render them each to the screen. */}
        {/* Otherwise render an error message. */}
        {
          movies ?
          movies.map(movie => 
          <MovieCard key={movie.id + movie.title} id={movie.id} minDate={minDate} maxDate={maxDate} />) : 
          <h1>No movies, please re-load the page.</h1>
        }
      </div>
    )
  }
}

export default AllMovies;