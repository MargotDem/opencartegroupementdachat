import React, { Component } from 'react'

import AddPending from "./AddPending"
import DeletePending from "./DeletePending"

const ADMINVIEWS = {
  addPending: AddPending,
  deletePending: DeletePending
}

export default class AdminActions extends Component {
  constructor (props) {
    super(props)
    this.state = {
      view: null
    }
  }

  changeView (view) {
    this.setState({
      view
    })
  }

  renderAdminActionComponent (view) {
    let Component = ADMINVIEWS[view]
    return (
      <div className='admin-actions'>
        <a onClick={() => this.changeView(null)}>Retour</a>
        <Component isAdminLogged={this.props.isAdminLogged} />
      </div>
    )
  }

  renderAdminActionsList () {
    return (
      <div className='admin-actions'>
        <a onClick={() => this.changeView('addPending')}>Demandes d’ajout</a>
        <br />
        <a onClick={() => this.changeView('deletePending')}>Demandes de suppression</a>
      </div>
    )
  }

  render () {
    let { view } = this.state
    if (view !== null) {
      return this.renderAdminActionComponent(view)
    } else {
      return this.renderAdminActionsList()
    }
  }
}
