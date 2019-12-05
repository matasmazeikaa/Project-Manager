import React from 'react';
import Login from './BeforeAuth/Login/Login'
import Register from './BeforeAuth/Register/Register'
import BeforeAuthRouter from './BeforeAuth/Router'
import Project from './AfterAuth/Project'
import Dashboard from './AfterAuth/Dashboard'

function App(props) {
  return (
    <div>
    <BeforeAuthRouter />
    {props.children}
     </div>
  );
}

export default App;
