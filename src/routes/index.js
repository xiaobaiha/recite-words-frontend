import React, {Component} from 'react';
import {
  Router, 
  Route, 
  hashHistory, 
  IndexRedirect, 
  // browserHistory
} from 'react-router';
import Loadable from 'react-loadable';
const AsyncNotFound = Loadable({
  loader: () => import('../pages/NotFound'),
  loading: () => null,
  modules: ['NotFound'],
});
const AsyncApp = Loadable({
  loader: () => import('../App'),
  loading: () => null,
  modules: ['App'],
});
const AsyncUnloginApp = Loadable({
  loader: () => import('../UnloginApp'),
  loading: () => null,
  modules: ['UnloginApp'],
});
const AsyncLogin = Loadable({
  loader: () => import('../pages/Login/Login'),
  loading: () => null,
  modules: ['Login'],
});
const AsyncSignup = Loadable({
  loader: () => import('../pages/Signup/Signup'),
  loading: () => null,
  modules: ['Signup'],
});
const AsyncRecite = Loadable({
  loader: () => import('../pages/Recite/Recite'),
  loading: () => null,
  modules: ['Recite'],
});
const AsyncWordsBook = Loadable({
  loader: () => import('../pages/WordsBook/WordsBook'),
  loading: () => null,
  modules: ['WordsBook'],
});const AsyncReview = Loadable({
  loader: () => import('../pages/Review/Review'),
  loading: () => null,
  modules: ['Review'],
});const AsyncTest = Loadable({
  loader: () => import('../pages/Test/Test'),
  loading: () => null,
  modules: ['Test'],
});const AsyncSetting = Loadable({
  loader: () => import('../pages/Setting/Setting'),
  loading: () => null,
  modules: ['Setting'],
});
// import NotFound from '../pages/NotFound';
// import App from '../App';
// import UnloginApp from '../UnloginApp';
// import Login from '../pages/Login/Login';
// import Signup from '../pages/Signup/Signup';
// import Recite from '../pages/Recite/Recite';
// import WordsBook from '../pages/WordsBook/WordsBook';
// import Review from '../pages/Review/Review';
// import Test from '../pages/Test/Test';
// import Setting from '../pages/Setting/Setting';

export default class CRouter extends Component {
  render() {

    return (
      <Router history={hashHistory}>
        <Route path={'/'}>
          {/* <Route path={'app'} component={App} onEnter={this.requireAuth}>  */}
          <IndexRedirect to="/app/recite"/>
          <Route path={'app'} component={AsyncApp}>
              <Route path={'recite'} component={AsyncRecite}/>
              <Route path={'wordsbook'} component={AsyncWordsBook}/>
              <Route path={'test'} component={AsyncTest}/>
              <Route path={'review'} component={AsyncReview}/>
              <Route path={'setting'} component={AsyncSetting}/> 
          </Route>
          <Route path={'userservice'} component={AsyncUnloginApp}>
            <Route path={'login'} component={AsyncLogin}/>
            <Route path={'signup'} component={AsyncSignup}/>
          </Route>
          <Route path={'404'} component={AsyncNotFound}/>
        </Route>
      </Router>
    )
  }
}
