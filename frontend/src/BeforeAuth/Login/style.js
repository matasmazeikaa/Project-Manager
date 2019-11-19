import { makeStyles } from '@material-ui/core/styles';
import backgroundImage from '../../images/backgroundLogin.jpg'


const useStyles = makeStyles(theme => ({
    
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    routerLink: {
      textDecoration: 'none',
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.43,
      letterSpacing: '0.01071em',
      '&$hover': {
        textDecoration: 'underline'
      }
    }
  }));

export default useStyles;