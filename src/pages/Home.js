import React, { Component } from 'react';
import MovieCard from '../components/MovieCard/MovieCard'

class Home extends Component {
    constructor(props){
      super(props)
      this.state={
        movies: [],
        minRange: undefined,
        maxRange: undefined,
        page: 1
      }
      this.fetchNextPage = this.fetchNextPage.bind(this);
      this.pageEnd = this.pageEnd.bind(this);
    }

    componentDidMount(){
      this.fetchNextPage()
    }

    fetchNextPage(){
      console.log(this.state.page)

      fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=fed5b7c4a0fea83e14866a8dd8cb6baa&language=en-US&page=${this.state.page}&language=en-US`)
        .then(res => res.json())
        .then(res => {console.log(res); return res.results})
        .then(res => this.setState({movies: [...this.state.movies, ...res]}))
    }

    inputChange(e){
      this.setState({[e.target.id]: new Date(e.target.value).getTime()})
    }

    pageEnd(){
      if(window.scrollY > document.body.clientHeight - 2000){
        let currentPage = this.state.page;
        this.setState({page: currentPage + 1})
        this.fetchNextPage();
      }
    }

    render(){
      
      return( 
        <div onWheel={this.pageEnd}>
          <p>Start Date:<input type="date" min="1" id="minRange" onChange={event => this.inputChange(event)}></input></p>
          <p>End Date: <input type="date" min={this.state.range} id="maxRange" onChange={event => this.inputChange(event)}></input></p>
          {this.state.movies ?
          this.state.movies.map(movie => <MovieCard key={movie.id} id={movie.id} minRange={this.state.minRange} maxRange={this.state.maxRange}/>) : <h1>No movies</h1>}
        </div>
      )
    }
}

export default Home;