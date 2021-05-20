import React, { Component } from 'react';
import MovieCard from '../components/MovieCard/MovieCard'

class Home extends Component {
    constructor(props){
      super(props)
      this.state={
        didScroll: false,
        movies: [],
        minRange: undefined,
        maxRange: undefined,
        page: 1,
        currentCount: 3,
      }
      this.fetchNextPage = this.fetchNextPage.bind(this);
      this.infiniteScroll = this.infiniteScroll.bind(this);
      this.allowScroll = this.allowScroll.bind(this);
    }

    componentDidMount(){
      window.addEventListener('scroll', this.infiniteScroll);
      this.fetchNextPage()
    }

    fetchNextPage(){
      fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=fed5b7c4a0fea83e14866a8dd8cb6baa&language=en-US&page=${this.state.page}&language=en-US`)
        .then(res => res.json())
        .then(res => {console.log(res); return res.results})
        .then(res => this.setState({movies: [...this.state.movies, ...res]}))
    }

    inputChange(e){
      this.setState({[e.target.id]: new Date(e.target.value).getTime()});
    }

    infiniteScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop > document.documentElement.offsetHeight && this.state.didScroll === false
      ) {
        this.setState({didScroll: true});
        let newPage = this.state.page;
        newPage++
        this.setState({ page: newPage });
        this.fetchNextPage();
        this.allowScroll();
      }
    }

    allowScroll(){
      setInterval(() => {
        this.setState({didScroll: false})
      }, 250)
    }
    render(){
      
      return( 
        <div className="container">
          <div className="filter">
            <p>Start Date:<input type="date" min="1" id="minRange" onChange={event => this.inputChange(event)}></input></p>
            <p>End Date: <input type="date" min={this.state.range} id="maxRange" onChange={event => this.inputChange(event)}></input></p>
          </div>
          <div className="spacer"></div>
          <div className="movies">
            {this.state.movies ?
            this.state.movies.map(movie => <MovieCard key={movie.id + movie.title} id={movie.id} minRange={this.state.minRange} maxRange={this.state.maxRange}/>) : <h1>No movies</h1>}
          </div>
        </div>
      )
    }
}

export default Home;