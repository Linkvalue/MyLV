import React from 'react'
import { Link } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Card, CardActions, CardContent, Typography, withStyles } from '@material-ui/core'
import { labels } from '@cracra/shared/calendar.constants'

import SelectField from '../../../components/inputs/selectField.component'
import * as worklogActions from '../worklog-actions'

const validate = ({ label }) => ({
  label: !label ? 'Obligatoire' : null,
})

const mapStateToProps = state => ({
  ...state.calendar,
  labels: state.worklog.labels,
})

const mapDispatchToProps = dispatch => bindActionCreators(worklogActions, dispatch)

const styles = theme => ({
  selectInput: {
    width: '100%',
  },
  cardsHolder: {
    display: 'flex',
    flexDirection: 'column',
  },
  firstCard: {
    marginBottom: theme.spacing.unit * 2,

    [theme.breakpoints.down('md')]: {
      order: 1,
      marginBottom: 0,
    },
  },
  secondCard: {
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing.unit * 2,
    },
  },
  cardActions: {
    flexWrap: 'wrap',
    minHeight: 52,
    height: 'auto',
  },
})

const EntriesForm = ({
  fillMorning,
  fillAfternoon,
  fillDay,
  fillWeek,
  fillMonth,
  year,
  month,
  day,
  handleSubmit,
  classes,
  hideClientChange,
}) => (
  <React.Fragment>
    <Card className={classes.firstCard}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Imputation
        </Typography>
        <Field
          className={classes.selectInput}
          options={labels}
          name="label"
          type="text"
          label="Choisissez un label"
          component={SelectField}
        />
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" onClick={handleSubmit(({ label }) => fillMorning(`${year}-${month}-${day}`, label))}>
          AM
        </Button>
        <Button size="small" onClick={handleSubmit(({ label }) => fillAfternoon(`${year}-${month}-${day}`, label))}>
          PM
        </Button>
        <Button size="small" onClick={handleSubmit(({ label }) => fillDay(`${year}-${month}-${day}`, label))}>
          Jour
        </Button>
        <Button size="small" onClick={handleSubmit(({ label }) => fillWeek(`${year}-${month}-${day}`, label))}>
          Semaine
        </Button>
        <Button size="small" onClick={handleSubmit(({ label }) => fillMonth(`${year}-${month}`, label))}>
          Mois
        </Button>
      </CardActions>
    </Card>
    {!hideClientChange && (
      <Card className={classes.secondCard}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Changement de client ?
          </Typography>
          <Typography>
            Les informations client sur votre CRA ne correspondent plus ?
            Pas de panique vous pouvez encore les éditer depuis l'écran "Partner / Client" dans le menu de gauche,
            ou avec le lien ci-dessous.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" component={Link} to="/client">Editer</Button>
        </CardActions>
      </Card>
    )}
  </React.Fragment>
)

const HookedEntriesForm = reduxForm({
  form: 'entriesForm',
  validate,
  initialValues: {
    label: 'production',
  },
})(EntriesForm)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HookedEntriesForm))
