import React, { Component } from 'react'
import './Header.css'
import Button from '@material-ui/core/Button'

export default class extends Component {
  render() {
    return (
      <div>
        <Button variant='container' color='default'>Login</Button>
      </div>
    )
  }
}