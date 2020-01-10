import React, { Component } from 'react'

import SearchForm from './SearchForm'

export default class SearchFormSection extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchType: ''
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (searchType) {
    if (this.state.searchType !== '') {
      this.setState({
        searchType: ''
      })
    }
    this.setState({
      searchType: searchType
    })
    document.getElementById('search-form').scrollIntoView({behavior: 'smooth', block: 'start'})
  }

  render () {
    let { searchType } = this.state
    return (
      <div className={'search-form-box' + (searchType !== '' ? ' search-form-box-expand' : '')}>
        <div className='container'>
          <div className='row'>

            <div id='search-form' className='search-form-title'>
              Souhaitez-vous effectuer une recherche par établissement ou par agence comptable ?
            </div>

            <div className='search-form'>

              <SearchForm
                type='agencies'
                text={'Agence'}
                currentSearchType={searchType}
                handleClick={this.handleClick}
                side='left'
              />

              <SearchForm
                type='schools'
                text={'Etablissement'}
                currentSearchType={searchType}
                handleClick={this.handleClick}
                side='right'
              />

              <SearchForm
                type='small-device'
              />

            </div>

          </div>
        </div>
      </div>
    )
  }
}
