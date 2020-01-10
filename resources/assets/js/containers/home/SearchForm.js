import React, { Component } from 'react'

export default class SearchForm extends Component {
  constructor (props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleClick (searchType) {
    this.props.handleClick(searchType)
  }

  handleInputChange (e) {
    let value = e.target.value
    let field = e.target.name
    this.setState({
      [field]: value
    })
  }

  handleSubmission (criteria) {
    let { type } = this.props
    if (type === 'small-device') {
      type = this.state.searchType || 'schools'
    }

    let url = (type === 'agencies' ? '#/agences?' : '#/etablissements?')
    Object.keys(criteria).map(item => {
      url = url + item + '=' + criteria[item] + '&'
    })
    url = url.substring(0, url.lastIndexOf('&'))
    window.location = url
  }

  handleKeyPress (event) {
    if (event.key === 'Enter') {
      this.handleSubmission(this.state)
    }
  }

  renderFormForSmallDevices () {
    return (
      <div className='search-form-small-device'>
        <form method='post'>

          <select name='searchType' onChange={this.handleInputChange}>
            <option defaultValue='schools'>Établissement</option>
            <option value='agencies'>Agence</option>
          </select>

          <div className='search-form-content-title'>
            Renseignez un ou plusieurs
            <br />
            critères de recherche :
          </div>

          <input
            type='text'
            id='code_uai'
            name='code_uai'
            placeholder='Code UAI'
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
          />

          <select name='type_etablissement' id='type_etablissement' onChange={this.handleInputChange}>
            <option defaultValue=''>Type d’établissement</option>
            <option value='Collège'>Collège</option>
            <option value='Lycée'>Lycée</option>
            <option value='Lycée professionnel'>Lycée professionnel</option>
            <option value='Etablissement régional d’enseignement adapté'>Etablissement régional d’enseignement adapté</option>
            <option value='Lycée agricole'>Lycée agricole</option>
            <option value='Etablissement scolaire public innovant'>Etablissement scolaire public innovant</option>
            <option value='Centre de formation d’apprentis'>Centre de formation d’apprentis</option>
            <option value='GRETA'>GRETA</option>
          </select>

          <input
            type='text'
            id='nom'
            name='nom'
            placeholder='Nom'
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
          />

          <select name='region' id='region' onChange={this.handleInputChange}>
            <option value=''>Région</option>
            <option value='Occitanie'>Occitanie</option>
            <option value='Ile-de-France'>Ile-de-France</option>
            <option value='Nouvelle Aquitaine'>Nouvelle Aquitaine</option>
            <option value='Bretagne'>Bretagne</option>
            <option value='Bourgogne-Franche-Comté'>Bourgogne-Franche-Comté</option>
            <option value='Grand Est'>Grand Est</option>
            <option value='Pays de la Loire'>Pays de la Loire</option>
            <option value='Hauts-de-France'>Hauts-de-France</option>
            <option value='Auvergne-Rhône-Alpes'>Auvergne-Rhône-Alpes</option>
            <option value='Centre-Val de Loire'>Centre-Val de Loire</option>
            <option value='Provence-Alpes-Côte d’Azur'>Provence-Alpes-Côte d’Azur</option>
            <option value='Normandie'>Normandie</option>
            <option value='Guadeloupe'>Guadeloupe</option>
            <option value='Corse'>Corse</option>
            <option value='Martinique'>Martinique</option>
            <option value='La Réunion'>La Réunion</option>
            <option value='Guyane'>Guyane</option>
            <option value='Mayotte'>Mayotte</option>
            <option value='Collectivité d’outre-mer'>Collectivité d’outre-mer</option>
          </select>

          <select name='academie' id='academie' onChange={this.handleInputChange}>
            <option value=''>Académie</option>
            <option value='Lille'>Lille</option>
            <option value='Amiens'>Amiens</option>
            <option value='Rouen'>Rouen</option>
            <option value='Reims'>Reims</option>
            <option value='Nancy-Metz'>Nancy-Metz</option>
            <option value='Strasbourg'>Strasbourg</option>
            <option value='Besançon'>Besançon</option>
            <option value='Dijon'>Dijon</option>
            <option value='Paris'>Paris</option>
            <option value='Créteil'>Créteil</option>
            <option value='Versailles'>Versailles</option>
            <option value='Orléans-Tour'>Orléans-Tour</option>
            <option value='Caen'>Caen</option>
            <option value='Rennes'>Rennes</option>
            <option value='Nantes'>Nantes</option>
            <option value='Poitiers'>Poitiers</option>
            <option value='Limoges'>Limoges</option>
            <option value='Lyon'>Lyon</option>
            <option value='Clermont-Ferrand'>Clermont-Ferrand</option>
            <option value='Grenoble'>Grenoble</option>
            <option value='Aix-Marseille'>Aix-Marseille</option>
            <option value='Nice'>Nice</option>
            <option value='Montpellier'>Montpellier</option>
            <option value='Toulouse'>Toulouse</option>
            <option value='Bordeaux'>Bordeaux</option>
            <option value='Corse'>Corse</option>
            <option value='Guyane'>Guyane</option>
            <option value='Martinique'>Martinique</option>
            <option value='Guadeloupe'>Guadeloupe</option>
            <option value='La Réunion'>La Réunion</option>
            <option value='Mayotte'>Mayotte</option>
            <option value='Saint-Pierre-et-Miquelon'>Saint-Pierre-et-Miquelon</option>
          </select>

          <input
            type='text'
            id='departement'
            name='departement'
            placeholder='Département'
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
          />

          <input
            type='text'
            id='commune'
            name='commune'
            placeholder='Commune'
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
          />

          <div
            className='my-button'
            onClick={() => { this.handleSubmission(this.state) }}
          >
            Rechercher
          </div>
        </form>
      </div>
    )
  }

  render () {
    let { type, text, currentSearchType, side } = this.props
    if (type === 'small-device') {
      return this.renderFormForSmallDevices()
    }
    return (
      <div className={'search-form-' + type + (currentSearchType === type ? ' search-form-' + type + '-expand' : '') + ((currentSearchType !== '' && type === 'agencies') ? ' search-form-agencies-expanded' : '') + ((currentSearchType === 'schools' && type === 'agencies') ? ' search-form-agencies-reduced' : '')}>

        <div className={'search-form-' + type + '-text'}>
          <div className='my-button' onClick={() => this.handleClick(type)}>{text}</div>
        </div>

        <div className={'search-form-content' + (currentSearchType === type ? ' search-form-content-show' : '')}>
          <div className={'search-form-content-title search-form-content-title-' + side}>Renseignez un ou plusieurs critères de recherche :</div>
          <div className={'search-form-content-inputs-' + side}>

            <form method='post'>

              <input
                type='text'
                id='code_uai'
                name='code_uai'
                placeholder='Code UAI'
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
              />

              <select name='type_etablissement' id='type_etablissement' onChange={this.handleInputChange}>
                <option defaultValue=''>Type d’établissement</option>
                <option value='Collège'>Collège</option>
                <option value='Lycée'>Lycée</option>
                <option value='Lycée professionnel'>Lycée professionnel</option>
                <option value='Etablissement régional d’enseignement adapté'>Etablissement régional d’enseignement adapté</option>
                <option value='Lycée agricole'>Lycée agricole</option>
                <option value='Etablissement scolaire public innovant'>Etablissement scolaire public innovant</option>
                <option value='Centre de formation d’apprentis'>Centre de formation d’apprentis</option>
                <option value='GRETA'>GRETA</option>
              </select>

              <input
                type='text'
                id='nom'
                name='nom'
                placeholder='Nom'
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
              />

              <select name='region' id='region' onChange={this.handleInputChange}>
                <option value=''>Région</option>
                <option value='Occitanie'>Occitanie</option>
                <option value='Ile-de-France'>Ile-de-France</option>
                <option value='Nouvelle Aquitaine'>Nouvelle Aquitaine</option>
                <option value='Bretagne'>Bretagne</option>
                <option value='Bourgogne-Franche-Comté'>Bourgogne-Franche-Comté</option>
                <option value='Grand Est'>Grand Est</option>
                <option value='Pays de la Loire'>Pays de la Loire</option>
                <option value='Hauts-de-France'>Hauts-de-France</option>
                <option value='Auvergne-Rhône-Alpes'>Auvergne-Rhône-Alpes</option>
                <option value='Centre-Val de Loire'>Centre-Val de Loire</option>
                <option value='Provence-Alpes-Côte d’Azur'>Provence-Alpes-Côte d’Azur</option>
                <option value='Normandie'>Normandie</option>
                <option value='Guadeloupe'>Guadeloupe</option>
                <option value='Corse'>Corse</option>
                <option value='Martinique'>Martinique</option>
                <option value='La Réunion'>La Réunion</option>
                <option value='Guyane'>Guyane</option>
                <option value='Mayotte'>Mayotte</option>
                <option value='Collectivité d’outre-mer'>Collectivité d’outre-mer</option>
              </select>

              <select name='academie' id='academie' onChange={this.handleInputChange}>
                <option value=''>Académie</option>
                <option value='Lille'>Lille</option>
                <option value='Amiens'>Amiens</option>
                <option value='Rouen'>Rouen</option>
                <option value='Reims'>Reims</option>
                <option value='Nancy-Metz'>Nancy-Metz</option>
                <option value='Strasbourg'>Strasbourg</option>
                <option value='Besançon'>Besançon</option>
                <option value='Dijon'>Dijon</option>
                <option value='Paris'>Paris</option>
                <option value='Créteil'>Créteil</option>
                <option value='Versailles'>Versailles</option>
                <option value='Orléans-Tour'>Orléans-Tour</option>
                <option value='Caen'>Caen</option>
                <option value='Rennes'>Rennes</option>
                <option value='Nantes'>Nantes</option>
                <option value='Poitiers'>Poitiers</option>
                <option value='Limoges'>Limoges</option>
                <option value='Lyon'>Lyon</option>
                <option value='Clermont-Ferrand'>Clermont-Ferrand</option>
                <option value='Grenoble'>Grenoble</option>
                <option value='Aix-Marseille'>Aix-Marseille</option>
                <option value='Nice'>Nice</option>
                <option value='Montpellier'>Montpellier</option>
                <option value='Toulouse'>Toulouse</option>
                <option value='Bordeaux'>Bordeaux</option>
                <option value='Corse'>Corse</option>
                <option value='Guyane'>Guyane</option>
                <option value='Martinique'>Martinique</option>
                <option value='Guadeloupe'>Guadeloupe</option>
                <option value='La Réunion'>La Réunion</option>
                <option value='Mayotte'>Mayotte</option>
                <option value='Saint-Pierre-et-Miquelon'>Saint-Pierre-et-Miquelon</option>
              </select>

              <input
                type='text'
                id='departement'
                name='departement'
                placeholder='Département'
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
              />

              <input
                type='text'
                id='commune'
                name='commune'
                placeholder='Commune'
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
              />

              <div
                className='my-button'
                onClick={() => { this.handleSubmission(this.state) }}
              >
                Rechercher
              </div>
            </form>

          </div>
        </div>
      </div>
    )
  }
}
