import React, { Component } from 'react'
import { REGIONS, ACADEMIES, DEPARTEMENTS } from '../../config'

export default class SearchForm extends Component {
    constructor(props) {
        super(props)
        this.state = { type_marche: "both" }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
    }

    handleInputChange(e) {
        let value = e.target.value
        let field = e.target.name
        if (field === "mots_cles_fournitures" || field === "mots_cles_services") {
            let list = this.state[field] || []
            if (list.indexOf(value) === -1) {
                list.push(value)
                this.setState({ [field]: list })
            }
        } else {
            this.setState({
                [field]: value
            })
        }
    }

    handleSubmission(criteria) {
        let url =  '#/etablissements?'
        Object.keys(criteria).map(item => {
            if (item === "mots_cles_services" || item === "mots_cles_fournitures") {
                for (let i = 0; i < criteria[item].length; i++) {
                    url = url + criteria[item][i] + '&'
                }
            } else {
                if (!(item === "type_marche" && criteria[item] === "both")) {

                    url = url + item + '=' + criteria[item] + '&'
                }
            }
        })
        url = url.substring(0, url.lastIndexOf('&'))
        window.location = url
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.handleSubmission(this.state)
        }
    }

    removeFromMultipleSelect(field, valueToRemove) {
        let list = this.state[field]
        list = list.filter(value => value !== valueToRemove)
        this.setState({ [field]: list })
    }

    render() {
        let { motsCles } = this.props
        return (
            <div className="">
                {/* <form method="post"> */}


<p>Recherche géographique :</p>
                <select name='region' id='region' onChange={this.handleInputChange}>
                    <option value=''>Région</option>
                    {REGIONS.map((region, index) => <option key={index} value={region}>
                        {region}
                    </option>)}
                </select>

                <select name='academie' id='academie' onChange={this.handleInputChange}>
                    <option value=''>Académie</option>
                    {ACADEMIES.map((academie, index) => <option key={index} value={academie}>{academie}</option>)}
                </select>

                <select
                    name="departement"
                    id="departement"
                    onChange={this.handleInputChange}
                >
                    <option value="">Département</option>
                    {DEPARTEMENTS.map((departement, index) => <option key={index} value={departement}>{departement}</option>)}}
                    </select>

                <p>Recherche par type de marché :</p>

                <div className="radio-input">
                    <input
                        type="radio"
                        id="fournitures"
                        name="type_marche"
                        value="fournitures"
                        onChange={this.handleInputChange}
                    />
                    <label for="fournitures">Fournitures</label>
                </div>

                <div className="radio-input">
                    <input
                        type="radio"
                        id="services"
                        name="type_marche"
                        value="services"
                        onChange={this.handleInputChange}
                    />
                    <label for="services">Services</label>
                </div>

                <div className="radio-input">
                    <input
                        type="radio"
                        id="both"
                        name="type_marche"
                        value="both"
                        onChange={this.handleInputChange}
                    />
                    <label for="both">Les deux</label>
                </div>


                Recherche par mots clés :

                <div>
                    <ul>
                        {this.state && this.state.mots_cles_fournitures && this.state.mots_cles_fournitures.map((mot, index) => {
                            return <li>
                                <span key={index}>{
                                    mot
                                }</span>
                                &nbsp;
                <span onClick={() => this.removeFromMultipleSelect("mots_cles_fournitures", mot)}>x</span>
                            </li>
                        })}
                    </ul>

                </div>
                <select name='mots_cles_fournitures' id='mots_cles_fournitures' onChange={this.handleInputChange}>
                    <option value=''>Mots clés fournitures</option>
                    {motsCles && motsCles.motsClesFournitures.map((mot, index) => <option key={index} value={mot.mot_cle}>{mot.mot_cle}</option>)}
                </select>

                <div>
                    <ul>
                        {this.state && this.state.mots_cles_services && this.state.mots_cles_services.map((mot, index) => {
                            return <li>
                                <span key={index}>{
                                    mot
                                }</span>
                                &nbsp;
                <span onClick={() => this.removeFromMultipleSelect("mots_cles_services", mot)}>x</span>
                            </li>
                        })}
                    </ul>

                </div>
                <select name='mots_cles_services' id='mots_cles_services' onChange={this.handleInputChange}>
                    <option value=''>Mots clés services</option>
                    {motsCles && motsCles.motsClesServices.map((mot, index) => <option key={index} value={mot.mot_cle}>{mot.mot_cle}</option>)}
                </select>


                <p>Retrouver un établissement particulier :</p>
                <input
                    type='text'
                    id='code_uai'
                    name='code_uai'
                    placeholder='Code UAI'
                    onChange={this.handleInputChange}
                    onKeyPress={this.handleKeyPress}
                />

                <input
                    type='text'
                    id='nom'
                    name='nom'
                    placeholder='Nom'
                    onChange={this.handleInputChange}
                    onKeyPress={this.handleKeyPress}
                />


                <div
                    className='my-button'
                    onClick={() => { this.handleSubmission(this.state) }}
                >
                    Rechercher
                </div>

                {/* </form> */}
            </div>
        )
    }
}
