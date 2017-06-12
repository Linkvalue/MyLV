import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { stopProcessReminder } from '../../../settings/settings-actions'

const mapDispatchToProps = dispatch => bindActionCreators({
  stopProcessReminder
}, dispatch)

const Process = ({ stopProcessReminder }) => (
  <div className={classNames('mdl-cell', 'mdl-cell--12-col', 'mdl-card', 'mdl-shadow--2dp')}>
    <div className='mdl-card__title'>
      <h2 className='mdl-card__title-text'>Informations</h2>
    </div>
    <div className='mdl-card__supporting-text'>
      Le CRA (Compte Rendu d'Activité) est un document administratif à envoyer à <a href='mailto:admin@link-value.fr'>admin@link-value.fr</a>,
      copie Partner Business, avant le <b>25 de chaque mois</b>. Il sert à :
      <ul>
        <li>Extraire les bulletins de paie.</li>
        <li>Procéder à la facturation client.</li>
      </ul>
      Pour procéder à l'édition de votre CRA :
      <ul>
        <li>Sélectioner un jour dans le calendrier.</li>
        <li>Choisir un label.</li>
        <li>Cliquer sur le bouton correspondant à la période à laquelle vous souhaitez appliquer le label.</li>
      </ul>
      Si vous êtes sur mobile, imprimez en PDF pour télécharger votre CRA.
    </div>
    <div className={classNames('mdl-card__actions', 'mdl-card--border')}>
      <a
        className={classNames('mdl-button', 'mdl-button--colored', 'mdl-js-button', 'mdl-js-ripple-effect')}
        onClick={stopProcessReminder}
      >
        Ne plus afficher
      </a>
    </div>
  </div>
)

export default connect(undefined, mapDispatchToProps)(Process)
