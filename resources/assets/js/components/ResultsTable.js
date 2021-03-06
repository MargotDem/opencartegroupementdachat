import React, { Component } from 'react'
import ResultsSection from './ResultsSection'
import Table from './Table'
import Row from "./Row"


export default class ResultsTable extends Component {
  render () {
    const {
      schools,
      fetchSchools,
      isAdminLogged,
      deleteSchool
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
                  if (item.status === "added" || item.status === "deletePending") return <Row
                  school={item}
                  fetchSchools={fetchSchools}
                  isAdminLogged={isAdminLogged}
                  deleteSchool={deleteSchool}
                />
              })
            }
          </Table>
        </ResultsSection>
      </div>
    )
  }
}
