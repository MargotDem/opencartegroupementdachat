import React, { Component } from 'react'
import { withCookies } from 'react-cookie'
import axios from 'axios'
// import sha256 from 'crypto-js/sha256';
import Crypto from 'crypto-js'

import PageComponent from '../../components/PageComponent'
import TopSection from '../../components/TopSection'
import FormSection from '../../components/FormSection'
import AdminForm from './AdminForm'
import AdminActions from './AdminActions'

class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleSubmission = this.handleSubmission.bind(this)
    this.logOut = this.logOut.bind(this)
  }

  handleSubmission(adminInput) {
    const { cookies, logUnlogAdmin } = this.props
    let hash = Crypto.SHA384(adminInput.password).toString()
    let input = {
      email: adminInput.email,
      password: hash
    }
    axios.post('/api/admin/login', input)
      .then(response => {
        console.log("response:", response)
        if (response.data.length > 0) {
          cookies.set('admin', 'true', { maxAge: 2700 })
          logUnlogAdmin(true)
        }
      })
      .catch(error => {
        console.log("Error: ", error)
      })
  }

  logOut() {
    const { cookies, logUnlogAdmin } = this.props
    cookies.set('admin', 'false')
    logUnlogAdmin(false)
  }

  render() {
    const { isAdminLogged } = this.props
    // console.log("hash: ", Crypto.SHA384("leMdp").toString())
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
