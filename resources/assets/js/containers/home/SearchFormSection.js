import React, { Component } from 'react'

import SearchForm from './SearchForm'

export default class SearchFormSection extends Component {
  render() {
    let { motsCles } = this.props
    return (
      <div className="search-form-box">
        <div className='container'>
          <div className='row'>

            <div id='search-form' className='search-form-title'>
              Renseignez un ou plusieurs critères de recherche :
            </div>

            <div className='search-form'>
              <SearchForm motsCles={motsCles} />
            </div>

          </div>
        </div>
      </div>
    )
  }
}
