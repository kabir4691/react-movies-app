import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './Details.css'
import Header from '../../common/header/Header'
import Home from '../home/Home'
import moviesData from '../../assets/moviesData';
import Typography from '@material-ui/core/Typography'
import YouTube from 'react-youtube'

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {}
    }
  }

  componentWillMount() {
    const movie = moviesData.find(movie => movie.id === this.props.movieId);
    this.setState({ movie });
  }

  backToHomeHandler = () => {
    ReactDOM.render(<Home />, document.getElementById('root'))
  }

  render() {
    const { movie } = this.state;
    const youtubeOptions = {
      height: '300',
      width: '700',
      playerVars: {
        autoPlay: 1
      }
    }
    return (
      <div className="details">
        <Header />
        <div className='back'>
          <Typography onClick={this.backToHomeHandler}>
            &#60; Back to Home
          </Typography>
        </div>
        <div className="flex-containerDetails">
          <div className="leftDetails">
            <img src={movie.poster_url} alt={movie.title} />
          </div>
          <div className="middleDetails">
            <Typography variant='headline' component='h2'>{movie.title}</Typography>
            <br />
            <Typography>
              <span className='bold'>Genre: </span>{movie.genres.join(',')}
            </Typography>
            <Typography>
              <span className='bold'>Duration: </span>{movie.duration}
            </Typography>
            <Typography>
              <span className='bold'>Release Date: </span>{new Date(movie.release_date).toDateString()}
            </Typography>
            <Typography>
              <span className='bold'>Rating: </span>{movie.critics_rating}
            </Typography>
            <div className="marginTop16">
              <Typography>
                <span className="bold">Plot: </span><a href={movie.wiki_url}>(Wiki Link)</a>{movie.storyline}
              </Typography>
            </div>
            <div className="trailerContainer">
              <Typography>
                <span className='bold'>Trailer: </span>
              </Typography>
              <YouTube
                videoId={movie.trailer_url.split('?v=')[1]}
                opts={youtubeOptions} />
            </div>
          </div>
          <div className="rightDetails">

          </div>
        </div>
      </div>
    )
  }
}

export default Details;