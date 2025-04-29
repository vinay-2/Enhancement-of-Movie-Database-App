import {Link, withRouter} from 'react-router-dom'
import SearchMoviesContext from '../../context/SearchMoviesContext'
import './index.css'

const NavBar = props => {
  const renderSearchBar = () => (
    <SearchMoviesContext.Consumer>
      {value => {
        const {onTriggerSearchingQuery, onChangeSearchInput, searchInput} =
          value

        const onChangeHandler = event => onChangeSearchInput(event.target.value)

        const onSearchHandler = event => {
          event.preventDefault()
          const {history} = props
          onTriggerSearchingQuery()
          history.push(`/search`)
        }

        return (
          <div className='d-flex align-items-center'>
            <input
              type='text'
              className='me-2 search-input'
              onChange={onChangeHandler}
              value={searchInput}
              placeholder='Search'
            />
            <button
              className='btn btn-outline-info'
              type='button'
              onClick={onSearchHandler}
            >
              Search
            </button>
          </div>
        )
      }}
    </SearchMoviesContext.Consumer>
  )

  return (
    <nav className='navbar-container d-flex align-items-center p-3'>
      <div className='logo-container'>
        <span className='page-logo'>movieDB</span>
      </div>
      <div className='ms-auto d-flex align-items-center'>
        <ul className='order-1 d-flex align-items-center p-0 mb-0 ms-3 nav-items-list'>
          <li className='nav-item'>
            <Link className='nav-link' to='/'>
              <span>Popular</span>
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/top-rated'>
              <span>Top Rated</span>
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/upcoming'>
              <span>Upcoming</span>
            </Link>
          </li>
        </ul>
        {renderSearchBar()}
      </div>
    </nav>
  )
}

export default withRouter(NavBar)
