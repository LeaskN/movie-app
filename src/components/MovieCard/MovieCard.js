import React, { Component } from 'react';
import './MovieCard.css'

class MovieCard extends Component {
    constructor(props){
        super(props)
        this.state={range:0}
    }

    componentDidMount(){
        fetch(`https://api.themoviedb.org/3/movie/${this.props.id}?api_key=fed5b7c4a0fea83e14866a8dd8cb6baa&language=en-US&append_to_response=release_dates`)
            .then(res => res.json())
            .then(res => this.setState({movieData: res}))
    }    

    render(){
        if(
            (this.state.movieData && 
                (this.props.minRange === undefined || this.props.maxRange === undefined)
            ) || (this.state.movieData && 
                (
                    (new Date(this.state.movieData.release_date).getTime() > this.props.minRange) && 
                    (new Date(this.state.movieData.release_date).getTime() < this.props.maxRange)
                )
            )
        ){
            const { original_title, release_date, vote_average, poster_path, runtime, genres } = this.state.movieData;
            let certification = this.state.movieData?.release_dates.results.filter(rel_date => rel_date.iso_3166_1 === 'US' )[0]?.release_dates[0].certification;
            let minutes = runtime % 60;
            let hours = (runtime - minutes) / 60;
            return( 
                <div className="movieCard">
                    <div>
                        <img alt="movie-poster" src={`https://image.tmdb.org/t/p/original/${poster_path}`} />
                    </div>
                    <div>
                        <h1>{original_title}({release_date.slice(0, 4)})</h1>
                        <h3>{certification?.length > 0 ? certification : 'N/A'} | Runtime: {hours} hours {minutes} minutes | Genre: {genres.map((genre, i) => genres.length - 1 !== i ? genre.name +', ' : genre.name)}</h3>
                        <h2>Average Rating: {vote_average}/10</h2>
                    </div>
                </div>
            )
        }
        return null;
    }
}

export default MovieCard;