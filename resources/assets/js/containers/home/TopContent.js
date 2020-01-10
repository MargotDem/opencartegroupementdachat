import React, { Component } from 'react'

export default class TopContent extends Component {
  componentDidMount() {
    this.timer = setInterval(function () {
      let sextant = document.getElementById('sextant')
      // if (window.pageYOffset > 1500) {
      //   console.log("stop")
      //   sextant.style.display = "none";
      // } else
      let degrees = ((window.pageYOffset) / 10) + 30
      sextant.style.transform = 'rotate(' + degrees + 'deg)'
    }, 10)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    let { scrolledPast } = this.props
    return (
      <div className='top-content-box'>
        <div className='container'>
          <div className='row'>
            <div className='top-content-title'><span className='highlight'>Bienvenue sur Open Carte Groupement d’Achats</span></div>
            <div className={'col-sm-6 top-content-text-box' + (scrolledPast ? ' top-content-text-box-expand' : '')}>
              <div className='top-content-text'>

                Vous êtes gestionnaire d’EPLE ou coordonnateur d’un groupement d’achats :
                  <br />
                &bull; trouvez les groupements d’achats sur votre territoire
                  <br />
                  &bull; consultez la fiche de votre groupement d’achats
                  <br />
                &bull; mettez à jour les informations
                  <br />
                &bull; et construisez la carte de France des groupements d’achats

              </div>
            </div>
          </div>
        </div>
        <div className='sextant-box'>
          <img id='sextant' className='sextant' alt='sextant' src='https://image.ibb.co/e450iy/sextant.png' />
        </div>
      </div>
    )
  }
}