import React, { Component } from 'react';
import './MovieCard.css'

class MovieCard extends Component {
    constructor(props){
        super(props)
        this.state={}
    }

    render(){
        return( 
            <div className="movieCard">
                <h1>{this.props.original_title}</h1>
            </div>
        )
    }
}

export default MovieCard;