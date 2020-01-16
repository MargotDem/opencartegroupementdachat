import React, { Component } from 'react'

import Form from '../../components/Form'

export default class ChangeInfoForm extends Component {
  handleSubmission (school) {
    this.props.handleSubmission(school)
  }
  render () {
    const { _handleWaypoint, school, motsCles } = this.props
    return (
      <div>
        <Form
            form={'changeInfoForm'}
            _handleWaypoint={_handleWaypoint}
            handleSubmission={this.handleSubmission.bind(this)}
            school={school}
            motsCles={motsCles}
        />
      </div>
    )
  }
}
