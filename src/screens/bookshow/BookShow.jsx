import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './BookShow.css';
import Header from '../../common/header/Header';
import Home from '../home/Home';
import Typography from '@material-ui/core/Typography';

class BookShow extends Component {

  backToDetailsHandler = () => {
    ReactDOM.render(<Home />, document.getElementById('root'));
  }

  render() {
    return (
      <div>
        <Header />
        <div className="bookShow">
          <Typography className="back" onClick={this.backToDetailsHandler}>
            &#60; Back to Movie Details
          </Typography>
        </div>
      </div>
    )
  }
}

export default BookShow; 