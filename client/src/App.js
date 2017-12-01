import React, { Component } from 'react';
import PokerDeck from './PokerDeck'
import NameForm from './NameForm'
import { Grid, Row, Col, PageHeader, Jumbotron } from 'react-bootstrap'

class App extends Component {
  state = {
    name: undefined,
    isSpectator: undefined
  }

  handleOnSelectName (name, isSpectator) {
    this.setState({name, isSpectator})
  }

  render() {
    return (
      <Grid className="App">
        {!this.state.name &&
        <Row>
          <Col md={8} mdOffset={2}>
            <Jumbotron>
              <h1>Welcome to Planning Poker</h1>
              <p>
                Enter your name to begin. To play planning poker get your friends or colleagues to join
                and start estimating a ticket. When you are all ready select an estimate then press
                the 'Reveal All' button to show everyones estimates. Press the 'Clear All' button to start again.
              </p>
              <p>Spectators can only view scores but not contribute</p>
              <NameForm
                setName={name => this.handleOnSelectName(name, false)}
                setSpectate={name => this.handleOnSelectName(name, true)}
              />
            </Jumbotron>
          </Col>
        </Row>
        }
        {this.state.name &&
        <div>
          <Row>
            <Col md={12}><PageHeader>Planning Poker</PageHeader></Col>
          </Row>
          <PokerDeck name={this.state.name} isSpectator={this.state.isSpectator}/>
        </div>
        }
      </Grid>
    );
  }
}

export default App;
