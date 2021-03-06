import React, { Component } from "react"
import axios from "axios"

import PageComponent from "../../components/PageComponent"
import TopSection from "../../components/TopSection"
import ResultsTable from "../../components/ResultsTable"
import { sendEmail } from "../../../../../lib/lib"

export default class Schools extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      schools: []
    })
    this.fetchSchools = this.fetchSchools.bind(this)
    this.deleteSchool = this.deleteSchool.bind(this)
  }

  componentDidMount() {
    this.fetchSchools()
  }

  deleteSchool(code_uai) {
    let { isAdminLogged, adminEmails } = this.props
    let message = isAdminLogged ? "Êtes-vous sûr·e de vouloir supprimer cet établissement ?" : "Êtes-vous sûr·e de vouloir demander la suppression de cet établissement ?"
    if (!window.confirm(message)) {
      return null
    }
    if (isAdminLogged) {
      axios.post(`/api/admin/deleteSchool/${code_uai}`)
        .then(response => {
          this.fetchSchools()
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      axios.post(`/api/admin/askDeleteSchool/${code_uai}`)
        .then(response => {
          sendEmail(adminEmails, "demande de suppression")
          this.fetchSchools()
        })
        .catch(error => {
          console.log(error)
        })
    }
  }


  fetchSchools() {
    let pathname = this.props.location.pathname
    if (pathname === '/etablissements') {
      // fetch schools corresponding to search criteria
      let url = this.props.location
      axios.get(`/api/etablissements${url.search}`)
        .then(response => {
          this.setState({ schools: response.data[0] })
        })
        .catch(function (error) {
          console.log("Error: ", error)
        })
    }
    // else {
    //   // fetch corresponding school
    //   let url = this.props.location
    //   const requestUrl = (window.env === 'production' ? 'https://opencartecomptable.herokuapp.com/api' : '/public/api') + url.pathname
    //   axios.get(requestUrl)
    //     .then(school => {
    //       this.setState({ schools: school.data })
    //     })
    //     .catch(function (error) {
    //       console.log(error)
    //     })
    // }
  }

  render() {
    const { schools } = this.state
    const { isAdminLogged } = this.props
    let title = ''
    let text = ''
    title = 'Établissements correspondant à vos critères de recherche (' + schools.length + ') :'
    text = 'Vous pouvez visualiser les informations d’un établissement en cliquant sur son nom'

    schools.length === 0 && (text = 'Il n’y a pas d’établissements correspondant à votre recherche')

    return (
      <PageComponent>
        <TopSection
          title={title}
          text={text}
          smallText
        />
        <ResultsTable
          schools={schools}
          fetchSchools={this.fetchSchools}
          isAdminLogged={isAdminLogged}
          deleteSchool={this.deleteSchool}
        />
      </PageComponent>
    )
  }
}
