import React, { Component } from 'react';
import MovieCard from '../components/MovieCard/MovieCard';
import Filter from '../components/Filter/Filter';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      didScroll: false,
      movies: [],
      minDate: undefined,
      maxDate: undefined,
      page: 1,
      currentCount: 3,
    }
    this.fetchNextPage = this.fetchNextPage.bind(this);
    this.infiniteScroll = this.infiniteScroll.bind(this);
    this.allowScroll = this.allowScroll.bind(this);
    this.handleDates = this.handleDates.bind(this);
  }

  componentDidMount() {
    // attach an event listener to allow infinite scrolling
    window.addEventListener('scroll', this.infiniteScroll);
    // immediately fetch the 1st page
    this.fetchNextPage();
  }

  // fetch the next page from themoviedb
  fetchNextPage() {
    // request the top rated movies from themoviedb, using a dynamic page variable
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=fed5b7c4a0fea83e14866a8dd8cb6baa&language=en-US&page=${this.state.page}&language=en-US`)
      .then(res => res.json())
      .then(res => res.results)
      // spread the existing movies in state and add the new movies to state
      .then(res => this.setState({ movies: [...this.state.movies, ...res] }))
  }

  handleDates(minMax, date){
    this.setState({ [minMax]: date });
  }

  // allow infinite scrolling
  infiniteScroll() {
    if (
      // if the user has scrolled to the bottom of the document (minus 500px), load the next page
      window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 500 && this.state.didScroll === false
    ) {
      // if we have recently loaded the next page, prevent any new page loads from happening by setting "didScroll" to be true
      this.setState({ didScroll: true });
      let newPage = this.state.page;
      newPage++;
      this.setState({ page: newPage });
      this.fetchNextPage();
      this.allowScroll();
    }
  }

  // 250ms after the user has loaded the next page, the can load the following page. 
  // This prevents duplicate page loads and an undesired user experience 
  allowScroll() {
    setInterval(() => {
      this.setState({ didScroll: false });
    }, 250)
  }

  // Scroll to the top of the document
  scrollUp() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }

  render() {
    return (
      <div className="container">
        <Filter dates={this.handleDates} />
        <div className="movies">
          {/* If movies exists in state map over them and render them each to the screen. */}
          {/* Otherwise render an error message. */}
          {this.state.movies ?
            this.state.movies.map(movie => 
            <MovieCard key={movie.id + movie.title} id={movie.id} minDate={this.state.minDate} maxDate={this.state.maxDate} />) : 
            <h1>No movies, please re-load the page.</h1>}
        </div>
        <div onClick={this.scrollUp} className="scrollUp">&#x21d1;</div>
      </div>
    )
  }
}

export default Home;