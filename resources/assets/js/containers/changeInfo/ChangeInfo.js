import React, { Component } from 'react'
import axios from 'axios'

import PageComponent from '../../components/PageComponent'
import TopSection from '../../components/TopSection'
import FormSection from '../../components/FormSection'
import ChangeInfoForm from './ChangeInfoForm'

export default class ChangeInfo extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      scrolledPast: false,
      isFormSent: false,
      school: ''
    })
    this._handleWaypoint = this._handleWaypoint.bind(this)
    this.handleSubmission = this.handleSubmission.bind(this)
  }

  componentDidMount() {

    let url = this.props.location.pathname.substring(0, 24)
    axios.get(`/api${url}`)
      .then(response => {
        let school = response.data.etablissement[0][0]
        let departements = response.data.departements[0]
        let motsCles = response.data.motsCles[0]
        this.setState({
          school: {
            ...school,
            departements,
            motsCles
          }
        })
      })
      .catch(function (error) {
        console.log("Error: ", error)
      })

  }

  _handleWaypoint(scrolledPast) {
    this.setState({ scrolledPast: scrolledPast })
  }

  handleSubmission(school) {
    let codeUai = this.state.school.code_uai
    axios.put(`/api/etablissements/${codeUai}`, school)
      .then(response => {
        if (response.status === 200) {
          this.setState({
            isFormSent: true
          })
        } else {
          this.setState({
            isFormSent: true,
            failure: true
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    let { isFormSent, school } = this.state
    let { motsCles } = this.props
    if (school) {
      let nom = school.nom
      let codeUai = school.code_uai
      return (
        <PageComponent>
          <TopSection
            title={nom + ' - ' + codeUai}
            text='Modifiez les informations nécessaires :'
            scrolledPast={this.state.scrolledPast}
          />

          <FormSection
            form={'change-info' + (isFormSent ? ' form-section-box_change-info_reduced' : '')}
          >

            <div className={'change-info-form' + (isFormSent ? ' change-info-form-hide' : '')}>
              <ChangeInfoForm
                school={school}
                _handleWaypoint={this._handleWaypoint}
                handleSubmission={this.handleSubmission}
                motsCles={motsCles}
              />
            </div>

            <div className={'change-info-form-sent' + (isFormSent ? ' change-info-form-sent-show' : '')}>
              Modification effectuée! Merci pour votre contribution
              </div>

          </FormSection>
        </PageComponent>
      )
    }
    return "..."

  }
}
