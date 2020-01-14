import React, { Component } from 'react'

export default class ResultsSection extends Component {
  render () {
    let { children } = this.props
    return (
      <div className='results-section-box'>
        <div className='container'>
          <div className='row results-section'>
            {children}
          </div>
        </div>
      </div>
    )
  }
}
