import React, { Component } from 'react'
import axios from 'axios'

import AdminResultsTable from "./AdminResultsTable"

export default class AddPending extends Component {
    constructor(props) {
        super(props)
        this.state = {
            schools: []
        }
        this.approveAddSchool = this.approveAddSchool.bind(this)
        this.rejectAddSchool = this.rejectAddSchool.bind(this)
    }
    fetchSchools() {
        let requestUrl = (window.env === 'production' ? '' : '/api/admin/addPending')
        axios.get(requestUrl)
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

    approveAddSchool(code_uai) {
        let requestUrl = (window.env === 'production' ? '' : `/api/admin/approveAdd/${code_uai}`)
        axios.post(requestUrl)
        .then(response => {
            console.log("reponse :", response)
            this.fetchSchools()
        })
        .catch(error => {
            console.log(error)
        })
    }

    rejectAddSchool(code_uai) {
        let requestUrl = (window.env === 'production' ? '' : `/api/admin/deleteSchool/${code_uai}`)
        axios.post(requestUrl)
        .then(response => {
            console.log("reponse :", response)
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
            approveAddSchool={this.approveAddSchool}
            rejectAddSchool={this.rejectAddSchool}
        />
    }
}
