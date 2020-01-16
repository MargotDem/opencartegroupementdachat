import React, { Component } from 'react'
import { withCookies } from 'react-cookie'
import axios from 'axios'

import PageComponent from '../../components/PageComponent'
import TopSection from '../../components/TopSection'
import FormSection from '../../components/FormSection'
import AdminForm from './AdminForm'
import AdminActions from './AdminActions'

class Admin extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleSubmission = this.handleSubmission.bind(this)
    this.logOut = this.logOut.bind(this)
  }

  handleSubmission (adminInput) {
    const { cookies, logUnlogAdmin } = this.props
    axios.post('/api/admin/login', adminInput)
    .then(response => {
      console.log(response)
      if (response.data.length > 0) {
        cookies.set('admin', 'true', { maxAge: 2700 })
        logUnlogAdmin(true)
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  logOut () {
    const { cookies, logUnlogAdmin } = this.props
    cookies.set('admin', 'false')
    logUnlogAdmin(false)
  }

  render () {
    const { isAdminLogged } = this.props
    return (
      <PageComponent>
        <TopSection
          title='Espace admin'
          text=''
          scrolledPast={null}
        />

        <FormSection
          form={'admin'}
          >
          {
            isAdminLogged
            ? <div>
              <a onClick={() => this.logOut()} className='admin-logout-btn'>Déconnexion</a>
              <AdminActions isAdminLogged={isAdminLogged} />
            </div>
            : <div className='admin-form'>
              <AdminForm handleSubmission={this.handleSubmission} />
            </div>
          }
        </FormSection>
      </PageComponent>
    )
  }
}

export default withCookies(Admin)
