import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardActions, CardContent, Typography } from 'material-ui'

const HolidaysPage = () => (
  <Card>
    <CardContent>
      <Typography type='headline' component='h2' gutterBottom>
        Mes demandes de congés
      </Typography>
      <Typography>
        Aucune demande de congés pour le moment.
      </Typography>
    </CardContent>
    <CardActions>
      <Button size='small' color='primary' component={Link} to='/holidays/new'>
        Nouvelle demande
      </Button>
    </CardActions>
  </Card>
)

export default HolidaysPage
