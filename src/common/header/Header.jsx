import React, { Component } from 'react'
import './Header.css'
import Button from '@material-ui/core/Button'
import logo from '../../assets/logo.svg'
import Modal from 'react-modal'

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    }
  }

  openModalHandler = () => {
    this.setState({ isModalOpen: true })
  }

  closeModalHandler = () => {
    this.setState({ isModalOpen: false })
  }

  render() {
    return (
      <div className='app-header'>
        <img src={logo} className='app-logo' alt='logo'/>
        <Button className='login-button' variant='contained' color='default' onClick={this.openModalHandler}>
          Login
        </Button>
        <Modal ariaHideApp={false} isOpen={this.state.isModalOpen} contentLabel='loginModal' onRequestClose={this.closeModalHandler}>

        </Modal>
      </div>
    )
  }
}