import React, { Component } from 'react';
import MovieCard from '../components/MovieCard/MovieCard'

class Home extends Component {
    constructor(props){
      super(props)
      this.state={}
    }

    componentDidMount(){
      fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=fed5b7c4a0fea83e14866a8dd8cb6baa&language=en-US&page=1&language=en-US')
        .then(res => res.json())
        .then(res => this.setState({movies: res}))
    }

    render(){
      return( 
        this.state.movies ?
        this.state.movies.results.map(movie => <MovieCard {...movie}/>) : <h1>No movies</h1>
      )
    }
}

export default Home;