import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormGroup, FormControl, Button } from 'react-bootstrap'
import './NameForm.css'
const MINIMUM_NAME_LENGTH = 2

class NameForm extends Component {
  state = {
    name: ''
  }

  static propTypes = {
    setName: PropTypes.func.isRequired,
    setSpectate: PropTypes.func.isRequired
  }

  isNameValid () {
    return this.state.name.length >= MINIMUM_NAME_LENGTH
  }

  getValidationState () {
    if (this.state.name.length >= MINIMUM_NAME_LENGTH) return 'success';
    if (this.state.name.length > 0) return 'error';
    return null
  }

  handleChange (e) {
    this.setState({name: e.target.value})
  }

  render () {
    return (
      <form>
        <FormGroup
          controlId='nameInput'
          validationState={this.getValidationState()}
        >
          <FormControl
            type='text'
            value={this.state.name}
            placeholder='Enter your name'
            onChange={e => this.handleChange(e)}
          />
          <FormControl.Feedback />
        </FormGroup>
        <div className='NameForm__buttons'>
          <Button
            type='submit'
            bsStyle="primary"
            disabled={!this.isNameValid()}
            onClick={() => this.props.setName(this.state.name)}>
            Enter
          </Button>
          <Button
            bsStyle="info"
            disabled={!this.isNameValid()}
            onClick={() => this.props.setSpectate(this.state.name)}>
            Spectate
          </Button>
        </div>
      </form>
    )
  }
}

export default NameForm