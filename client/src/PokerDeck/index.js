import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Pusher from 'pusher-js'
import update from 'immutability-helper';
import PokerCard from './PokerCard'
import SelectionCard from './SelectionCard'
import { Row, Col, Button } from 'react-bootstrap'
import './index.css'
const CLUSTER = 'eu'
const AUTH_ENDPOINT = 'https://wt-978502515371c62b8ebcd23ed2fd1f64-0.run.webtask.io/planningpoker'
const EVENT_SELECT = 'client-selected'
const EVENT_REVEAL = 'client-reveal'
const EVENT_CLEAR = 'client-clear'

class PokerDeck extends Component {
  state = {
    myId: undefined,
    myValue: undefined,
    players: [],
    reveal: false
  }
  static propTypes = {
    name: PropTypes.string.isRequired
  }

  componentWillMount () {
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true

    let pusher = new Pusher('fbb4e18183b4d8833d8a', {
      cluster: CLUSTER,
      encrypted: true,
      authEndpoint: AUTH_ENDPOINT,
      auth: {
        headers: {
          'x-pokername': this.props.name
        }
      }
    })

    const channel = pusher.subscribe('presence-poker')
    this.setState({pusher, channel})
  }

  componentDidMount () {
    this.state.channel.bind('pusher:subscription_succeeded', (event) => {
      const { myID } = event
      console.log(`My ID: ${myID}`)
      this.setState({myId: myID})
      this.state.channel.members.each(member => this.addPlayer(member.id, member.info.name))
    })
    this.state.channel.bind('pusher:member_added', e => this.memberJoined(e))
    this.state.channel.bind('pusher:member_removed', e => this.memberLeft(e))
    this.state.channel.bind(EVENT_SELECT, e => this.playerSelectedValue(e))
    this.state.channel.bind(EVENT_REVEAL, e => this.revealAll(e))
    this.state.channel.bind(EVENT_CLEAR, e => this.clearAll(e))
  }

  componentWillUnmount () {
    this.state.channel.unbind()
    this.state.pusher.unsubscribe(this.state.channel)
  }

  /**
   * Called when a new member joins the channel
   * @param message
   */
  memberJoined (message) {
    const {id, info: {name}} = message
    this.addPlayer(id, name)

  }

  /**
   * Called when a member leaves the channel.
   * Removes the member from the list of players.
   * @param message
   */
  memberLeft (message) {
    const { id, info: { name } } = message
    const index = this.state.players.findIndex(player => player.id === id)
    if (index === -1) {
      return console.error(`Error removing player ${id} ${name}: Not Found`)
    }
    console.log(`Removing player ${id} ${name}`)
    this.setState({players: update(this.state.players, {$splice: [[index, 1]]})})
  }

  /**
   * Add a player
   * @param id
   * @param name
   */
  addPlayer (id, name) {
    if (id === this.state.myId) {
      return
    }

    const index = this.state.players.findIndex(player => player.id === id)
    if (index === -1) {
      console.log(`Adding player ${id}, ${name}`)
      this.setState({players: update(this.state.players, {$push: [{id, name}]})})
    } else {
      console.log(`Player ${id}, ${name} has already been added`)
    }
  }

  /**
   * Receives an event when a player selects a value and updates the player state
   * @param event
   */
  playerSelectedValue (event) {
    const {player: id, value} = event
    const index = this.state.players.findIndex(player => player.id === id)
    if (index === -1) {
      return console.error(`Error could not select value for player that does not exist: ${id}`)
    }
    const player = this.state.players[index]
    this.setState({players: update(this.state.players, {
      $splice: [[index, 1]],
      $push: [update(player, {value: {$set: value}})]
    })})
  }

  /**
   * Reveal all the players cards
   */
  revealAll () {
    this.setState({reveal: true})
  }

  /**
   * Clear this player and all the players card values
   */
  clearAll () {
    const players = this.state.players.map(player => update(player, {value: {$set: undefined}}))
    this.setState({players, reveal: false, myValue: undefined})
  }

  /**
   * Sends a reveal event to all the players and reveals all the cards
   */
  onReveal () {
    this.revealAll()
    this.state.channel.trigger(EVENT_REVEAL, {})
  }

  /**
   * Sends a clear event to all the players and clears all the cards
   */
  onClear () {
    this.clearAll()
    this.state.channel.trigger(EVENT_CLEAR, {})
  }

  /**
   * Triggers a select event when this player selects a number
   * @param value
   */
  onSelect (value) {
    console.log(`Selected value: ${value}`)
    this.state.channel.trigger(EVENT_SELECT, {player: this.state.myId, value})
    this.setState({myValue: value})
  }

  render () {
    return (
      <div>
        <Row>
          <Col md={12} className='PokerDeck--controls'>
            <Button
              bsStyle="primary"
              onClick={() => this.onReveal()}
            >
              Reveal All
            </Button>
            <Button
              bsStyle="danger"
              onClick={() => this.onClear()}
            >
              Clear All
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6} md={3}>
            <SelectionCard
              name={this.props.name}
              onSelect={value => this.onSelect(value)}
              value={this.state.myValue}
            />
          </Col>
          {this.state.players.map((player, index) => (
            <Col xs={12} sm={6} md={3} key={index}>
              <PokerCard
                name={player.name}
                value={player.value}
                revealed={this.state.reveal}
              />
            </Col>
          ))}
        </Row>
      </div>
    )
  }
}

export default PokerDeck