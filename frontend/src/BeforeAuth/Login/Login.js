import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import RouterLink from '@material-ui/core/Link';
import { Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import useStyles from './style';
import './Login.css'
import axios from 'axios';
import Container from '@material-ui/core/Container';
import {useHistory} from 'react-router-dom';

export default function SignIn() {
    const classes = useStyles();
    let history = useHistory();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const login = (e) => {
        e.preventDefault();
        try {
            axios.post('http://localhost:3000/api/user/login', {
                email: email,
                password: password
            })
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        localStorage.setItem('auth-token', response.data)
                        history.push('/projectManager')
                    }
                })
                .then(() => {
                    console.log(sessionStorage.getItem('auth-token'))
                })
                .catch((err) => {
                    console.log(err)
                })
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div className="login"> 
        <div className="login-content">
        <Container component="main" maxWidth="xs" className="login-box">
           
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={e => setEmail(e.target.value)}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={e => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={(e) => login(e)}
                    >
                        Sign In
                    </Button>
                    <Grid container style={{marginBottom: 20}}>
                        <Grid item>
                            <Link className='link' to='/register'>Don't have an account? Sign Up</Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
        </div>
        </div>
    );
}
