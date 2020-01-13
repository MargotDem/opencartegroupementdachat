import React, { Component } from 'react'

import PageComponent from '../../components/PageComponent'
import TopContent from './TopContent'
import SearchFormSection from './SearchFormSection'
import About from './About'
import { Waypoint } from 'react-waypoint'

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      scrolledPast: false
    })
    this._handleWaypoint = this._handleWaypoint.bind(this)
  }

  _handleWaypoint (scrolledPast) {
    this.setState({ scrolledPast: scrolledPast })
  }

  render () {
    let { motsCles } = this.props
    return (
      <PageComponent>
        <TopContent scrolledPast={this.state.scrolledPast} />
        <SearchFormSection motsCles={motsCles} />
        <Waypoint
          onEnter={() => { this._handleWaypoint(true) }}
          onLeave={() => { this._handleWaypoint(false) }}
        />
        <About />
      </PageComponent>
    )
  }
}
