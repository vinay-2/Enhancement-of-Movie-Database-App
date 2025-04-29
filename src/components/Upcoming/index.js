import React from 'react'
import Loader from 'react-loader-spinner'
import MovieCard from '../MovieCard'
import NavBar from '../NavBar'
import Pagination from '../Pagination'
import './index.css'

class Upcoming extends React.Component {
  state = {
    isLoading: true,
    upcomingMovieResponse: {totalPages: 0, results: []},
    currentPage: 1,
    searchInput: '',
  }

  componentDidMount() {
    this.getUpcomingMoviesResponse(this.state.currentPage)
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

  getUpcomingMoviesResponse = async page => {
    this.setState({isLoading: true})
    const API_KEY = 'f32b79895b21468afbdd6d5342cbf3da'
    const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`

    try {
      const response = await fetch(apiUrl)
      const data = await response.json()
      this.setState({
        isLoading: false,
        upcomingMovieResponse: this.getUpdatedData(data),
        currentPage: page,
      })
    } catch (error) {
      console.error('Error fetching upcoming movies:', error)
      this.setState({
        isLoading: false,
        upcomingMovieResponse: {totalPages: 0, results: []},
      })
    }
  }

  handleSearchInputChange = event => {
    this.setState({searchInput: event.target.value})
  }

  renderLoadingView = () => (
    <div className='loader-container'>
      <Loader type='TailSpin' color='#032541' />
    </div>
  )

  renderMoviesList = () => {
    const {upcomingMovieResponse, searchInput} = this.state
    const filteredResults = upcomingMovieResponse.results.filter(movie =>
      movie.title.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (filteredResults.length === 0) {
      return <p>No movies found.</p>
    }

    return (
      <ul className='row p-0 ms-0 me-0 mt-3'>
        {filteredResults.map(movie => (
          <MovieCard key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, upcomingMovieResponse, currentPage, searchInput} =
      this.state

    return (
      <>
        <NavBar />
        <div className='route-page-body'>
          <h1>Upcoming</h1>
          <div className='search-container'>
            <input
              type='text'
              placeholder='Search'
              value={searchInput}
              onChange={this.handleSearchInputChange}
            />
          </div>
          {isLoading ? this.renderLoadingView() : this.renderMoviesList()}
        </div>
        {!isLoading && upcomingMovieResponse.totalPages > 0 && (
          <Pagination
            totalPages={upcomingMovieResponse.totalPages}
            currentPage={currentPage}
            onPageChange={this.getUpcomingMoviesResponse}
          />
        )}
      </>
    )
  }
}

export default Upcoming
