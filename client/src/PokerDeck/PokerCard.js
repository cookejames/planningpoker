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

  render () {
    console.log('Value:')
    console.log(this.props.value)
    return (
      <div className='PokerDeck--PokerCard__container'>
        <p className='PokerDeck--PokerCard__container__header'>{this.props.name}</p>
        <p className='PokerDeck--PokerCard__container__body'>
          {this.props.revealed ?
            this.props.value === undefined ? <Glyphicon glyph='pencil'/> : <span>{this.props.value}</span>
            : <Glyphicon glyph='question-sign'/>
          }
        </p>
      </div>
    )
  }
}

export default PokerCard