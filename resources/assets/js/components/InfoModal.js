import React, { Component } from 'react'
import Modal from 'react-modal'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { NOMBRE_ADHERENTS, renderTypeMarche, renderTypeAdherent } from "../config"

const customStyles = {
    content: {
        top: '30%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
}

export default class App extends Component {
    constructor() {
        super()
        this.state = {
            modalIsOpen: false
        }
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
    }

    openModal() {
        this.setState({ modalIsOpen: true })
    }

    closeModal() {
        this.setState({ modalIsOpen: false })
    }

    handleUpdate() {
        const codeUai = this.props.school.code_uai
        const { fetchSchools } = this.props
        const requestUrl = (window.env === 'production' ? '' : '/api/etablissements/') + codeUai
        axios.put(requestUrl, { update: '' })
            .then(response => {
                console.log("response: ", response)
                fetchSchools()
            })
            .catch(error => {
                console.log("Error: ", error)
            })
    }

    render() {
        let { modalText, school } = this.props
        let d = new Date(school.up_to_date)
        let month = (d.getUTCMonth() + 1) < 10 ? "0" + (d.getUTCMonth() + 1) : (d.getUTCMonth() + 1)
        let date = d.getUTCDate() + "-" + month + "-" + d.getUTCFullYear()

        return (
            <div>
                <span onClick={this.openModal}>{modalText}</span>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel='School Modal'
                    overlayClassName='school-modal-overlay'
                    className='school-modal-content'
                >
                    <div className='school-modal-top'>
                        <div className='school-modal-header'>
                            <div className='school-modal-title'>{school.nom + " " + school.code_uai}</div>
                            <div className='school-modal-close' onClick={this.closeModal}>&times;</div>
                        </div>
                        <div className='school-modal-top-content'>
                            <p>
                                Ces informations étaient à jour le :&nbsp;
                <span className={date === '31-12-2019' ? 'update-date-grey' : ''}>
                                    {date}
                                </span>
                            </p>
                            <p className='udpate-section' onClick={this.handleUpdate}>
                                <i className='fa fa-thumbs-up update-icon' />
                                <span className='update-message'>
                                    Je confirme que ces informations sont aujourd’hui à jour
                </span>
                            </p>
                        </div>
                    </div>


                    <div className='school-modal-bottom'>
                        <div className="school-modal-bottom-sections">
                            <div className="school-modal-bottom-section">
                                <h4>Zone de couverture</h4>
                                <p>hey</p>

                                <h4>Nombre d’adhérents</h4>
                                <p>{NOMBRE_ADHERENTS[school.nombre_adherents - 1]}</p>

                                <h4>Type d’adhérents</h4>
                                <p>{renderTypeAdherent(school.eple, school.autres_admins_publiques)}</p>

                                <h4>Informations complémentaires</h4>
                                <p>{school.infos_complementaires ? school.infos_complementaires : '-'}</p>
                            </div>

                            <div className="school-modal-bottom-section">
                                <h4>Type de marché</h4>
                                <p>{renderTypeMarche(school.fournitures, school.services)}</p>

                                <h4>Thématiques d’achat</h4>
                                <p>hey</p>
                            </div>

                            <div className="school-modal-bottom-section">
                                <h4>Téléphone</h4>
                                <p>{school.telephone}</p>

                                <h4>Email</h4>
                                <p>{school.email}</p>

                                <h4>Adresse</h4>
                                <p>{school.adresse}</p>

                                <h4>Code postal</h4>
                                <p>{school.code_postal}</p>

                                <h4>Commune</h4>
                                <p>{school.commune}</p>
                            </div>

                            <div className="school-modal-bottom-section">
                                <h4>Département</h4>
                                <p>{school.departement}</p>

                                <h4>Région</h4>
                                <p>{school.region}</p>

                                <h4>Académie</h4>
                                <p>{school.academie}</p>

                            </div>
                        </div>

                        <br />
                        <div className="school-modal-bottom-buttons">
                            <div className='school-modal-button'>
                                <NavLink
                                    className='my-button my-small-button'
                                    to={'/etablissements/' + school.code_uai + '/modifier-informations'}
                                >
                                    Modifier
                            </NavLink>
                            </div>
                            <div className='school-modal-button my-button my-small-button'>

                                Supprimer
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}
