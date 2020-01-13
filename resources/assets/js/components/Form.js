import React, { Component } from 'react'
import { Waypoint } from 'react-waypoint'
import SimpleReactValidator from 'simple-react-validator';

const REGIONS = [
  "Auvergne-Rhône-Alpes",
  "Bourgogne-Franche-Comté",
  "Bretagne",
  "Centre-Val de Loire",
  "Collectivité d’outre-mer",
  "Corse",
  "Grand Est",
  "Guadeloupe",
  "Guyane",
  "Hauts-de-France",
  "Ile-de-France",
  "La Réunion",
  "Martinique",
  "Mayotte",
  "Nouvelle Aquitaine",
  "Normandie",
  "Occitanie",
  "Pays de la Loire",
  "Provence-Alpes-Côte d’Azur"
]

const ACADEMIES = [
  "Aix-Marseille",
  "Amiens",
  "Besançon",
  "Bordeaux",
  "Caen",
  "Clermont-Ferrand",
  "Corse",
  "Créteil",
  "Dijon",
  "Grenoble",
  "Guadeloupe",
  "Guyane",
  "La Réunion",
  "Lille",
  "Limoges",
  "Lyon",
  "Martinique",
  "Mayotte",
  "Montpellier",
  "Nancy-Metz",
  "Nantes",
  "Nice",
  "Orléans-Tour",
  "Paris",
  "Poitiers",
  "Reims",
  "Rennes",
  "Rouen",
  "Strasbourg",
  "Saint-Pierre-et-Miquelon",
  "Toulouse",
  "Versailles",
]

const DEPARTEMENTS = [
  "01 - Ain",
  "02 - Aisne",
  "03 - Allier",
  "04 - Alpes-de-Haute-Provence",
  "06 - Alpes-Maritimes",
  "07 - Ardèche",
  "08 - Ardennes",
  "09 - Ariège",
  "10 - Aube",
  "11 - Aude",
  "12 - Aveyron",
  "67 - Bas-Rhin",
  "13 - Bouches-du-Rhône",
  "14 - Calvados",
  "15 - Cantal",
  "16 - Charente",
  "17 - Charente-Maritime",
  "18 - Cher",
  "19 - Corrèze",
  "2A - Corse-du-Sud",
  "21 - Côte-d'Or",
  "22 - Côtes-d'Armor",
  "23 - Creuse",
  "79 - Deux-Sèvres",
  "24 - Dordogne",
  "25 - Doubs",
  "26 - Drôme",
  "91 - Essonne",
  "27 - Eure",
  "28 - Eure-et-Loir",
  "29 - Finistère",
  "30 - Gard",
  "32 - Gers",
  "33 - Gironde",
  "971 - Guadeloupe",
  "973 - Guyane",
  "05 - Hautes-Alpes",
  "65 - Hautes-Pyrénées",
  "2B - Haute-Corse",
  "31 - Haute-Garonne",
  "43 - Haute-Loire",
  "52 - Haute-Marne",
  "70 - Haute-Saône",
  "74 - Haute-Savoie",
  "87 - Haute-Vienne",
  "92 - Hauts-de-Seine",
  "68 - Haut-Rhin",
  "34 - Hérault",
  "35 - Ille-et-Vilaine",
  "36 - Indre",
  "37 - Indre-et-Loire",
  "38 - Isère",
  "39 - Jura",
  "40 - Landes",
  "974 - La Réunion",
  "42 - Loire",
  "45 - Loiret",
  "44 - Loire-Atlantique",
  "41 - Loir-et-Cher",
  "46 - Lot",
  "47 - Lot-et-Garonne",
  "48 - Lozère",
  "49 - Maine-et-Loire",
  "50 - Manche",
  "51 - Marne",
  "972 - Martinique",
  "53 - Mayenne",
  "976 - Mayotte",
  "54 - Meurthe-et-Moselle",
  "55 - Meuse",
  "56 - Morbihan",
  "57 - Moselle",
  "58 - Nièvre",
  "59 - Nord",
  "60 - Oise",
  "61 - Orne",
  "75 - Paris",
  "62 - Pas-de-Calais",
  "63 - Puy-de-Dôme",
  "64 - Pyrénées-Atlantiques",
  "66 - Pyrénées-Orientales",
  "69 - Rhône",
  "71 - Saône-et-Loire",
  "72 - Sarthe",
  "73 - Savoie",
  "93 - Seine-Saint-Denis",
  "76 - Seine-Maritime",
  "77 - Seine-et-Marne",
  "80 - Somme",
  "81 - Tarn",
  "82 - Tarn-et-Garonne",
  "90 - Territoire de Belfort",
  "94 - Val-de-Marne",
  "95 - Val-d'Oise",
  "83 - Var",
  "84 - Vaucluse",
  "85 - Vendée",
  "86 - Vienne",
  "88 - Vosges",
  "89 - Yonne",
  "78 - Yvelines",
]

export default class Form extends Component {
  constructor(props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleSubmission = this.handleSubmission.bind(this)
    this.validator = new SimpleReactValidator({
      messages: {
        min: 'Le code UAI doit contenir 7 chiffres et une lettre',
        max: 'Le code UAI doit contenir 7 chiffres et une lettre',
        required: 'Ce champ est requis',
        alpha_num: 'Le code UAI doit contenir 7 chiffres et une lettre',
        code_uai: 'Le code UAI doit contenir 7 chiffres et une lettre',
        memo: 'Les informations complémentaires ne doivent pas dépasser 5 caractères',
        nom: 'Le nom ne doit pas dépasser 70 caractères',
        commune: 'La commune ne doit pas dépasser 50 caractères',
        code_postal: 'Le code postal ne doit pas dépasser 6 caractères',
        adresse: 'L’adresse ne doit pas dépasser 70 caractères',
        phone: 'Le téléphone doit être un numéro valide',
        email: "L'adresse email doit être valide"
      },
      validators: {
        code_uai: {
          rule: (val, params, validator) => {
            return validator.helpers.testRegex(val.substring(7), /[A-Za-z]/) && validator.helpers.testRegex(val.substring(0, 7), /^[0-9]*$/) && val.length === 8
          },
        },
        nom: {
          rule: function (val) {
            return val.length <= 70
          },
        },
        adresse: {
          rule: function (val) {
            return val.length <= 70
          },
        },
        code_postal: {
          rule: function (val) {
            return val.length <= 6
          },
        },
        commune: {
          rule: function (val) {
            return val.length <= 50
          },
        },
        telephone: {
          rule: function (val) {
            return validator.helpers.testRegex(val, /(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)/)
          }
        },
        infos_complementaires: {
          rule: function (val) {
            return val.length <= 255
          }
        }
      }
    })
  }

  componentDidMount() {
    let { form } = this.props
    if (form === 'changeInfoForm') {
      this.setState({ info: '' })
    } else if (form === 'changeFondePvForm') {
      this.setState({ showFondePv: false })
    }
  }



  handleInputChange(e) {
    let value = e.target.value
    let field = e.target.name

    if (field === "zone_de_couverture") {
      this.setState({ zone_de_couverture: value })
      switch (value) {
        case "1":
          this.setState({
            zone_de_couverture_departement: "",
            zone_de_couverture_departements: []
          })
          break
        case "2":
          this.setState({
            zone_de_couverture_code_postal: "",
            zone_de_couverture_departements: []
          })
          break
        case "3":
          this.setState({
            zone_de_couverture_code_postal: "",
            zone_de_couverture_departement: "",
          })
          break
      }
    } else if (field === "zone_de_couverture_departements" || field === "mots_cles_fournitures" || field === "mots_cles_services") {
      let list = this.state[field] || []
      if (list.indexOf(value) === -1) {
        list.push(value)
        this.setState({ [field]: list })
      }
    } else {
      this.setState({
        [field]: value,
      })
    }
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.handleSubmission(this.state)
    }
  }

  handleSubmission(userInput) {
    let { handleSubmission } = this.props
    if (this.validator.allValid()) {
      handleSubmission(userInput)
    } else {
      this.validator.showMessages()
      // rerender to show messages for the first time
      this.forceUpdate()
    }
  }

  removeFromMultipleSelect(field, valueToRemove) {
    let list = this.state[field]
    list = list.filter(value => value !== valueToRemove)
    this.setState({ [field]: list })
  }

  renderZoneDeCouverture() {
    let { zone_de_couverture } = this.state
    if (zone_de_couverture === "1") {
      return (
        <>
          <input
            type='text'
            name='zone_de_couverture_code_postal'
            id='zone_de_couverture_code_postal'
            placeholder='Code postal *'
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
          />
          {this.validator.message('code_postal', this.state ? this.state.zone_de_couverture_code_postal : '', 'required|code_postal')}
        </>
      )
    } else if (zone_de_couverture === "2") {
      return (
        <>
          <select name='zone_de_couverture_departement' id='zone_de_couverture_departement' onChange={this.handleInputChange}>
            <option value=''>Département *</option>
            {this.renderDepartementSelect()}
          </select>
          {this.validator.message('zone_de_couverture_departement', this.state ? this.state.zone_de_couverture_departement : '', 'required')}
        </>
      )
    } else if (zone_de_couverture === "3") {
      return (
        <>
          <div>
            <ul>
              {this.state.zone_de_couverture_departements && this.state.zone_de_couverture_departements.map((departement, index) => {
                return <li>
                  <span key={index}>{departement}</span>
                  &nbsp;
                <span onClick={() => this.removeFromMultipleSelect("zone_de_couverture_departements", departement)}>x</span>
                </li>
              })}
            </ul>

          </div>
          <select name='zone_de_couverture_departements' id='zone_de_couverture_departements' onChange={this.handleInputChange}>
            <option value=''>Départements *</option>
            {this.renderDepartementSelect()}
          </select>
          {this.validator.message('zone_de_couverture_departements', this.state ? this.state.zone_de_couverture_departements : '', 'required')}
        </>
      )
    } else return null
  }


  renderDepartementSelect() {
    return <>{DEPARTEMENTS.map((departement, index) => <option key={index} value={departement}>{departement}</option>)}}</>
  }

  renderAddSchoolForm() {
    let { _handleWaypoint, motsCles } = this.props
    return (
      <form>
        <input
          type='text'
          id='code_uai'
          name='code_uai'
          placeholder='Code UAI *'
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
        />
        {this.validator.message('code_uai', this.state ? this.state.code_uai : '', 'required|code_uai')}

        <input
          type='text'
          name='nom'
          id='nom'
          placeholder='Nom *'
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
        />
        {this.validator.message('nom', this.state ? this.state.nom : '', 'required|nom')}

        <input
          type='text'
          name='adresse'
          id='adresse'
          placeholder='Adresse *'
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
        />
        {this.validator.message("adresse", this.state ? this.state.adresse : '', 'required|adresse')}

        <input
          type='text'
          name='code_postal'
          id='code_postal'
          placeholder='Code postal *'
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
        />
        {this.validator.message('code_postal', this.state ? this.state.code_postal : '', 'required|code_postal')}

        <input
          type='text'
          name='commune'
          id='commune'
          placeholder='Commune *'
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
        />
        {this.validator.message('commune', this.state ? this.state.commune : '', 'required|commune')}

        <Waypoint
          onEnter={() => { _handleWaypoint(true) }}
          onLeave={() => { _handleWaypoint(false) }}
        />

        <select
          name='departement'
          id='departement'
          onChange={this.handleInputChange}
        >
          <option value=''>Département *</option>
          {this.renderDepartementSelect()}
        </select>
        {this.validator.message('departement', this.state ? this.state.departement : '', 'required')}

        <select name='region' id='region' onChange={this.handleInputChange}>
          <option value=''>Région *</option>
          {REGIONS.map((region, index) => <option key={index} value={region}>{region}</option>)}
        </select>
        {this.validator.message('region', this.state ? this.state.region : '', 'required')}

        <select name='academie' id='academie' onChange={this.handleInputChange}>
          <option value=''>Académie *</option>
          {ACADEMIES.map((academie, index) => <option key={index} value={academie}>{academie}</option>)}
        </select>
        {this.validator.message('academie', this.state ? this.state.academie : '', 'required')}


        <input
          type='text'
          name='telephone'
          id='telephone'
          placeholder='Téléphone *'
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
        />
        {this.validator.message('telephone', this.state ? this.state.telephone : '', 'required|phone')}

        <input
          type="text"
          name="email"
          id="email"
          placeholder="Email *"
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
        />
        {this.validator.message('email', this.state ? this.state.email : '', 'required|email')}

        <select name='nombre_adherents' id='nombre_adherents' onChange={this.handleInputChange}>
          <option value=''>Nombre d’adhérents *</option>
          <option value="1">1 - 10</option>
          <option value="2">11 - 50</option>
          <option value="3">51 - 100</option>
          <option value="4">+ de 100</option>
        </select>
        {this.validator.message('nombre_adherents', this.state ? this.state.nombre_adherents : '', 'required')}

        <select name="type_adherents" id="type_adherents" onChange={this.handleInputChange}>
          <option value=''>Type d’adhérents *</option>
          <option value="1">EPLE</option>
          <option value="2">Autres administrations publiques</option>
          <option value="3">Les deux</option>
        </select>
        {this.validator.message('type_adherents', this.state ? this.state.type_adherents : '', 'required')}


        <select name="zone_de_couverture" id="zone_de_couverture" onChange={this.handleInputChange}>
          <option value=''>Zone de couverture *</option>
          <option value="1">Ville et communes proches</option>
          <option value="2">Départementale</option>
          <option value="3">Interdépartementale</option>
        </select>
        {this.validator.message('zone_de_couverture', this.state ? this.state.zone_de_couverture : '', 'required')}

        {this.state && this.renderZoneDeCouverture()}


        <select name="type_marche" id="type_marche" onChange={this.handleInputChange}>
          <option value=''>Type de marché *</option>
          <option value="1">Fournitures</option>
          <option value="2">Services</option>
          <option value="3">Les deux</option>
        </select>
        {this.validator.message('type_marche', this.state ? this.state.type_marche : '', 'required')}

        {
          this.state && (this.state.type_marche === "1" || this.state.type_marche === "3") && <>
            <div>
              <ul>
                {this.state && this.state.mots_cles_fournitures && this.state.mots_cles_fournitures.map((mot, index) => {
                  return <li>
                    <span key={index}>{
                      motsCles.motsClesFournitures.find(el => el.id == mot).mot_cle
                    }</span>
                    &nbsp;
                <span onClick={() => this.removeFromMultipleSelect("mots_cles_fournitures", mot)}>x</span>
                  </li>
                })}
              </ul>

            </div>
            <select name='mots_cles_fournitures' id='mots_cles_fournitures' onChange={this.handleInputChange}>
              <option value=''>Mots clés fournitures</option>
              {motsCles && motsCles.motsClesFournitures.map((mot, index) => <option key={index} value={mot.id}>{mot.mot_cle}</option>)}
            </select>
          </>
        }

        {
          this.state && (this.state.type_marche === "2" || this.state.type_marche === "3") && <>
            <div>
              <ul>
                {this.state && this.state.mots_cles_services && this.state.mots_cles_services.map((mot, index) => {
                  return <li>
                    <span key={index}>{
                      motsCles.motsClesServices.find(el => el.id == mot).mot_cle
                    }</span>
                    &nbsp;
                <span onClick={() => this.removeFromMultipleSelect("mots_cles_services", mot)}>x</span>
                  </li>
                })}
              </ul>

            </div>
            <select name='mots_cles_services' id='mots_cles_services' onChange={this.handleInputChange}>
              <option value=''>Mots clés services</option>
              {motsCles && motsCles.motsClesServices.map((mot, index) => <option key={index} value={mot.id}>{mot.mot_cle}</option>)}
            </select>
          </>
        }

        <textarea
          name='infos_complementaires'
          id='infos_complementaires'
          placeholder='Informations complémentaires'
          onChange={this.handleInputChange}
        />
        {this.validator.message('infos_complementaires', this.state ? this.state.infos_complementaires : '', 'infos_complementaires')}

        <div
          className='my-button'
          name='ajouter'
          onClick={() => { this.handleSubmission(this.state) }}
        >
          Ajouter
        </div>
      </form>
    )
  }

  renderChangeAgencyForm() {
    let { _handleWaypoint } = this.props
    return (
      <form>
        <input
          type='text'
          id='code_uai'
          name='new_agency'
          placeholder='UAI nouvelle agence'
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
        />
        {this.validator.message('', this.state ? this.state.new_agency : '', 'required|alpha_num|max:8|min:8|code_uai')}

        <Waypoint
          onEnter={() => { _handleWaypoint(true) }}
          onLeave={() => { _handleWaypoint(false) }}
        />

        <div
          className='my-button'
          name='modifier'
          onClick={() => { this.handleSubmission(this.state) }}
        >
          Modifier
        </div>
      </form>
    )
  }

  renderAdminForm() {
    let { handleSubmission } = this.props
    return (
      <form>
        <input
          type='text'
          name='email'
          placeholder='Email'
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
        />
        <input
          type='password'
          name='password'
          placeholder='password'
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
        />
        <div
          className='my-button'
          name='ajouter'
          onClick={() => { handleSubmission(this.state) }}
        >
          Connexion
        </div>
      </form>
    )
  }

  renderChangeInfoForm() {
    let { _handleWaypoint, school } = this.props

    // wouldnt this work?
    school = school[0]
    let typeEtablissement = school && school['type_etablissement']
    let nom = school && school['nom']
    let adresse = school && school['adresse']
    let codePostal = school && school['code_postal']
    let commune = school && school['commune']
    let departement = school && school['departement']
    let region = school && school['region']
    let academie = school && school['academie']
    let telephone = school && school['telephone']
    let ca = school && school['ca']
    //
    // let typeEtablissement = school && this.props.school[0]['type_etablissement']
    // let nom = school && this.props.school[0]['nom']
    // let adresse = school && this.props.school[0]['adresse']
    // let codePostal = school && this.props.school[0]['code_postal']
    // let commune = school && this.props.school[0]['commune']
    // let departement = school && this.props.school[0]['departement']
    // let region = school && this.props.school[0]['region']
    // let academie = school && this.props.school[0]['academie']
    // let telephone = school && this.props.school[0]['telephone']
    // let ca = school && this.props.school[0]['ca']
    return (
      <form>
        <select name='type_etablissement' id='type_etablissement' onChange={this.handleInputChange}>
          <option value={typeEtablissement}>{typeEtablissement}</option>
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
          name='nom'
          id='nom'
          placeholder={nom}
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
        />
        {this.validator.message('', this.state ? this.state.nom : '', 'nom')}

        <input
          type='text'
          name='adresse'
          id='adresse'
          placeholder={adresse}
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
        />
        {this.validator.message('', this.state ? this.state.adresse : '', 'adresse')}

        <input
          type='text'
          name='code_postal'
          id='code_postal'
          placeholder={codePostal}
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
        />
        {this.validator.message('', this.state ? this.state.code_postal : '', 'code_postal')}

        <input
          type='text'
          name='commune'
          id='commune'
          placeholder={commune}
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
        />
        {this.validator.message('', this.state ? this.state.commune : '', 'commune')}

        <Waypoint
          onEnter={() => { _handleWaypoint(true) }}
          onLeave={() => { _handleWaypoint(false) }}
        />

        <input
          type='text'
          name='departement'
          id='departement'
          placeholder={departement}
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
        />
        {this.validator.message('', this.state ? this.state.departement : '', 'departement')}

        <select name='region' id='region' onChange={this.handleInputChange}>
          <option value={region}>{region}</option>
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
          <option value={academie}>{academie}</option>
          <option value='Aix-Marseille'>Aix-Marseille</option>
          <option value='Amiens'>Amiens</option>
          <option value='Besançon'>Besançon</option>
          <option value='Bordeaux'>Bordeaux</option>
          <option value='Caen'>Caen</option>
          <option value='Clermont-Ferrand'>Clermont-Ferrand</option>
          <option value='Corse'>Corse</option>
          <option value='Créteil'>Créteil</option>
          <option value='Dijon'>Dijon</option>
          <option value='Grenoble'>Grenoble</option>
          <option value='Guadeloupe'>Guadeloupe</option>
          <option value='Guyane'>Guyane</option>
          <option value='La Réunion'>La Réunion</option>
          <option value='Lille'>Lille</option>
          <option value='Limoges'>Limoges</option>
          <option value='Lyon'>Lyon</option>
          <option value='Martinique'>Martinique</option>
          <option value='Mayotte'>Mayotte</option>
          <option value='Montpellier'>Montpellier</option>
          <option value='Nancy-Metz'>Nancy-Metz</option>
          <option value='Nantes'>Nantes</option>
          <option value='Nice'>Nice</option>
          <option value='Orléans-Tour'>Orléans-Tour</option>
          <option value='Paris'>Paris</option>
          <option value='Poitiers'>Poitiers</option>
          <option value='Reims'>Reims</option>
          <option value='Rennes'>Rennes</option>
          <option value='Rouen'>Rouen</option>
          <option value='Strasbourg'>Strasbourg</option>
          <option value='Saint-Pierre-et-Miquelon'>Saint-Pierre-et-Miquelon</option>
          <option value='Toulouse'>Toulouse</option>
          <option value='Versailles'>Versailles</option>
        </select>

        <input
          type='text'
          name='telephone'
          id='telephone'
          placeholder={telephone}
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
        />

        <select name='ca' id='ca' onChange={this.handleInputChange}>
          <option selected value={ca}>{ca || 'Total recettes annuelles'}</option>
          <option value='Jusqu’à 500 000 €'>Jusqu’à 500 000 €</option>
          <option value='Jusqu’à un million €'>Jusqu’à un million €</option>
          <option value='Jusqu’à deux millions €'>Jusqu’à deux millions €</option>
          <option value='Plus de deux millions €'>Plus de deux millions €</option>
        </select>

        <input
          type='hidden'
          name='info'
        />

        <div
          className='my-button'
          name='modifier'
          onClick={() => { this.handleSubmission(this.state) }}
        >
          Modifier
        </div>
      </form>
    )
  }

  toggleFondePvSelect(showFondePv) {
    this.setState({ showFondePv, fondePvSelect: null })
  }

  renderChangeFondePvForm() {
    let { _handleWaypoint, school } = this.props
    let showFondePv = this.state ? this.state.showFondePv : null

    school = school[0]
    let fondePv = school && school['fondePv']
    return (
      <form>

        <input
          className='change-fondepv-radio'
          type='radio'
          name='fondePv'
          id='no'
          value='no'
          onChange={() => { this.toggleFondePvSelect(false) }}
          defaultChecked
        />
        <label className='change-fondepv-label' for='no'>Non</label>

        <input
          className='change-fondepv-radio'
          type='radio'
          name='fondePv'
          id='yes'
          value='yes'
          onChange={() => { this.toggleFondePvSelect(true) }}
        />
        <label className='change-fondepv-label' for='yes'>Oui</label>

        {
          showFondePv && <div>
            <label for='fondePvSelect'>Part des activités comptables :</label>
            <select
              name='fondePvSelect'
              id='fondePvSelect'
              onChange={this.handleInputChange}
            >
              <option selected value={fondePv}>{fondePv || 'Activités comptables'}</option>
              <option value='25%'>25%</option>
              <option value='50%'>50%</option>
              <option value='75%'>75%</option>
              <option value='100%'>100%</option>
            </select>
          </div>
        }

        <Waypoint
          onEnter={() => { _handleWaypoint(true) }}
          onLeave={() => { _handleWaypoint(false) }}
        />

        <input
          type='hidden'
          name='info'
        />

        <div
          className='my-button'
          name='modifier'
          onClick={() => { this.handleSubmission(this.state) }}
        >
          Modifier
        </div>
      </form>
    )
  }

  renderChangeMemoForm() {
    const { _handleWaypoint } = this.props
    let memo = this.props.school && this.props.school[0]['memo']
    return (
      <form>
        <textarea
          name='memo'
          id='memo'
          placeholder={memo}
          onChange={this.handleInputChange}
        />

        {this.validator.message('', this.state ? this.state.memo : '', 'memo')}

        <Waypoint
          onEnter={() => { _handleWaypoint(true) }}
          onLeave={() => { _handleWaypoint(false) }}
        />

        <div
          className='my-button'
          name='modifier'
          onClick={() => { this.handleSubmission(this.state) }}
        >
          Modifier
        </div>
      </form>
    )
  }

  render() {
    let { form } = this.props
    switch (form) {
      case 'addSchoolForm':
        return this.renderAddSchoolForm()
      case 'changeAgencyForm':
        return this.renderChangeAgencyForm()
      case 'adminForm':
        return this.renderAdminForm()
      case 'changeInfoForm':
        return this.renderChangeInfoForm()
      case 'changeMemoForm':
        return this.renderChangeMemoForm()
      case 'changeFondePvForm':
        return this.renderChangeFondePvForm()
      default:
        return null
    }
  }
}
