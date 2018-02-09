import React from 'react'
import { Button, Card, CardActions, CardContent, Typography } from 'material-ui'

const HolidayRequestPage = () => (
  <form>
    <Card>
      <CardContent>
        <Typography type="headline" component="h2">
          Nouvelle demande de congé
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">Envoyer</Button>
      </CardActions>
    </Card>
  </form>
)

export default HolidayRequestPage
