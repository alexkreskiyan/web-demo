
import blue from '@material-ui/core/colors/blue'
import pink from '@material-ui/core/colors/pink'
import red from '@material-ui/core/colors/red'
import { createMuiTheme, makeStyles } from '@material-ui/core/styles'

export const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
    error: red,
  },
  typography: {
    fontSize: 12,
  },
})

export const useStyles = makeStyles(th => ({
  '@global': {
    html: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    body: {
      margin: 0,
      padding: 0,
      'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue"',
    },
  },
  '@global #root': {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
}))
