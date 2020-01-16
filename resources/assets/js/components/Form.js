import React, { Component } from 'react'
import { Waypoint } from 'react-waypoint'
import SimpleReactValidator from 'simple-react-validator';
import { REGIONS, ACADEMIES, DEPARTEMENTS, NOMBRE_ADHERENTS } from '../config'

export default class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mots_cles_fournitures: [],
      mots_cles_services: []
    }
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
            return val.length < 71
          },
        },
        adresse: {
          rule: function (val) {
            return val.length < 71
          },
        },
        code_postal: {
          rule: function (val) {
            return val.toString().length < 7
          },
        },
        commune: {
          rule: function (val) {
            return val.length < 51
          },
        },
        telephone: {
          rule: function (val) {
            return validator.helpers.testRegex(val, /(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)/)
          }
        },
        infos_complementaires: {
          rule: function (val) {
            return val.length < 256
          }
        }
      }
    })
  }

  componentDidMount() {
    let { form, school } = this.props
    
    if (form === 'changeInfoForm') {
      let type_adherents
      let type_marche
      if (school.eple && school.autres_admins_publiques) {
        type_adherents = "3"
      } else if (school.eple) {
        type_adherents = "1"
      } else {
        type_adherents = "2"
      }
      if (school.fournitures && school.services) {
        type_marche = "3"
      } else if (school.fournitures) {
        type_marche = "1"
      } else {
        type_marche = "2"
      }

      let zone_de_couverture
      let zone_de_couverture_code_postal = ""
      let zone_de_couverture_departement = ""
      let zone_de_couverture_departements = []
      if (school.ville_couverte) {
        zone_de_couverture = "1"
        zone_de_couverture_code_postal = school.ville_couverte
      } else if (school.departements.length === 1) {
        zone_de_couverture = "2"
        zone_de_couverture_departement = school.departements[0].departement

      } else if (school.departements.length > 1) {
        zone_de_couverture = "3"
        zone_de_couverture_departements = school.departements.map(dpt => dpt.departement)
      }

      let motsClesFournitures = []
      let motsClesServices = []
      school.motsCles.forEach(mot => {
        if (mot.categorie === 1) {
          motsClesFournitures.push(mot.id.toString())
        } else {
          motsClesServices.push(mot.id.toString())
        }
      })

      this.setState({
        info: '',
        ...school,
        telephone: school.thisPhone,
        type_adherents,
        type_marche,
        zone_de_couverture,
        zone_de_couverture_code_postal,
        zone_de_couverture_departement,
        zone_de_couverture_departements,
        mots_cles_fournitures: motsClesFournitures,
        mots_cles_services: motsClesServices
      })
    
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
      if (field === "type_marche") {
        if (value === "1") {
          this.setState({
            mots_cles_services: []
          })
        } else if (value === "2") {
          this.setState({
            mots_cles_fournitures: []
          })
        }
      }
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
    console.log("handlesubmission user input", userInput)
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
          {NOMBRE_ADHERENTS.map((tier, index) => {
            return <option value={index + 1}>{tier}</option>
          })}
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


  renderChangeInfoForm() {
    let { _handleWaypoint, motsCles } = this.props
    let type_adherents
    let type_marche
    let zone_de_couverture
    if (this.state.type_adherents === "1") {
      type_adherents = "EPLE"
    } else if (this.state.type_adherents === "2") {
      type_adherents = "Autres administrations publiques"
    } else {
      type_adherents = "Les deux"
    }
    if (this.state.type_marche === "1") {
      type_marche = "Fournitures"
    } else if (this.state.type_marche === "2") {
      type_marche = "Services"
    } else {
      type_marche = "Les deux"
    }

    if (this.state.zone_de_couverture === "1") {
      zone_de_couverture = "Ville et communes proches"
    } else if (this.state.zone_de_couverture === "2") {
      zone_de_couverture = "Départementale"
    } else if (this.state.zone_de_couverture === "3") {
      zone_de_couverture = "Interdépartementale"
    }
    
    return (
      <form>


        <input
          type='text'
          name='nom'
          id='nom'
          placeholder='Nom *'
          value={this.state.nom}
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
        />
        {this.validator.message('nom', this.state ? this.state.nom : '', 'required|nom')}


        <input
          type='text'
          name='adresse'
          id='adresse'
          placeholder='Adresse *'
          value={this.state.adresse}
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
        />
        {this.validator.message("adresse", this.state ? this.state.adresse : '', 'required|adresse')}


        <input
          type='text'
          name='code_postal'
          id='code_postal'
          placeholder='Code postal *'
          value={this.state.code_postal}
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
        />
        {this.validator.message('code_postal', this.state ? this.state.code_postal : '', 'required|code_postal')}

        <input
          type='text'
          name='commune'
          id='commune'
          placeholder='Commune *'
          value={this.state.commune}
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
          <option value={this.state.departement}>{this.state.departement}</option>
          {this.renderDepartementSelect()}
        </select>
        {this.validator.message('departement', this.state ? this.state.departement : '', 'required')}


        <select name='region' id='region' onChange={this.handleInputChange}>
          <option value={this.state.region}>{this.state.region}</option>
          {REGIONS.map((region, index) => <option key={index} value={region}>{region}</option>)}
        </select>
        {this.validator.message('region', this.state ? this.state.region : '', 'required')}


        <select name='academie' id='academie' onChange={this.handleInputChange}>
          <option value={this.state.academie}>{this.state.academie}</option>
          {ACADEMIES.map((academie, index) => <option key={index} value={academie}>{academie}</option>)}
        </select>
        {this.validator.message('academie', this.state ? this.state.academie : '', 'required')}

        <input
          type='text'
          name='telephone'
          id='telephone'
          placeholder='Téléphone *'
          value={this.state.telephone}
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
        />
        {this.validator.message('telephone', this.state ? this.state.telephone : '', 'required|phone')}

        <input
          type="text"
          name="email"
          id="email"
          placeholder="Email *"
          value={this.state.email}
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
        />
        {this.validator.message('email', this.state ? this.state.email : '', 'required|email')}

        <select name='nombre_adherents' id='nombre_adherents' onChange={this.handleInputChange}>
          <option value={this.state.nombre_adherents}>{NOMBRE_ADHERENTS[this.state.nombre_adherents - 1]}</option>
          {NOMBRE_ADHERENTS.map((tier, index) => {
            return <option value={index + 1}>{tier}</option>
          })}
        </select>
        {this.validator.message('nombre_adherents', this.state ? this.state.nombre_adherents : '', 'required')}

        <select name="type_adherents" id="type_adherents" onChange={this.handleInputChange}>
          <option value={this.state.type_adherents}>{type_adherents}</option>
          <option value=''>Type d’adhérents *</option>
          <option value="1">EPLE</option>
          <option value="2">Autres administrations publiques</option>
          <option value="3">Les deux</option>
        </select>
        {this.validator.message('type_adherents', this.state ? this.state.type_adherents : '', 'required')}

        <select name="zone_de_couverture" id="zone_de_couverture" onChange={this.handleInputChange}>
        <option value={this.state.zone_de_couverture}>{zone_de_couverture}</option>
          <option value=''>Zone de couverture *</option>
          <option value="1">Ville et communes proches</option>
          <option value="2">Départementale</option>
          <option value="3">Interdépartementale</option>
        </select>
        {this.validator.message('zone_de_couverture', this.state ? this.state.zone_de_couverture : '', 'required')}

        {this.state && this.renderZoneDeCouverture()}


        <select name="type_marche" id="type_marche" onChange={this.handleInputChange}>
          <option value={this.state.type_marche}>{type_marche}</option>
          <option value=''>Type de marché *</option>
          <option value="1">Fournitures</option>
          <option value="2">Services</option>
          <option value="3">Les deux</option>
        </select>
        {this.validator.message('type_marche', this.state ? this.state.type_marche : '', 'required')}

        {
          (this.state && motsCles) && (this.state.type_marche === "1" || this.state.type_marche === "3") && <>
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
          (this.state && motsCles) && (this.state.type_marche === "2" || this.state.type_marche === "3") && <>
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
          value={this.state.infos_complementaires}
          onChange={this.handleInputChange}
        />
        {this.validator.message('infos_complementaires', this.state ? this.state.infos_complementaires : '', 'infos_complementaires')}



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

  renderChangeInfoFormOld() {
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




  render() {
    let { form } = this.props
    switch (form) {
      case 'addSchoolForm':
        return this.renderAddSchoolForm()
      case 'adminForm':
        return this.renderAdminForm()
      case 'changeInfoForm':
        return this.renderChangeInfoForm()
      default:
        return null
    }
  }
}
