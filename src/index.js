import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Login from './pages/Login'

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" component={Login}></Route>
        </Switch>
    </Router>

, document.getElementById("root"))