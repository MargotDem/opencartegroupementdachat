import React, { Component } from 'react'

import { NavLink } from 'react-router-dom'
import ResultsSection from './ResultsSection'
import Table from './Table'
import InfoModal from './InfoModal'
// import DeleteSchool from './DeleteSchool'

import { NOMBRE_ADHERENTS, renderTypeAdherent, renderTypeMarche } from "../config"

export default class ResultsTable extends Component {
  render () {
    const {
      schools,
      fetchSchools,
      isAdminLogged
    } = this.props

    let COLUMNNAMES = ['Code UAI', 'Nom', 'Département', 'Région', 'Académie', 'Zone de couverture', 'Nombre d’adhérents', 'Type d’adhérents', 'Type de marché', '']

    if (isAdminLogged) {
      COLUMNNAMES.push('')
    }
    console.log("schoooolss", schools)
    return (
      <div>
        <ResultsSection>
          <Table columnNames={COLUMNNAMES}>
            {
              schools.map(item => {
                return (
                  <tr key={item.code_uai}>

                    <td>
                        {item.code_uai}
                      </td>
                    
                    <td>
                      <span className='school-name'>
                        <InfoModal
                          modalText={item.nom}
                          school={item}
                          fetchSchools={fetchSchools}
                        />
                      </span>
                    </td>

                    <td>{item.departement}</td>

                    <td>{item.region}</td>
                 
                    <td>{item.academie}</td>
                    

                        <td>hey</td>
                        
                <td>
                    {
                        NOMBRE_ADHERENTS[item.nombre_adherents - 1]
                    }
                </td>
                        
                        <td>
                            {renderTypeAdherent(item.eple, item.autres_admins_publiques)}
                        </td>
                        
                        
                        <td>{renderTypeMarche(item.fournitures, item.services)}</td>

                    

                    {
                    //   isAdminLogged && <td>
                    //     <DeleteSchool
                    //       codeUai={item.code_uai}
                    //       fetchSchools={fetchSchools}
                    //     />
                    //   </td>
                    }

                  </tr>
                )
              })
            }
          </Table>
        </ResultsSection>
      </div>
    )
  }
}
