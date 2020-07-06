import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './Header.css'
import Button from '@material-ui/core/Button'
import logo from '../../assets/logo.svg'
import Modal from 'react-modal'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import PropTypes from 'prop-types'
import FormHelperText from '@material-ui/core/FormHelperText'
import BookShow from '../../screens/bookshow/BookShow'

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

const TabContainer = (props) => {
  return (
    <Typography component='div' style={{ padding: 0, textAlign: 'center' }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
}

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      tabsValue: 0,
      username: '',
      usernameError: false,
      password: '',
      passwordError: false,
      firstName: '', 
      firstNameError: false,
      lastName: '',
      lastNameError: false,
      email: '', 
      emailError: false,
      contactNumber: '', 
      contactNumberError: false
    }
  }

  openModalHandler = () => {
    this.setState({ isModalOpen: true })
  }

  closeModalHandler = () => {
    this.setState({ 
      isModalOpen: false,
      tabsValue: 0,
      username: '',
      usernameError: false,
      password: '',
      passwordError: false,
      firstName: '', 
      firstNameError: false,
      lastName: '',
      lastNameError: false,
      email: '', 
      emailError: false,
      contactNumber: '', 
      contactNumberError: false
    })
  }

  tabsChangeHandler = (event, value) => {
    this.setState({ 
      tabsValue: value,
      username: '',
      usernameError: false,
      password: '',
      passwordError: false,
      firstName: '', 
      firstNameError: false,
      lastName: '',
      lastNameError: false,
      email: '', 
      emailError: false,
      contactNumber: '', 
      contactNumberError: false
    })
  }

  inputChangeHandler = ({target: {id, value}}) => {
    this.setState({ [id]: value });
  }

  loginSubmitHandler = () => {
    this.setState({
      usernameError: this.state.username === '',
      passwordError: this.state.password === '',
    });
  }

  registerSubmitHandler = () => {
    this.setState({
      firstNameError: this.state.firstName === '',
      lastNameError: this.state.lastName === '',
      emailError: this.state.email === '',
      passwordError: this.state.password === '',
      contactNumberError: this.state.contactNumber === ''
    })
  }

  bookShowHandler = (e) => {
    ReactDOM.render(<BookShow />, document.getElementById('root'));
  }

  render() {
    let tabContainer;
    if (this.state.tabsValue === 0) {
      tabContainer = (
        <TabContainer>
            <FormControl required>
              <InputLabel htmlFor='username'>Username</InputLabel>
              <Input type='text' id='username' onChange={this.inputChangeHandler} value={this.state.username} />
              <FormHelperText className={this.state.usernameError ? 'displayBlock' : 'displayNone'}>
                <span className='red'>Username required</span>
              </FormHelperText>
            </FormControl>
            <br />
            <br />
            <FormControl>
              <InputLabel htmlFor='password'>Password</InputLabel>
              <Input type='password' id='password' onChange={this.inputChangeHandler} value={this.state.password} />
              <FormHelperText className={this.state.passwordError ? 'displayBlock' : 'displayNone'}>
                <span className='red'>Password required</span>
              </FormHelperText>
            </FormControl>
            <br />
            <br />
            <Button variant='contained' color='primary' onClick={this.loginSubmitHandler}>Login</Button>
          </TabContainer>
      )
    } else {
      tabContainer = (
        <TabContainer>
            <FormControl required>
              <InputLabel htmlFor='firstName'>First Name</InputLabel>
              <Input type='text' id='firstName' onChange={this.inputChangeHandler} value={this.state.firstName}/>
              <FormHelperText className={this.state.firstNameError ? 'displayBlock' : 'displayNone'}>
                <span className='red'>First Name required</span>
              </FormHelperText>
            </FormControl>
            <br />
            <br />
            <FormControl>
              <InputLabel htmlFor='lastName'>Last Name</InputLabel>
              <Input type='text' id='lastName' onChange={this.inputChangeHandler} value={this.state.lastName} />
              <FormHelperText className={this.state.lastNameError ? 'displayBlock' : 'displayNone'}>
                <span className='red'>Last Name required</span>
              </FormHelperText>
            </FormControl>
            <br />
            <br />
            <FormControl required>
              <InputLabel htmlFor='email'>Email</InputLabel>
              <Input type='text' id='email' onChange={this.inputChangeHandler} value={this.state.email} />
              <FormHelperText className={this.state.emailError ? 'displayBlock' : 'displayNone'}>
                <span className='red'>Email required</span>
              </FormHelperText>
            </FormControl>
            <br />
            <br />
            <FormControl>
              <InputLabel htmlFor='password'>Password</InputLabel>
              <Input type='password' id='password' onChange={this.inputChangeHandler} value={this.state.password} />
              <FormHelperText className={this.state.passwordError ? 'displayBlock' : 'displayNone'}>
                <span className='red'>Password required</span>
              </FormHelperText>
            </FormControl>
            <br />
            <br />
            <FormControl required>
              <InputLabel htmlFor='contactNumber'>Contact Number</InputLabel>
              <Input type='number' id='contactNumber' onChange={this.inputChangeHandler} value={this.state.contactNumber} />
              <FormHelperText className={this.state.contactNumberError ? 'displayBlock' : 'displayNone'}>
                <span className='red'>Contact number required</span>
              </FormHelperText>
            </FormControl>
            <br />
            <br />
            <Button variant='contained' color='primary' onClick={this.registerSubmitHandler}>Register</Button>
          </TabContainer>
      )
    }

    return (
      <div className='app-header'>
        <img src={logo} className='app-logo' alt='logo'/>
        <Button className='login-button' variant='contained' color='default' onClick={this.openModalHandler}>
          Login
        </Button>
        { this.props.showBookShowButton ? 
          <div className='bookshow'>
            <Button className='' variant='contained' color='primary' onClick={this.bookShowHandler}>
              Book Show
            </Button>
          </div> : '' }
        <Modal style={modalStyle} ariaHideApp={false} isOpen={this.state.isModalOpen} contentLabel='loginModal' onRequestClose={this.closeModalHandler}>
          <Tabs className='tabs' onChange={this.tabsChangeHandler} value={this.state.tabsValue}>
            <Tab label='Login'></Tab>
            <Tab label='Register'></Tab>
          </Tabs>
          { tabContainer }
        </Modal>
      </div>
    )
  }
}