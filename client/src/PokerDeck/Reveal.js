import React, { Component } from 'react'
import update from 'immutability-helper'
import PropTypes from 'prop-types'
import './Reveal.css'

class Reveal extends Component {
  state = {
    countDown: 3,
    classNames: []
  }

  static propTypes = {
    fullscreen: PropTypes.bool
  }

  componentDidMount () {
    if (this.props.fullscreen) {
      this.setState({classNames: update(this.state.classNames, {$push: ['PokerDeck--Reveal__fullscreen']})})
    } else {
      this.setState({classNames: update(this.state.classNames, {$push: ['PokerDeck--Reveal__inline']})})
    }
    setTimeout(() => this.countDown(), 1000)
  }

  countDown () {
    if (this.state.countDown > 1) {
      setTimeout(() => this.countDown(), 1000)
      return this.setState({countDown: this.state.countDown - 1})
    }
    this.setState({classNames: update(this.state.classNames, {$push: ['PokerDeck--Reveal__hidden']})})
  }

  render () {
    return (
      <div className={this.state.classNames.join(' ')}>{this.state.countDown}</div>
    )
  }
}

export default Reveal