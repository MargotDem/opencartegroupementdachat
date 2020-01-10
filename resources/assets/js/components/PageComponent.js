import React, { Component } from 'react'

export default class PageComponent extends Component {
  componentDidMount () {
    setTimeout(function () { document.getElementById('page-component').className = 'page-component page-component-show' }, 300)
  }

  render () {
    return (
      <div>
        <div className='page-component' id='page-component' />
        {this.props.children}
      </div>
    )
  }
}
