import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Header extends Component {
  render () {
    return (
      <div className='header-box'>
        <div className='container'>
          <div className='row'>
            <div className='header__links'>
              <div className='header__left'>
                <NavLink to='/'>Open Carte Groupement d’Achats</NavLink>
              </div>
              <div className='header__right'>
                <NavLink to='/ajouter-etablissement'>Ajouter un établissement</NavLink>
                {/* <NavLink to='/statistiques'>Statistiques</NavLink> */}
              </div>
              <div className='mobile-menu'>
                <div className='dropdown'>
                  <a className='' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                    <i className='fa fa-bars' />
                  </a>
                  <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                    <NavLink className='dropdown-item' to='/ajouter-etablissement'>Ajouter un établissement</NavLink>
                    {/* <NavLink className='dropdown-item' to='/statistiques'>Statistiques</NavLink> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
