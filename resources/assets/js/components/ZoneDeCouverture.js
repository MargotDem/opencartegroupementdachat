import React, { Component } from 'react'
import axios from 'axios'

export default class ZoneDeCouverture extends Component {
    constructor(props) {
        super(props)
        this.state = { departements: [] }
    }
    componentDidMount() {
        let { ville_couverte, code_uai } = this.props;
        if (ville_couverte) {
            return
        }

        const requestUrl = (window.env === 'production' ? '' : '/api/departements/' + code_uai)
        axios.get(requestUrl)
            .then(response => {
                let departements = response.data[0].map(departement => departement.departement)
                this.setState({
                    departements
                })
                this.props.setZoneDeCouverture(departements)
            })
            .catch(function (error) {
                console.log("Error: ", error)
            })
    }
    render() {
        let { ville_couverte } = this.props;
        let { departements } = this.state;
        if (ville_couverte) {
            return <span>{ville_couverte}</span>
        }
        return <span>{departements.join(", ")}</span>
    }
}