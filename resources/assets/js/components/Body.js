import React, { Component } from 'react'
// import { withCookies } from 'react-cookie'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from '../containers/home/Home'

class Body extends Component {
  constructor (props) {
    super(props)
    this.state = { isAdminLogged: false }
    // this.logUnlogAdmin = this.logUnlogAdmin.bind(this)
  }

//   // checking whether admin is connected here because we need it site-wide
//   componentDidMount () {
//     const { cookies } = this.props
//     let isAdminLogged = cookies.get('admin') === 'true'
//     this.setState({
//       isAdminLogged
//     })
//   }

//   logUnlogAdmin (isAdminLogged) {
//     this.setState({ isAdminLogged })
//   }

  buildRoute (path, isExact, Component, title) {
    let routeObject = {
      'path': path,
      'isExact': isExact,
      'Component': Component,
      'title': title
    }
    return routeObject
  }

  renderRoute (routeObject, index) {
    const dynamicTitle = routeObject.title ? (routeObject.title + ' - Open Carte Comptable') : 'Open Carte Comptable'
    const Component = routeObject.Component
    const { isAdminLogged } = this.state
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
          />
        }
      />
    )
  }

  renderRedirect (path, isExact, redirect) {
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

  render () {
    const ROUTES = [
      this.buildRoute('/', true, Home, null),
    ]

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

// export default withCookies(Body)
export default Body