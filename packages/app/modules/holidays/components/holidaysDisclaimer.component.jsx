import React from 'react'
import PropTypes from 'prop-types'
import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core'

const HolidaysDisclaimer = ({ className, onClose }) => (
  <Card className={className}>
    <CardContent>
      <Typography variant="h6" gutterBottom>Congés</Typography>
      <Typography variant="subtitle1" color="primary" gutterBottom>Cas général</Typography>
      <Typography gutterBottom>
        La demande de congés permet de répondre à une obligation légale consistant à
        informer l’entreprise en cas de prise de congés (congés payés, congés pour
        évènements familiaux, congés sans solde).
      </Typography>
      <Typography gutterBottom>
        Pour ce faire, la demande doit être formulée au plus tôt (idéalement au moins deux
        mois avant la date de départ envisagé) et au plus tard 8 jours avant la date de départ
        en congé.
      </Typography>
      <Typography gutterBottom>
        Préalablement à la demande, il est recommandé d’en informé son équipe de travail
        et/ou son Client pour permettre d’organiser la continuité de l’activité pendant cette
        période.
      </Typography>
      <Typography gutterBottom>
        La demande sera validée si les délais indiqués ont été respectés et si la personne
        concernée a bien acquis les jours de congés sollicités.
      </Typography>
      <Typography variant="subtitle1" color="primary" gutterBottom>Cas exceptionnel</Typography>
      <Typography gutterBottom>
        En cas d’événement impromptu nécessitant la pose d’un à deux jours de congés, la
        demande doit être remplie le jour même afin que l’entreprise soit prévenue de cette
        absence.
      </Typography>
      <Typography gutterBottom>
        Dans ce cas, la demande sera validée si la personne concernée a bien acquis les
        jours de congés sollicités.
      </Typography>
      <Typography variant="h6" gutterBottom>Absences Maladie</Typography>
      <Typography gutterBottom>
        En cas d’absence maladie, il est recommandé d’avertir l’entreprise de son absence
        au plus vite en envoyant un mail à l’adresse <a href="mailto:admin@link-value.fr">admin@link-value.fr</a> et,
        idéalement, son équipe de travail.
      </Typography>
      <Typography gutterBottom>
        Dans tous les cas, un arrêt maladie devra être transmis sous 48h par mail
        à <a href="mailto:admin@link-value.fr">admin@link-value.fr</a> ou par courrier postal afin de nous conformer
        aux obligations légales.
      </Typography>
    </CardContent>
    <CardActions>
      <Button color="primary" onClick={onClose}>Ne plus afficher</Button>
    </CardActions>
  </Card>
)

HolidaysDisclaimer.defaultProps = {
  className: '',
}

HolidaysDisclaimer.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func.isRequired,
}

export default HolidaysDisclaimer
