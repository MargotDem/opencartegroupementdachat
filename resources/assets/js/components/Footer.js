import React, { Component } from 'react'

export default class Footer extends Component {
  render () {
    return (
      <div className='footer-box'>
        <div className='container'>
          <div className='row footer-content'>
            <a href="https://association.aji-france.com/" target="_blank" rel="noopener noreferrer">
              <img className="footer-logo" src="logo.png" alt="Logo AJI" />
            </a>
          </div>
        </div>
      </div>
    )
  }
}
