import React, { Component } from 'react'
import axios from 'axios'

export default class MotsCles extends Component {
    constructor(props) {
        super(props)
        this.state = { motsClesFournitures: [], motsClesServices: [] }
    }
    componentDidMount() {
        let { code_uai } = this.props;

        const requestUrl = (window.env === 'production' ? '' : '/api/motsCles/' + code_uai)
        axios.get(requestUrl)
            .then(response => {
                let motsClesFournitures = []
                let motsClesServices = []
                response.data[0].forEach(motCle => {
                    if (motCle.categorie === 1) {
                        motsClesFournitures.push(motCle.mot_cle)
                    } else {
                        motsClesServices.push(motCle.mot_cle)
                    }
                })
                this.setState({
                    motsClesFournitures,
                    motsClesServices
                })
            })
            .catch(function (error) {
                console.log("Error: ", error)
            })
    }
    render() {
        let { motsClesFournitures, motsClesServices } = this.state;

        return <>
            <h6>Fournitures :</h6>
            <ul>{motsClesFournitures.length > 0
            ? motsClesFournitures.map((motCle, i) => <li key={i}>{motCle}</li>)
            : "-"}</ul>
            <h6>Services :</h6>
            <ul>{motsClesServices.length > 0
            ? motsClesServices.map((motCle, i) => <li key={i}>{motCle}</li>)
            : "-"}</ul>
        </>
    }
}