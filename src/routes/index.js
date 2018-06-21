import React, {Component} from 'react';
import {
  Router, 
  Route, 
  hashHistory, 
  // IndexRedirect, 
  // browserHistory
} from 'react-router';
import NotFound from '../pages/NotFound';
import App from '../App';
import Recite from '../pages/Recite/Recite';

export default class CRouter extends Component {
  render() {

    return (
      <Router history={hashHistory}>
        <Route path={'/'}>
          <Route path={'app'} component={App} onEnter={this.requireAuth}>{/* <IndexRedirect to="/login"/>  */}
          {/* <Route path={'app'} component={App}> */}
              <Route path={'recite'} component={Recite}/>
              <Route path={'wordsbook'} component={NotFound}/>
              <Route path={'test'} component={NotFound}/>
              <Route path={'review'} component={NotFound}/>
          </Route>
          <Route path={'userservice'} component={NotFound}>
            <Route path={'login'} component={NotFound}/>
            <Route path={'signup'} component={NotFound}/>
          </Route>
          <Route path={'404'} component={NotFound}/>
        </Route>
      </Router>
    )
  }
}
