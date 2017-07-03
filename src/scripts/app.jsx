import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Storage from './common/Storage';

const isLoggedIn = Storage.get('login_key');

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
            <h1>Please Login</h1>
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
