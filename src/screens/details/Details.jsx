import React, { Component } from 'react'
import './Details.css'
import Header from '../../common/header/Header'
import moviesData from '../../assets/moviesData';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {}
    }
  }

  componentDidMount() {
    const movie = moviesData.find(movie => movie.id === this.props.movieId);
    this.setState({ movie });
  }

  render() {
    return (
      <div className="details">
        <Header />
        <div className="flex-containerDetails">
          <div className="leftDetails">

          </div>
          <div className="middleDetails">

          </div>
          <div className="rightDetails">

          </div>
        </div>
      </div>
    )
  }
}

export default Details;