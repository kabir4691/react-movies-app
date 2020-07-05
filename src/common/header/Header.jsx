import React, { Component } from 'react'
import './Header.css'
import Button from '@material-ui/core/Button'
import logo from '../../assets/logo.svg'
import Modal from 'react-modal'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

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
        <Modal ariaHideApp={false} isOpen={this.state.isModalOpen} contentLabel='loginModal' onRequestClose={this.closeModalHandler}>
          <Tabs onChange={this.tabsChangeHandler} value={this.state.tabsValue}>
            <Tab label='Login'></Tab>
            <Tab label='Register'></Tab>
          </Tabs>
        </Modal>
      </div>
    )
  }
}