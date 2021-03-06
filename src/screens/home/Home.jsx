import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './Home.css'
import Header from '../../common/header/Header'
import Details from '../details/Details'
import { withStyles } from '@material-ui/core/styles'
import genres from '../../assets/genres'
import artists from '../../assets/artists'
import GridList from '@material-ui/core/GridList';
import GridListTitle from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import GridListTile from '@material-ui/core/GridListTile'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import FormControl from '@material-ui/core/FormControl'
import Typography from '@material-ui/core/Typography'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '@material-ui/core/Checkbox'
import ListItemText from '@material-ui/core/ListItemText'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  upcomingMoviesHeading: {
    textAlign: 'center',
    background: '#ff9999',
    padding: '8px',
    fontSize: '1rem'
  },
  gridListUpcomingMovies: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    width: '100%'
  },
  gridListMain: {
    transform: 'translateZ(0)',
    cursor: 'pointer'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 240,
    maxWidth: 240
  },
  title: {
    color: theme.palette.primary.light,
  }
});

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      upcomingMoviesData: [],
      releasedMoviesData: [],
      movieSearch: '',
      selectedGenres: [],
      selectedArtists: []
    }
  }

  componentDidMount() {
    fetch(this.props.baseUrl + '/movies?status=RELEASED', { 
      headers: {
        "Accept": "application/json;charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(json => {
      this.setState({ releasedMoviesData : json.movies});
    })
    .catch(err => console.log({err}));

    fetch(this.props.baseUrl + '/movies?status=PUBLISHED', { 
      headers: {
        "Accept": "application/json;charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(json => {
      this.setState({ upcomingMoviesData : json.movies});
    })
    .catch(err => console.log({err}));
  }

  movieSearchChangeHandler = ({target: {id, value}}) => {
    this.setState({ [id]: value })
  }

  genreSelectHandler = (event) => {
    this.setState({ selectedGenres: event.target.value.filter(item => item) })
  }
  
  artistSelectHandler = (event) => {
    this.setState({ selectedArtists: event.target.value.filter(item => item) })
  }

  movieClickHandler = (movieId) => {
    ReactDOM.render(<Details movieId={movieId}/>, document.getElementById('root'))
  }
  
  render() {
    const { upcomingMoviesData, releasedMoviesData } = this.state;
    if (releasedMoviesData.length === 0) return 'Loading';
    const { classes } = this.props;
    return (
      <div>
        <Header /> 
        <div className={classes.upcomingMoviesHeading}>
          <span>Upcoming Movies</span>
        </div>
        <GridList cols={5} className={classes.gridListUpcomingMovies}>
          {upcomingMoviesData.map(movie => (
            <GridListTile key={movie.id}>
              <img className='movie-poster' src={movie.poster_url} alt={movie.title} />
              <GridListTileBar title={movie.title} />
            </GridListTile>
          ))}
        </GridList>
        <div className="flex-container">
          <div className="left">
            <GridList cellHeight={350} cols={4} className={classes.gridListMain}>
              {releasedMoviesData.map(movie => (
                <GridListTile className="released-movie-grid-item" key={"grid" + movie.id} onClick={() => this.movieClickHandler(movie.id)}>
                  <img src={movie.poster_url} className="movie-poster" alt={movie.title} />
                  <GridListTileBar title={movie.title} subtitle={<span>Release Date: {new Date(movie.release_date).toDateString()}</span>} />
                </GridListTile>
              ))}
            </GridList>
          </div>
          <div className="right">
            <Card>
              <CardContent>
                <FormControl className={classes.formControl}>
                  <Typography className={classes.title} color='text-secondary'>
                    FIND MOVIES BY:
                  </Typography>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor='movieSearch'>Movie Name</InputLabel>
                    <Input id='movieSearch' onChange={this.movieSearchChangeHandler} value={this.state.movieSearch}/>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor='select-genres'>Genre</InputLabel>
                    <Select
                     multiple
                     input={<Input id='select-genres' />}
                     renderValue={selected => selected.join(', ')}
                     value={this.state.selectedGenres}
                     onChange={this.genreSelectHandler}>
                       <MenuItem key='0'>None</MenuItem>
                       {genres.map(genre => (
                        <MenuItem key={genre.id} value={genre.name}>
                          <Checkbox checked={this.state.selectedGenres.includes(genre.name)}/>
                          <ListItemText primary={genre.name} />
                        </MenuItem>
                       ))}
                     </Select>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor='select-artists'>Artist</InputLabel>
                    <Select
                     multiple
                     input={<Input id='select-artists' />}
                     renderValue={selected => selected.join(', ')}
                     value={this.state.selectedArtists}
                     onChange={this.artistSelectHandler}>
                       <MenuItem >None</MenuItem>
                       {artists.map(artist => (
                        <MenuItem key={artist.id} value={`${artist.first_name} ${artist.last_name}`}>
                          <Checkbox checked={this.state.selectedArtists.includes(`${artist.first_name} ${artist.last_name}`)}/>
                          <ListItemText primary={`${artist.first_name} ${artist.last_name}`} />
                        </MenuItem>
                       ))}
                     </Select>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <TextField 
                      id='release-date-start'
                      label='Release Date Start'
                      type='date'
                      defaultValue=''
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <TextField 
                      id='release-date-end'
                      label='Release Date End'
                      type='date'
                      defaultValue=''
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                  <br />
                  <br />
                  <Button variant='contained' color='primary'>Apply</Button>
                </FormControl>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Home);