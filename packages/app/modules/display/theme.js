import { createMuiTheme } from '@material-ui/core'
import { blue, lightBlue } from '@material-ui/core/colors'

export default createMuiTheme({
  palette: { primary: blue, secondary: lightBlue },
  typography: {
    useNextVariants: true,
  },
})
