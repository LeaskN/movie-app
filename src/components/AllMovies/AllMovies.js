import React, { Component } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './AllMovies.css';

class AllMovies extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      
    }
  }

  // if the date inputs receive any changes update the minDate or maxDate in props (coming from home component)
  inputChange(e) {
    this.props.dates([e.target.id], new Date(e.target.value).getTime());
  }

  render() {
    const {movies, maxDate, minDate} = this.props.data;
    return (
      <div className="movies">
        {/* If movies exists in state map over them and render them each to the screen. */}
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