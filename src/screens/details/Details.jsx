import React, { Component } from 'react'
import './Details.css'
import Header from '../../common/header/Header'
import moviesData from '../../assets/moviesData';
import Typography from '@material-ui/core/Typography'

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

  render() {
    const { movie } = this.state;
    return (
      <div className="details">
        <Header />
        <div className="flex-containerDetails">
          <div className="leftDetails">
            <img src={movie.poster_url} alt={movie.title} />
          </div>
          <div className="middleDetails">
            <Typography variant='headline' component='h2'>{movie.title}</Typography>
            <Typography>
              <span className='bold'>Genre: </span>{movie.genres.join(',')}
            </Typography>
          </div>
          <div className="rightDetails">

          </div>
        </div>
      </div>
    )
  }
}

export default Details;