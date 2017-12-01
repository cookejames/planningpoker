import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormGroup, FormControl, Button } from 'react-bootstrap'
const MINIMUM_NAME_LENGTH = 3

class NameForm extends Component {
  state = {
    name: ''
  }

  static propTypes = {
    setName: PropTypes.func.isRequired
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

  handleOnClick (e) {
    this.props.setName(this.state.name)
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
        <Button
          type='submit'
          disabled={!this.isNameValid()}
          onClick={() => this.handleOnClick()}>
          Enter
        </Button>
      </form>
    )
  }
}

export default NameForm