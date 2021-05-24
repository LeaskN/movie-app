import React, { Component } from 'react';
import './MovieCard.css';

class MovieCard extends Component {
  constructor(props) {
    super(props)
    this.state = { range: 0 }
  }

  // Request an individual movie, returning more information than the original multi-movie request
  componentDidMount() {
    fetch(`https://api.themoviedb.org/3/movie/${this.props.id}?api_key=fed5b7c4a0fea83e14866a8dd8cb6baa&language=en-US&append_to_response=release_dates`)
      .then(res => res.json())
      .then(res => this.setState({ movieData: res }))
  }

  render() {
    // render a movie if  the filters are unset or it is within the filtered dates 
    if (this.state.movieData) {
      if (
        (this.props.minDate === undefined || this.props.maxDate === undefined) ||
        (
          (new Date(this.state.movieData.release_date).getTime() > this.props.minDate) &&
          (new Date(this.state.movieData.release_date).getTime() < this.props.maxDate)
        )
      ) {
        // Destructure and bind variables from the data request stored in state
        const { original_title, release_date, vote_average, poster_path, runtime, genres } = this.state.movieData;
        // Not all movies have a certificate, and it's hidden within the release dates
        // If the movie exists, filter through the release dates, grab the US release date (if it exists) & grab the certificate
        let certification = this.state.movieData?.release_dates.results.filter(rel_date => rel_date.iso_3166_1 === 'US')[0]?.release_dates[0].certification;
        let minutes = runtime % 60;
        let hours = (runtime - minutes) / 60;
        return (
          <div className="movieCard">
            <div>
              <img alt="movie-poster" src={`https://image.tmdb.org/t/p/original/${poster_path}`} />
            </div>
            <div>
              <h1>{original_title}({release_date.slice(0, 4)})</h1>
              <h3>
                {/* if there is a certificate, render it, else render 'N/A' */}
                {certification?.length > 0 ? certification : 'N/A'}
              | Runtime: {hours} hours {minutes} minutes
              {/* get all the genre's and render them with a comma, unless it's the last genre */}
              | Genre: {genres.map((genre, i) => genres.length - 1 !== i ? genre.name + ', ' : genre.name)}
              </h3>
              <h2>Average Rating: {vote_average}/10</h2>
            </div>
          </div>
        )
      }

    }
    return null;
  }
}

export default MovieCard;