import {Component} from 'react'
import './index.css'

class MovieCard extends Component {
  state = {imageUrl: ''}

  componentDidMount() {
    this.getImage()
  }

  getImage = async () => {
    const imageResponse = await fetch('https://dog.ceo/api/breeds/image/random')
    const imageData = await imageResponse.json()
    if (imageData.status === 'success') {
      console.log('success')
      this.setState({imageUrl: imageData.message})
    } else {
      console.log('Failed to fetch data')
    }
  }

  render() {
    const {details} = this.props
    const {firstPublishYear, title, authorName, subject} = details
    const {imageUrl} = this.state
    const authors =
      authorName && authorName.length > 0 ? authorName.join(', ') : ''
    const subjects = subject && subject.length > 0 ? subject.join(', ') : ''
    return (
      <li className="li-container">
        <img src={imageUrl} alt="dog" className="dog-img" />
        <div className="movie-details-container">
          <p>
            <span>Title:</span> {title}
          </p>
          {subject && (
            <p>
              <span>Subject:</span> {subjects}
            </p>
          )}
          {authors && (
            <p>
              <span>Authors:</span> {authors}
            </p>
          )}
          <p>
            <span>Published Year:</span> {firstPublishYear}
          </p>
        </div>
      </li>
    )
  }
}

export default MovieCard
