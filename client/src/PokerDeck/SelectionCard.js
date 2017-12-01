import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button } from 'react-bootstrap'
import './PokerCard.css'
const VALUES = [0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, '?']

class SelectionCard extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    onSelect: PropTypes.func.isRequired
  }

  onSelect (value) {
    this.props.onSelect(value)
  }

  render () {
    return (
      <div className='PokerDeck--PokerCard__container'>
        <p className='PokerDeck--PokerCard__container__header'>You ({this.props.name})</p>
        <div className='PokerDeck--PokerCard__container__body'>
          {this.props.value === undefined &&
          <Row>
            {VALUES.map((value, index) => (
              <Col sm={4} xs={4} md={4} key={index} className='PokerDeck--PokerCard__container__body__button'>
                <Button onClick={() => this.onSelect(value)}>{value}</Button>
              </Col>
            ))}
          </Row>
          }
          {this.props.value !== undefined &&
          <span>{this.props.value}</span>
          }
        </div>
      </div>
    )
  }
}

export default SelectionCard