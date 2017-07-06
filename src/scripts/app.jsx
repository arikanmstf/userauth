import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setOrGetToken, isLoggedIn } from './common/Helpers';
import LoginContainer from './modules/guest/login/LoginContainer';
import NotFoundComponent from './modules/notfound/NotFoundComponent';
import ModalContainer from './modules/common/modal/ModalContainer';
import UserListContainer from './modules/user/list/UserListContainer';

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
      <div className="main-container">
        <ModalContainer message="Hello" />
        { !this.state.contentLoaded ?
        <div>
          <div className="loadingBaseLayer" />
          <div className="loadingSpinnerContainer">
            <center><img src="/assets/img/loading.gif" width="35" height="35" /></center>
          </div>
        </div> : null }
        { userLoggedIn ?
          <div className="main-component">
            <Router>
              <Switch>
                <Route exact path="/" component={UserListContainer} />
                <Route path="*" component={NotFoundComponent} />
              </Switch>
            </Router>
          </div>
          :
          <div className="main-component">
            <Router>
              <Switch>
                <Route exact path="/" component={LoginContainer} />
                <Route path="*" component={NotFoundComponent} />
              </Switch>
            </Router>
          </div>
        }
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
