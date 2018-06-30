import React, {Component} from 'react';
import {
  Router, 
  Route, 
  hashHistory, 
  IndexRedirect, 
  // browserHistory
} from 'react-router';
import NotFound from '../pages/NotFound';
import App from '../App';
import UnloginApp from '../UnloginApp';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import Recite from '../pages/Recite/Recite';
import WordsBook from '../pages/WordsBook/WordsBook';
import Review from '../pages/Review/Review';
import Test from '../pages/Test/Test';
import Setting from '../pages/Setting/Setting';

export default class CRouter extends Component {
  render() {

    return (
      <Router history={hashHistory}>
        <Route path={'/'}>
          {/* <Route path={'app'} component={App} onEnter={this.requireAuth}>  */}
          <IndexRedirect to="/userservice/login"/>
          <Route path={'app'} component={App}>
              <Route path={'recite'} component={Recite}/>
              <Route path={'wordsbook'} component={WordsBook}/>
              <Route path={'test'} component={Test}/>
              <Route path={'review'} component={Review}/>
              <Route path={'setting'} component={Setting}/> 
          </Route>
          <Route path={'userservice'} component={UnloginApp}>
            <Route path={'login'} component={Login}/>
            <Route path={'signup'} component={Signup}/>
          </Route>
          <Route path={'404'} component={NotFound}/>
        </Route>
      </Router>
    )
  }
}
