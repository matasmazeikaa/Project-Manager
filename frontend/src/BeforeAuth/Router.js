import React, {useState, useEffect} from "react";
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Login from './Login/Login'
import Register from './Register/Register'
import './Router.scss'

const BeforeAuthRouter = () => {
    const currentKey = window.location.toString().split('/')[1] || '/';
    const getPathDepth = (location) => {
        let pathArr = location.pathname.split("/");
        pathArr = pathArr.filter(n => n !== "");
        return pathArr.length;
    }
    const [locationUrl, setLocationUrl] = useState()
    useEffect(() => {
        console.log('dad')
    }, [])
    console.log(currentKey)
    return (
        <TransitionGroup>
        <CSSTransition
            key={currentKey}
            timeout={{ enter: 800, exit: 400 }}
            classNames="pageSlider"
            mountOnEnter={false}
            unmountOnExit={true}
        >
        <Router>
            <Switch>
                <Route exact path='/login'>
                    <Login />
                </Route>
                <Route exact path='/register'>
                    <Register />
                </Route>
            </Switch>
        </Router>
        </CSSTransition>
        </TransitionGroup>
    )
}

export default BeforeAuthRouter;