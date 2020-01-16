import React, { Component } from 'react'
import ZoneDeCouverture from './ZoneDeCouverture'
// import { NavLink } from 'react-router-dom'
import InfoModal from './InfoModal'


import { NOMBRE_ADHERENTS, renderTypeAdherent, renderTypeMarche } from "../config"

export default class ResultsTable extends Component {
    constructor(props) {
        super(props)
        this.state = { zoneDeCouverture: [] }
        this.setZoneDeCouverture = this.setZoneDeCouverture.bind(this)
    }
    setZoneDeCouverture(zoneDeCouverture) {
        this.setState({ zoneDeCouverture })
    }
    render() {
        const {
            school,
            fetchSchools,
            isAdminLogged,
            isAdminView,
            approveAddSchool,
            rejectAddSchool,
            deleteSchool
        } = this.props

        return (
            <>
                <tr key={school.code_uai}>

                    <td>
                        {school.code_uai}
                    </td>

                    <td>
                        <span className='school-name'>
                            <InfoModal
                                modalText={school.nom}
                                school={school}
                                zoneDeCouverture={this.state.zoneDeCouverture}
                                ville_couverte={school.ville_couverte}
                                fetchSchools={fetchSchools}
                                isAdminLogged={isAdminLogged}
                                approveAddSchool={approveAddSchool}
                                rejectAddSchool={rejectAddSchool}
                                deleteSchool={deleteSchool}
                                isAdminView={isAdminView}
                            />
                        </span>
                    </td>

                    <td>{school.departement}</td>

                    <td>{school.region}</td>

                    <td>{school.academie}</td>


                    <td>
                        <ZoneDeCouverture
                            setZoneDeCouverture={this.setZoneDeCouverture}
                            ville_couverte={school.ville_couverte}
                            code_uai={school.code_uai}
                        />
                    </td>


                    <td>
                        {
                            NOMBRE_ADHERENTS[school.nombre_adherents - 1]
                        }
                    </td>

                    <td>
                        {renderTypeAdherent(school.eple, school.autres_admins_publiques)}
                    </td>


                    <td>{renderTypeMarche(school.fournitures, school.services)}</td>



                 

                </tr>
            </>
        )
    }
}
