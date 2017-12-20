import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Glyphicon } from 'react-bootstrap'
import './PokerCard.css'

class PokerCard extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    revealed: PropTypes.bool.isRequired
  }

  getValue() {
    if (this.props.revealed) {
      return this.props.value === undefined ? <Glyphicon glyph='pencil'/> : <span>{this.props.value}</span>
    } else {
      return this.props.value === undefined ? <Glyphicon glyph='question-sign'/> : <Glyphicon glyph='ok'/>
    }
  }
  render () {
    console.log('State change:', this.props.name, this.props.value, this.props.revealed)
    return (
      <div className='PokerDeck--PokerCard__container'>
        <p className='PokerDeck--PokerCard__container__header'>{this.props.name}</p>
        <p className='PokerDeck--PokerCard__container__body'>
          { this.getValue() }
        </p>
      </div>
    )
  }
}

export default PokerCard