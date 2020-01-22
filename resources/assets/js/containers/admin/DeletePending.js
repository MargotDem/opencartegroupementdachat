import React, { Component } from 'react'
import axios from 'axios'

import AdminResultsTable from "./AdminResultsTable"

export default class DeletePending extends Component {
  constructor(props) {
    super(props)
    this.state = { schools: [] }
    this.rejectDeleteSchool = this.rejectDeleteSchool.bind(this)
    this.deleteSchool = this.deleteSchool.bind(this)
  }
  fetchSchools() {
    axios.get('/api/admin/deletePending')
      .then(response => {
        let schools = response.data[0]
        this.setState({
          schools
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
  componentDidMount() {
    this.fetchSchools()
  }

  rejectDeleteSchool(code_uai) {
    if (!window.confirm("Êtes-vous sûr·e ?")) {
      return null
    }
    axios.post(`/api/admin/rejectDelete/${code_uai}`)
      .then(response => {
        console.log("reponse :", response)
        this.fetchSchools()
      })
      .catch(error => {
        console.log(error)
      })
  }

  deleteSchool(code_uai) {
    if (!window.confirm("Êtes-vous sûr·e de vouloir supprimer cet établissement ?")) {
      return null
    }
    axios.post(`/api/admin/deleteSchool/${code_uai}`)
      .then(response => {
        this.fetchSchools()
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return <AdminResultsTable
      schools={this.state.schools}
      isAdminLogged={this.props.isAdminLogged}
      deleteSchool={this.deleteSchool}
      rejectDeleteSchool={this.rejectDeleteSchool}
      adminView={"deletePending"}
    />
  }
}
