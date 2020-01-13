import React, { Component } from 'react'

export default class FormSection extends Component {
  render () {
    let { form, children } = this.props
    return (
      <div className={'form-section-box' + ' form-section-box_' + form}>
        <div className='container'>
          <div className='row form-section'>
            {children}
          </div>
        </div>
      </div>
    )
  }
}
