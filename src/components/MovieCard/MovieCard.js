import React, { Component } from 'react';
import './MovieCard.css'

class MovieCard extends Component {
    constructor(props){
        super(props)
        this.state={}
    }

    render(){
        const { original_title, release_date, id } = this.props;
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=fed5b7c4a0fea83e14866a8dd8cb6baa`)
            .then(res => res.json())
            .then(res => console.log(res))
        return( 
            <div className="movieCard">
                <h1>{this.props.original_title}({this.props.release_date.slice(0, 4)})</h1>
            </div>
        )
    }
}

export default MovieCard;