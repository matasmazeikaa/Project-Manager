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
import Project from '../AfterAuth/Project'
import Dashboard from '../AfterAuth/Dashboard'
import ProjectList from '../AfterAuth/ProjectList'

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
            <Switch>
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route path='/projectManager' component={Dashboard} />
            </Switch>
    )
}

export default BeforeAuthRouter;