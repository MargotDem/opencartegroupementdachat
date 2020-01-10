import React, { Component } from 'react'

import { Waypoint } from 'react-waypoint'
import renderHTML from 'react-render-html'

export default class AboutParagraph extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      scrolledPast: false
    })
    this._handleWaypoint = this._handleWaypoint.bind(this)
  }

  _handleWaypoint (scrolledPast) {
    setTimeout(() => {
      this.setState({ scrolledPast: scrolledPast })
    }, 500)
  }

  render () {
    let { title, para1, para2 } = this.props
    let { scrolledPast } = this.state
    return (
      <div>
        <div className={'about-paragraph' + (scrolledPast ? ' about-paragraph-show' : '')}>
          <div className='about-paragraph-title'>
            <h3>{renderHTML(title)}</h3>
          </div>
          <Waypoint
            onEnter={() => { this._handleWaypoint(true) }}
          />
          <div className='about-paragraph-text'>
            <p className='first-paragraph'>{renderHTML(para1)}</p>
            {
              para2 && <p className='second-paragraph'>{renderHTML(para2)}</p>
            }
          </div>
        </div>
      </div>
    )
  }
}
