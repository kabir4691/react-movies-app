import React, { Component } from 'react'
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

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      tabsValue: 0
    }
  }

  openModalHandler = () => {
    this.setState({ isModalOpen: true })
  }

  closeModalHandler = () => {
    this.setState({ isModalOpen: false })
  }

  tabsChangeHandler = (event, value) => {
    this.setState({ tabsValue: value })
  }

  render() {
    return (
      <div className='app-header'>
        <img src={logo} className='app-logo' alt='logo'/>
        <Button className='login-button' variant='contained' color='default' onClick={this.openModalHandler}>
          Login
        </Button>
        <Modal style={modalStyle} ariaHideApp={false} isOpen={this.state.isModalOpen} contentLabel='loginModal' onRequestClose={this.closeModalHandler}>
          <Tabs className='tabs' onChange={this.tabsChangeHandler} value={this.state.tabsValue}>
            <Tab label='Login'></Tab>
            <Tab label='Register'></Tab>
          </Tabs>
          <TabContainer>
            <FormControl required>
              <InputLabel htmlFor='username'>Username</InputLabel>
              <Input type='text' id='username'></Input>
            </FormControl>
            <br />
            <br />
            <FormControl>
              <InputLabel htmlFor='password'>Password</InputLabel>
              <Input type='password' id='password'></Input>
            </FormControl>
            <br />
            <br />
            <Button variant='contained' color='primary'>Login</Button>
          </TabContainer>
        </Modal>
      </div>
    )
  }
}