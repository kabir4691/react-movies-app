import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './BookShow.css';
import location from '../../assets/location'
import language from '../../assets/language'
import showDate from '../../assets/showDate'
import showTime from '../../assets/showTime'
import Header from '../../common/header/Header';
import Home from '../home/Home';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem';

class BookShow extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedLocation: '',
      selectedLanguage: '',
      selectedShowDate: '',
      selectedShowTime: ''
    }
  }

  backToDetailsHandler = () => {
    ReactDOM.render(<Home />, document.getElementById('root'));
  }

  locationChangeHandler = (event) => {
    this.setState({ selectedLocation: event.target.value})
  }

  languageChangeHandler = (event) => {
    this.setState({ selectedLanguage: event.target.value})
  }

  showDateChangeHandler = (event) => {
    this.setState({ selectedShowDate: event.target.value})
  }

  showTimeChangeHandler = (event) => {
    this.setState({ selectedShowTime: event.target.value})
  }

  render() {
    return (
      <div>
        <Header />
        <div className="bookShow">
          <Typography className="back" onClick={this.backToDetailsHandler}>
            &#60; Back to Movie Details
          </Typography>
          <Card className='cardStyle'>
            <CardContent>
              <Typography variant='headline' component='h2'>
                BOOK SHOW
              </Typography>
              <FormControl className='formControl'>
                <InputLabel htmlFor='location'>Choose location: </InputLabel>
                <Select
                value={this.state.selectedLocation}
                onChange={this.locationChangeHandler}
                >
                  {location.map(item => (
                    <MenuItem key={`loc${item.id}`} value={item.location}>
                      {item.location}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br />
              <br />
              <FormControl className='formControl'>
                <InputLabel htmlFor='language'>Choose language: </InputLabel>
                <Select
                value={this.state.selectedLanguage}
                onChange={this.languageChangeHandler}
                >
                  {language.map(item => (
                    <MenuItem key={`lang${item.id}`} value={item.language}>
                      {item.language}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br />
              <br />
              <FormControl className='formControl'>
                <InputLabel htmlFor='showDate'>Choose Show Date: </InputLabel>
                <Select
                value={this.state.selectedShowDate}
                onChange={this.showDateChangeHandler}
                >
                  {showDate.map(item => (
                    <MenuItem key={`loc${item.id}`} value={item.showDate}>
                      {item.showDate}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br />
              <br />
              <FormControl className='formControl'>
                <InputLabel htmlFor='showTime'>Choose Show Time: </InputLabel>
                <Select
                value={this.state.selectedShowTime}
                onChange={this.showTimeChangeHandler}
                >
                  {showTime.map(item => (
                    <MenuItem key={`loc${item.id}`} value={item.showTime}>
                      {item.showTime}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
}

export default BookShow; 