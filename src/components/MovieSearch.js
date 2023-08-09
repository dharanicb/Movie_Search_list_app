import {useEffect, useState} from 'react'
import axios from 'axios'

function MovieSearch() {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  //   const itemsPerPage = 10 // Adjust this as needed
  const [totalPages, setTotalPages] = useState(null)

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=bf8c2081c16f3d250cafa9ad02996ed5&query=${query}&page=${currentPage}`,
      )
      console.log(response)
      setMovies(response.data.results)
      setTotalPages(response.data.total_pages)
    } catch (error) {
      console.error('Error fetching movies:', error)
    }
  }
  useEffect(() => {
    handleSearch()
  }, [currentPage])

  const onPagenate = e => {
    if (e === 'pre') {
      setCurrentPage(currentPage - 1)
    }
    if (e === 'next') {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="main-div">
      <div className="second-menu">
        <div className="title">
          <h1>MOVIE SEARCH APP</h1>
        </div>
        <div className="title-bar">
          <div className="search-bar">
            <span className="name">MOVIE NAME</span>
            <input
              type="text"
              placeholder="Search for a movie"
              value={query}
              className="search-input"
              onKeyPress={handleKeyPress}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
          <div>
            <button type="button" className="search-btn" onClick={handleSearch}>
              Search!
            </button>
          </div>
        </div>

        <div className="movie-tabs">
          {movies.length > 0 &&
            movies.map(movie => (
              <div key={movie.id} className="abc">
                <div className="movie-poster">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={`${movie.title} poster`}
                  />
                </div>
                <div className="movie-content">
                  <h2>{movie.title}</h2>
                  <p>RELEASE DATE: {movie.release_date}</p>
                  <p>RATING : {Math.round(movie.vote_average)}</p>
                  <span>{movie.overview}</span>
                </div>
              </div>
            ))}
        </div>

        <div className="pagination">
          <button
            type="button"
            onClick={() => onPagenate('pre')}
            disabled={currentPage === 1}
            className="btns"
          >
            Previous
          </button>
          <span>
            {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => onPagenate('next')}
            disabled={currentPage === totalPages}
            className="btns"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default MovieSearch
