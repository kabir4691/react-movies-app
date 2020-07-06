import React, { Component } from 'react'
import './Home.css'
import Header from '../../common/header/Header'
import { withStyles } from '@material-ui/core/styles'
import moviesData from '../../assets/moviesData'
import genres from '../../assets/genres'
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
      movieSearch: '',
      selectedGenres: []
    }
  }

  movieSearchChangeHandler = ({target: {id, value}}) => {
    this.setState({ [id]: value })
  }

  genreSelectHandler = (event) => {
    this.setState({ selectedGenres: event.target.value })
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header /> 
        <div className={classes.upcomingMoviesHeading}>
          <span>Upcoming Movies</span>
        </div>
        <GridList cols={5} className={classes.gridListUpcomingMovies}>
          {moviesData.map(movie => (
            <GridListTile key={movie.id}>
              <img className='movie-poster' src={movie.poster_url} alt={movie.title} />
              <GridListTileBar title={movie.title} />
            </GridListTile>
          ))}
        </GridList>
        <div className="flex-container">
          <div className="left">
            <GridList cellHeight={350} cols={4} className={classes.gridListMain}>
              {moviesData.map(movie => (
                <GridListTile className="released-movie-grid-item" key={"grid" + movie.id}>
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