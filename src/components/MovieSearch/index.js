import {Component} from 'react'
import {MdSearch} from 'react-icons/md'
import {TailSpin} from 'react-loader-spinner'
import MovieCard from '../MovieCard'
import './index.css'

const apiStatusList = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
  noMovies: 'NOITEMS',
}

class MovieSearch extends Component {
  state = {searchInput: '', movieData: [], apiStatus: apiStatusList.initial}

  getData = async () => {
    this.setState({apiStatus: apiStatusList.loading})
    const {searchInput} = this.state
    try {
      const movieResponse = await fetch(
        `https://openlibrary.org/search.json?q=${searchInput}`,
      )
      const movieResponseData = await movieResponse.json()
      if (movieResponseData.numFound > 0) {
        const updatedData = movieResponseData.docs.map(each => ({
          firstPublishYear: each.first_publish_year,
          title: each.title,
          subject: each.subject,
          author_name: each.author_name,
        }))
        console.log(updatedData)
        this.setState({
          movieData: updatedData,
          apiStatus: apiStatusList.success,
        })
      } else {
        this.setState({apiStatus: apiStatusList.noMovies})
      }
    } catch (error) {
      this.setState({apiStatus: apiStatusList.failure})
    }
  }

  handleSearch = event => {
    this.setState({searchInput: event.target.value})
    if (event.target.key === 'enter') {
      this.getData()
    }
  }

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.getData()
    }
  }

  onClickSearch = () => {
    this.getData()
  }

  onClickClear = () => {
    this.setState({searchInput: '', apiStatus: apiStatusList.initial})
  }

  render() {
    const {apiStatus, movieData, searchInput} = this.state
    return (
      <div className="bg-container">
        <h1 className="heading">Search the Movies you want</h1>
        <nav className="nav-container">
          <div className="input-container">
            <input
              type="search"
              value={searchInput}
              onChange={this.handleSearch}
              onKeyPress={this.handleKeyPress}
              className="search-input-ele"
            />
            <button
              className="search-btn"
              type="button"
              onClick={this.onClickSearch}
            >
              <MdSearch size={34} />
            </button>
          </div>
          <button
            type="button"
            className="clear-btn"
            onClick={this.onClickClear}
          >
            Clear
          </button>
        </nav>
        {apiStatus === apiStatusList.loading && (
          <div>
            <TailSpin
              visible={true}
              height="60"
              width="60"
              color="#4fa94d"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
            />
          </div>
        )}

        {apiStatus === apiStatusList.success && (
          <ul className="ul-container">
            {movieData.map((movie, index) => (
              <MovieCard key={index} details={movie} />
            ))}
          </ul>
        )}
        {apiStatus === apiStatusList.noMovies && (
          <p>No Movies in that Name,Try other Movies</p>
        )}
        {apiStatus === apiStatusList.failure && <p>Failed to fetch data</p>}
      </div>
    )
  }
}

export default MovieSearch
