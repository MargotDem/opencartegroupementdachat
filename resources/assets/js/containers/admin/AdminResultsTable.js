import React, { Component } from 'react'
import ResultsSection from '../../components/ResultsSection'
import Table from '../../components/Table'
import Row from "../../components/Row"


export default class AdminResultsTable extends Component {
  render () {
    const {
      schools,
      isAdminLogged,
      adminView,
      approveAddSchool,
      rejectAddSchool,
      deleteSchool,
      rejectDeleteSchool
    } = this.props

    let COLUMNNAMES = ['Code UAI', 'Nom', 'Département', 'Région', 'Académie', 'Zone de couverture', 'Nombre d’adhérents', 'Type d’adhérents', 'Type de marché', '']

    if (isAdminLogged) {
      COLUMNNAMES.push('')
    }
    return (
      <div>
        <ResultsSection>
          <Table columnNames={COLUMNNAMES}>
            {
              schools.map(item => {
                return <Row
                school={item}
                isAdminLogged={isAdminLogged}
                approveAddSchool={approveAddSchool}
                rejectAddSchool={rejectAddSchool}
                deleteSchool={deleteSchool}
                rejectDeleteSchool={rejectDeleteSchool}
                adminView={adminView}
            />
              })
            }
          </Table>
        </ResultsSection>
      </div>
    )
  }
}
