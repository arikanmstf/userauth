import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setOrGetToken, isLoggedIn, logOut } from './common/Helpers';

import NotFoundComponent from './modules/notfound/NotFoundComponent';

import LoginContainer from './modules/guest/login/LoginContainer';
import RegisterContainer from './modules/guest/register/RegisterContainer';
import ValidateContainer from './modules/guest/validate/ValidateContainer';

import ModalContainer from './modules/common/modal/ModalContainer';
import UserListContainer from './modules/user/list/UserListContainer';
import UserDetailContainer from './modules/user/detail/UserDetailContainer';

const sessionToken = setOrGetToken(); // eslint-disable-line no-unused-vars
const userLoggedIn = isLoggedIn(); // eslint-disable-line no-unused-vars

class App extends Component {

    constructor (props) {
        super(props);
        this.state = props;
    }
    componentWillReceiveProps (nextProps) {
        this.setState(nextProps);
    }
    render () {
        return (
          <div>
            <ModalContainer message="" />
            <div className="main-container">
              { !this.state.contentLoaded ?
              <div>
                <div className="loadingBaseLayer" />
                <div className="loadingSpinnerContainer">
                  <center><img src="/assets/img/loading.gif" width="35" height="35" /></center>
                </div>
              </div> : null }
              { userLoggedIn ?
                <div className="main-component">
                  <header>
                    <button onClick={logOut}>Logout</button>
                  </header>
                  <Router>
                    <Switch>
                      <Route exact path="/" component={UserListContainer} />
                      <Route exact path="/user/detail/:userName" component={UserDetailContainer} />
                      <Route exact path="/user/add/" component={RegisterContainer} />
                      <Route path="*" component={NotFoundComponent} />
                    </Switch>
                  </Router>
                </div>
                :
                <div className="main-component">
                  <Router>
                    <Switch>
                      <Route exact path="/" component={LoginContainer} />
                      <Route exact path="/guest/login" component={LoginContainer} />
                      <Route exact path="/guest/register" component={RegisterContainer} />
                      <Route exact path="/guest/validate/:validationToken" component={ValidateContainer} />
                      <Route path="*" component={NotFoundComponent} />
                    </Switch>
                  </Router>
                </div>
              }
            </div>
          </div>
        );
    }
}
App.propTypes = {
    contentLoaded: PropTypes.bool
};
App.defaultProps = {
    contentLoaded: true
};

const mapStateToProps = (state) => {
    return {
        contentLoaded: state.contentLoaded
    };
};

export default connect(mapStateToProps)(App);
