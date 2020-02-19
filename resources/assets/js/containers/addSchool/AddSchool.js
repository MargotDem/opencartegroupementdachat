import React, { Component } from 'react'
import axios from 'axios'

import PageComponent from '../../components/PageComponent'
import TopSection from '../../components/TopSection'
import FormSection from '../../components/FormSection'
import AddSchoolForm from './AddSchoolForm'
import { sendEmail } from "../../../../../lib/lib"

export default class AddSchool extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      scrolledPast: false,
      isFormSent: false,
      failure: false
    })
    this._handleWaypoint = this._handleWaypoint.bind(this)
    this.handleSubmission = this.handleSubmission.bind(this)
  }

  _handleWaypoint (scrolledPast) {
    this.setState({ scrolledPast: scrolledPast })
  }

  handleSubmission (school) {
    let { isAdminLogged, adminEmails } = this.props
    axios.post('/api/etablissements',
      {
        ...school,
        isAdminLogged
      })
      .then(response => {
        if (response.status === 200) {
          this.setState({
            isFormSent: true
          })
          console.log(response)
          sendEmail(adminEmails, "demande d’ajout")
        } else {
          console.log("no 200 response: ", response)
          this.setState({
            isFormSent: true,
            failure: true
          })
          console.log(response)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  render () {
    let { isFormSent, failure } = this.state
    let { motsCles } = this.props
    return (
      <PageComponent>
        <TopSection
          title='Ajouter un établissement'
          text='Renseignez les champs ci-dessous :'
          scrolledPast={this.state.scrolledPast}
        />

        <FormSection
          form={'add-school' + (isFormSent ? ' form-section-box_add-school_reduced' : '')}
          >

          <div className={'add-school-form' + (isFormSent ? ' add-school-form-hide' : '')}>
            <AddSchoolForm
              _handleWaypoint={this._handleWaypoint}
              handleSubmission={this.handleSubmission}
              motsCles={motsCles}
            />
            <p className='required-fields'>* Informations requises</p>
          </div>

          <div className={'add-school-form-sent' + (isFormSent ? ' add-school-form-sent-show' : '')}>
            {
              failure ? 'Il y a eu un bug' : 'Demande d’ajout envoyée. Merci pour votre contribution !'
            }
          </div>

        </FormSection>
      </PageComponent>
    )
  }
}
