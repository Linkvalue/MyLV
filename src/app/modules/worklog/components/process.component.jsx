import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Card, CardActions, CardContent, Grid, Typography } from 'material-ui'

import { toggleProcessReminder } from '../../settings/settings.actions'

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleProcessReminder: () => toggleProcessReminder(),
}, dispatch)

const Process = ({ toggleProcessReminder }) => (
  <Grid item xs={12}>
    <Card>
      <CardContent>
        <Typography variant="headline" component="h2" gutterBottom>
          Informations
        </Typography>
        <Typography gutterBottom>
          Le CRA (Compte Rendu d'Activité) est un document administratif à envoyer à
          <a href="mailto:admin@link-value.fr">admin@link-value.fr</a>,
          copie Partner Business, avant le <b>25 de chaque mois</b>. Il sert à :
        </Typography>
        <Typography component="ul" gutterBottom>
          <li>Extraire les bulletins de paie.</li>
          <li>Procéder à la facturation client.</li>
        </Typography>
        <Typography gutterBottom>
          Pour procéder à l'édition de votre CRA :
        </Typography>
        <Typography component="ul" gutterBottom>
          <li>Sélectioner un jour dans le calendrier.</li>
          <li>Choisir un label.</li>
          <li>Cliquer sur le bouton correspondant à la période à laquelle vous souhaitez appliquer le label.</li>
        </Typography>
        <Typography>
          Si vous êtes sur mobile, imprimez en PDF pour télécharger votre CRA.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" component="a" onClick={toggleProcessReminder}>Ne plus afficher</Button>
      </CardActions>
    </Card>
  </Grid>
)

Process.propTypes = {
  toggleProcessReminder: PropTypes.func.isRequired,
}

export default connect(undefined, mapDispatchToProps)(Process)
