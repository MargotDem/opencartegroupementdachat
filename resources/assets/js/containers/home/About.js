import React, { Component } from 'react'

import AboutParagraph from './AboutParagraph'

export default class About extends Component {
  componentDidMount () {
    this.timer = setInterval(function () {
      let degrees = (window.pageYOffset / 4)
      document.getElementById('img1').style.transform = 'translate(0, ' + degrees + 'px)'
      document.getElementById('img2').style.transform = 'translate(0, ' + degrees + 'px)'
      document.getElementById('img3').style.transform = 'translate(0, ' + degrees + 'px)'
    }, 10)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render () {
    return (
      <div className='about-box'>
        <div className='img1'>
          <img id='img1' alt='map' src='https://image.ibb.co/h4OZbJ/map.jpg' />
        </div>

        <div className='img2'>
          <img id='img2' alt='map' src='https://image.ibb.co/et7hVd/map_with_man.jpg' />
        </div>

        <div className='img3'>
          <img id='img3' alt='map' src='https://image.ibb.co/kzux0d/map_with_compass.jpg' />
        </div>

        <div className='container about-container'>
          <div id='about-columns' className='row'>

            <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 about-column about-left-column'>
              <AboutParagraph
                title='Une information claire et rapidement accessible…'
                para1='Le site Open Carte Groupement d’achats offre la possibilité de connaître les groupements d’achat existants sur son territoire pour inscrire son établissement dans une logique de mutualisation de l’achat public.'
                para2='Cet outil est également utile pour connaître les mutualisations existantes. Open Carte Groupement d’achats permet aussi de fournir une photographie académique et nationale.'
              />
              <AboutParagraph
                title='Open Carte Groupement d’Achats a été réalisé grâce au soutien de :'
                para1='&bull; l’ <a href="https://association.aji-france.com/">AJI</a>'
                para2='Source des données concernant les établissements : <a href="https://association.aji-france.com/">aji-france.com</a>'
              />
            </div>

            <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 about-column about-right-column'>
              <AboutParagraph
                title='…mise à jour par la communauté '
                para1='Votre groupement d’achats a évolué  ? Une information n’est plus à jour ? Vous pouvez <span className="highlight">modifier simplement les données d’Open Carte Groupement d’Achats, tout comme vous pouvez <a href="#/ajouter-etablissement">ajouter un établissement</a>.'
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
