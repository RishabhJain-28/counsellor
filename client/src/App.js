import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import LandingPage from './Pages/LandingPage';
import BlogPage from './Blog/BlogPage';

const App = () => {
  return (
    <Router>
      <Provider store = {store}>
        <Fragment>
          <Switch>
            <Route exact path = '/' component={LandingPage } />
            <Route exact path = '/login' component={Login} />
            <Route exact path = '/signup' component={Signup} />
            <Route exact path = '/blog' component={BlogPage} />
          </Switch>
        </Fragment>
      </Provider>
    </Router>
  )
}

export default App
// Color Theme:- https://coolors.co/1a535c-4ecdc4-f7fff7-ff6b6b-ffe66d
