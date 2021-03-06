import React, { Component } from 'react'
import { withCookies } from 'react-cookie'
import { Switch, Route, Redirect } from 'react-router-dom'
import axios from 'axios'

import Home from '../containers/home/Home'
import AddSchool from '../containers/addSchool/AddSchool'
import Schools from '../containers/schools/Schools'
import Admin from '../containers/admin/Admin'
import ChangeInfo from '../containers/changeInfo/ChangeInfo'


class Body extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAdminLogged: false,
      noDatabaseConnection: false,
      motsCles: null,
      adminEmails: null
    }
    this.logUnlogAdmin = this.logUnlogAdmin.bind(this)
  }

  logUnlogAdmin(isAdminLogged) {
    this.setState({ isAdminLogged })
  }

  // checking whether admin is connected here because we need it site-wide
  componentDidMount() {
    const { cookies } = this.props
    let isAdminLogged = cookies.get('admin') === 'true'
    this.setState({
      isAdminLogged
    })
    axios.get('/api/mots-cles')
      .then(response => {
        if (!response.data.motsClesFournitures["errno"]) {
          this.setState({ motsCles: response.data })
          axios.get("/api/adminEmails")
            .then(response => {
              this.setState({ adminEmails: response.data.map(admin => admin.email) })
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          this.setState({ noDatabaseConnection: true })
        }
      }).catch(error => {
        console.log(error)
      })

  }

  buildRoute(path, isExact, Component, title) {
    let routeObject = {
      'path': path,
      'isExact': isExact,
      'Component': Component,
      'title': title
    }
    return routeObject
  }

  renderRoute(routeObject, index) {
    const dynamicTitle = routeObject.title ? (routeObject.title + ' - Open Carte Comptable') : 'Open Carte Comptable'
    const Component = routeObject.Component
    const { isAdminLogged, motsCles, adminEmails } = this.state
    return (
      <Route
        key={index}
        exact={routeObject.isExact}
        path={routeObject.path}
        render={
          (props) => <Component
            {...props}
            dynamicTitle={dynamicTitle}
            isAdminLogged={isAdminLogged}
            logUnlogAdmin={this.logUnlogAdmin}
            motsCles={motsCles}
            adminEmails={adminEmails}
          />
        }
      />
    )
  }

  renderRedirect(path, isExact, redirect) {
    return (
      <Route
        exact={isExact}
        path={path}
        render={
          (props) => <Redirect
            to={redirect + (props.match.params.uai !== undefined ? props.match.params.uai : '')}
          />
        }
      />
    )
  }

  render() {
    const ROUTES = [
      this.buildRoute('/', true, Home, null),
      this.buildRoute('/ajouter-etablissement', false, AddSchool, null),
      this.buildRoute('/etablissements', true, Schools, null),
      this.buildRoute('/admin', false, Admin, null),
      this.buildRoute('/etablissements/:uai/modifier-informations', false, ChangeInfo, null),
    ]

    if (this.state.noDatabaseConnection) {
      return <div className="database-connection-error">
        Il y a eu un problème avec la connection à la base de données
      </div>
    }

    return (
      <div>
        <Switch>
          {
            ROUTES.map((item, index) => {
              return (
                this.renderRoute(item, index)
              )
            })
          }
          {this.renderRedirect('/', false, '/')}
        </Switch>
      </div>
    )
  }
}

export default withCookies(Body)
