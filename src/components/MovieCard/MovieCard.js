import React, { Component } from 'react';
import './MovieCard.css'

class MovieCard extends Component {
    constructor(props){
        super(props)
        this.state={}
    }

    componentDidMount(){
        fetch(`https://api.themoviedb.org/3/movie/${this.props.id}?api_key=fed5b7c4a0fea83e14866a8dd8cb6baa&language=en-US&append_to_response=release_dates`)
            .then(res => res.json())
            .then(res => this.setState({movieData: res}))
    }

    render(){
        if(this.state.movieData){
            const { original_title, release_date, vote_average, poster_path, runtime, genres } = this.state.movieData;
            let certification = this.state.movieData.release_dates.results.filter(rel_date => rel_date.iso_3166_1 === 'US' )[0].release_dates[0].certification;
            return( 
                <div className="movieCard">
                    <h1>{original_title}({release_date.slice(0, 4)})</h1>
                    <h1>Average Rating: {vote_average}</h1>
                    <h1>{certification.length > 0 ? certification : 'N/A'}</h1>
                    <h1>Runtime: {runtime}</h1>
                    <img src={`https://image.tmdb.org/t/p/original/${poster_path}`} />
                    <h1>Genre: {genres.map((genre, i) => genres.length - 1 !== i ? genre.name +', ' : genre.name)}</h1>
                </div>
            )
        }
        return null;
    }
}

export default MovieCard;