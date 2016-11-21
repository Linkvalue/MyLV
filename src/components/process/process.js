import React from 'react'
import styles from './process.scss'

export default () => (
  <div className={styles.processCard}>
    <div className={styles['mdl-card__title']}>
      <h2 className={styles['mdl-card__title-text']}>Informations</h2>
    </div>
    <div className={styles['mdl-card__supporting-text']}>
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
  </div>
)
