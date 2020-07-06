import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './Details.css'
import Header from '../../common/header/Header'
import Home from '../home/Home'
import moviesData from '../../assets/moviesData';
import Typography from '@material-ui/core/Typography'
import YouTube from 'react-youtube'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import StarBorder from '@material-ui/icons/StarBorder'

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      movieRatingIcons: [
        {
           id: 1,
           stateId: "star1",
           color: "black"
        },
        {
           id: 2,
           stateId: "star2",
           color: "black"
        },
        {
           id: 3,
           stateId: "star3",
           color: "black"
        },
        {
           id: 4,
           stateId: "star4",
           color: "black"
        },
        {
           id: 5,
           stateId: "star5",
           color: "black"
        }
      ]
    }
  }

  componentWillMount() {
    const movie = moviesData.find(movie => movie.id === this.props.movieId);
    this.setState({ movie });
  }

  backToHomeHandler = () => {
    ReactDOM.render(<Home />, document.getElementById('root'))
  }

  artistClickHandler = (url) => {
    window.location = url;
  }

  starClickHandler = (id) => {
    const array = [];
    for (let icon of this.state.movieRatingIcons) {
      icon.color = icon.id <= id ? 'yellow' : 'black';
      array.push(icon);
    }
    this.setState({ movieRatingIcons: array })
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
            <Typography>
              <span className='bold'>Rate this movie: </span>
            </Typography>
            {this.state.movieRatingIcons.map(icon => (
              <StarBorder className={icon.color} key={`star${icon.id}`} onClick={() => this.starClickHandler(icon.id)}></StarBorder>
            ))}
            <div className="bold marginBottom16 marginTop16">
              <Typography>
                  <span className="bold">Artists:</span>
              </Typography>
            </div>
            <div className="paddingRight">
              <GridList cellHeight={160} cols={2}>
                {movie.artists != null && movie.artists.map(artist => (
                  <GridListTile
                    className="gridTile"
                    onClick={() => this.artistClickHandler(artist.wiki_url)}
                    key={artist.id} 
                  >
                    <img src={artist.profile_url} alt={artist.first_name + " " + artist.last_name} />
                    <GridListTileBar title={artist.first_name + " " + artist.last_name} />
                  </GridListTile>
                ))}
              </GridList>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Details;