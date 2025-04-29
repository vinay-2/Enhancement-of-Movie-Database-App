import React from 'react'
import Loader from 'react-loader-spinner'
import MovieCard from '../MovieCard'
import NavBar from '../NavBar'
import Pagination from '../Pagination'
import './index.css'

class TopRated extends React.Component {
  state = {
    isLoading: true,
    topRatedMovieResponse: {totalPages: 0, results: []},
    currentPage: 1,
  }

  componentDidMount() {
    this.getTopRatedMoviesResponse(this.state.currentPage)
  }

  getUpdatedData = data => ({
    totalPages: data.total_pages,
    results: data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      posterPath: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      voteAverage: movie.vote_average,
    })),
  })

  getTopRatedMoviesResponse = async page => {
    this.setState({isLoading: true})
    const API_KEY = 'f32b79895b21468afbdd6d5342cbf3da'
    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`

    try {
      const response = await fetch(apiUrl)
      const data = await response.json()
      this.setState({
        isLoading: false,
        topRatedMovieResponse: this.getUpdatedData(data),
        currentPage: page,
      })
    } catch (error) {
      console.error('Error fetching top rated movies:', error)
      this.setState({
        isLoading: false,
        topRatedMovieResponse: {totalPages: 0, results: []},
      })
    }
  }

  renderLoadingView = () => (
    <div className='loader-container'>
      <Loader type='TailSpin' color='#032541' />
    </div>
  )

  renderMoviesList = () => (
    <ul className='movies-list'>
      {this.state.topRatedMovieResponse.results.map(movie => (
        <MovieCard key={movie.id} movieDetails={movie} />
      ))}
    </ul>
  )

  render() {
    const {isLoading, topRatedMovieResponse, currentPage} = this.state

    return (
      <>
        <NavBar />
        <div className='route-page-body'>
          <h1>Top Rated</h1>
          {isLoading ? this.renderLoadingView() : this.renderMoviesList()}
        </div>
        {!isLoading && topRatedMovieResponse.totalPages > 0 && (
          <Pagination
            totalPages={topRatedMovieResponse.totalPages}
            currentPage={currentPage}
            onPageChange={this.getTopRatedMoviesResponse}
          />
        )}
      </>
    )
  }
}

export default TopRated
