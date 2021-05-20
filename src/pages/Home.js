import React, { Component } from 'react';
import MovieCard from '../components/MovieCard/MovieCard'

class Home extends Component {
    constructor(props){
      super(props)
      this.state={
        minRange: undefined,
        maxRange: undefined,
      }
    }

    componentDidMount(){
      fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=fed5b7c4a0fea83e14866a8dd8cb6baa&language=en-US&page=${this.state.page}&language=en-US`)
        .then(res => res.json())
        .then(res => this.setState({movies: res}))
    }

    inputChange(e){
      this.setState({[e.target.id]: new Date(e.target.value).getTime()})
    }


    render(){
      return( 
        <div>
          <p>Start Date:<input type="date" min="1" id="minRange" onChange={event => this.inputChange(event)}></input></p>
          <p>End Date: <input type="date" min={this.state.range} id="maxRange" onChange={event => this.inputChange(event)}></input></p>
          {this.state.movies ?
          this.state.movies.results.map(movie => <MovieCard key={movie.id} id={movie.id} minRange={this.state.minRange} maxRange={this.state.maxRange}/>) : <h1>No movies</h1>}
        </div>
      )
    }
}

export default Home;