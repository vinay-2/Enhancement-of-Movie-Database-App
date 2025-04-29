import React from 'react'
import './index.css'

class Pagination extends React.Component {
  static defaultProps = {
    currentPage: 1,
    totalPages: 1,
    onPageChange: () => {},
  }

  onNextPage = () => {
    const {currentPage, totalPages, onPageChange} = this.props
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  onPrevPage = () => {
    const {currentPage, onPageChange} = this.props
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  renderPageNumbers = () => {
    const {currentPage, totalPages, onPageChange} = this.props
    const pages = []

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          type='button'
          onClick={() => onPageChange(i)}
          className={`page-btn ${currentPage === i ? 'active' : ''}`}
          aria-label={`Page ${i}`}
        >
          {i}
        </button>,
      )
    }

    return pages
  }

  render() {
    const {currentPage, totalPages} = this.props

    return (
      <div className='pagination d-flex justify-content-center align-items-center gap-2 mt-4'>
        <button
          type='button'
          onClick={this.onPrevPage}
          disabled={currentPage === 1}
          className='control-btn'
        >
          Prev
        </button>

        {this.renderPageNumbers()}

        <button
          type='button'
          onClick={this.onNextPage}
          disabled={currentPage === totalPages}
          className='control-btn'
        >
          Next
        </button>
      </div>
    )
  }
}

export default Pagination
