import React, {useState} from 'react';
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Linkk from '@material-ui/core/Link';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from './style'
import '../Login/Login.css'

export default function SignUp() {
  const classes = useStyles();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorName, setErrorName] = useState(null)
  const [errorEmail, setErrorEmail] = useState(null)
  const [errorPassword, setErrorPassword] = useState(null)

    const register = (e) => {
        e.preventDefault()
        if (name.length < 2 || !email.match(/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi) || password.length < 6) {
            if (name.length < 2) {
                setErrorName('Please enter a valid name')
            }
            if (!email.match(/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi)) {
                setErrorEmail('Please enter a valid email')
            }
            if (password.length < 6) {
                setErrorPassword('Please enter a password that is 6 characters long')
            }
            return
        }
        axios.post('http://localhost:3000/api/user/register', {
            name: name,
            email: email,
            password: password
        })
    }

  return (
    <div className="login"> 
    <div className="login-content">
    <Container component="main" maxWidth="xs" className="login-box">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={errorName ? true : false}
                helperText={errorName}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e) => {setName(e.target.value); setErrorName('')}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errorEmail ? true : false}
                helperText={errorEmail}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => {setEmail(e.target.value); setErrorEmail('')}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errorPassword ? true : false}
                helperText={errorPassword}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {setPassword(e.target.value); setErrorPassword('')}}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => register(e)}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item style={{marginBottom: 20}}>
              <Link className='link' to='/login'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    </div>
    </div>
  );
}