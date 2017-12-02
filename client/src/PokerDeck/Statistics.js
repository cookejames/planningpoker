import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

class Statistics extends Component {
  static propTypes = {
    players: PropTypes.array.isRequired
  }

  computeStatistics (players) {
    players = players.filter(player => Number.isInteger(player.value))
    if (players.length === 0) {
      return {mean: 'na', median: 'na', mode: 'na'}
    }

    // Calculate mean
    const total = players.map(player => player.value)
      .reduce((accumulator, currentValue) => accumulator + currentValue)
    let mean = total / players.length
    console.log('TOTAL', total, players.length)
    mean = Math.round((mean * 10)) / 10

    // Calculate median
    const sorted = players.map(player => player.value)
      .sort((a, b) => a - b)
    const middle = Math.floor(sorted.length / 2)
    const isEven = sorted.length % 2 === 0
    const median = isEven ? (sorted[middle] + sorted[middle - 1]) / 2 : sorted[middle]

    // Calculate mode
    let mode = 0
    let count = 0
    let hash = {}
    players.forEach(player => {
      if (hash.hasOwnProperty(player.value)) {
        hash[player.value]++
      } else {
        hash[player.value] = 1
      }
    })
    for (const number in hash) {
      if (hash[number] > count) {
        mode = number
        count = hash[number]
      }
    }

    return {mean, median, mode}
  }
  render () {
    const {mean, median, mode} = this.computeStatistics(this.props.players)
    return (
      <Button disabled={true}>Mean {mean} Median {median} Mode {mode}</Button>
    )
  }
}

export default Statistics