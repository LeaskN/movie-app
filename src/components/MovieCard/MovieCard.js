import React, { Component } from 'react';

class MovieCard extends Component {
    constructor(props){
        super(props)
        this.state={}
    }

    componentDidMount(){
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=fed5b7c4a0fea83e14866a8dd8cb6baa&language=en-US&page=1')
            .then(res => res.json())
            .then(res => console.log(res))
    }

    render(){
        return( 
            <h1>Test</h1>
        )
    }
}

export default MovieCard;