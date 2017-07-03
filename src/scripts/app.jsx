import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setOrGetToken } from './common/Helpers';
import LoginContainer from './modules/guest/login/LoginContainer';

const isLoggedIn = false;
const sessionToken = setOrGetToken();

class App extends Component {

    constructor (props) {
        super(props);
        this.state = props;
    }
    validateToken () {
      // TODO : Send sessionToken to backend to check if token is valid.
    }
    componentWillReceiveProps (nextProps) {
        this.setState(nextProps);
    }
    render () {
        return (
      <div className="main-container">
        { !this.state.contentLoaded ?
        <div>
          <div className="loadingBaseLayer" />
          <div className="loadingSpinnerContainer">
            <center><img src="/assets/img/loading.gif" width="35" height="35" /></center>
          </div>
        </div> : null }
        { isLoggedIn ?
          <div>
            <h1>Hello World !</h1>
          </div>
          :
          <div>
            <Router>
              <Switch>
                <Route exact path="/" component={LoginContainer} />
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
