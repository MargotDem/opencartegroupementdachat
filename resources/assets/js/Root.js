import React, { Component } from 'react'
import { HashRouter } from 'react-router-dom'
// import { CookiesProvider } from 'react-cookie'

import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'
import { Scroller } from './components/scroller'

class Root extends Component {
  render () {
    return (
        // <p>henlo friend</p>
    //   <CookiesProvider>
        <HashRouter>
          <div>
            <div className='borders'>
              <div className='border hor top' />
              <div className='border hor bot' />
              <div className='border vert left' />
              <div className='border vert right' />
            </div>
            <Scroller />
            <Header />
            <Body />
            <Footer />
          </div>
        </HashRouter>
    //   </CookiesProvider>
    )
  }
}

export default Root
