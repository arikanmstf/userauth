import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserDetailComponent extends Component {
    componentDidMount () {
        const form = {
            username: this.props.match.params.userName
        };
        this.props.getAllLogins(form);
    }
    renderLoginList () {
        const loginlist = this.props.loginList;

        return loginlist.map((login) => {
            const loginTime = new Date(login.login_time).toUTCString();
            return (
            <tr key={login.login_token}>
              <td>{login.username}</td>
              <td>{loginTime}</td>
              <td>{login.login_token}</td>
              <td>{login.app_token}</td>
            </tr>
            );
        });
    }

    render () {
        return (
        <div className="user-detail-component">
          <h1>{this.props.match.params.userName }</h1>
          <div className="table-responsive">
            <table className="table table-hover user-detail-table">
              <thead>
                <tr>
                  <td>{'User Name'}</td>
                  <td>{'Login Time'}</td>
                  <td>{'Login Token'}</td>
                  <td>{'App Token'}</td>
                </tr>
              </thead>
              <tbody>
                { this.renderLoginList() }
              </tbody>
            </table>
          </div>
        </div>
        );
    }
}
UserDetailComponent.propTypes = {
    getAllLogins: PropTypes.func.isRequired,
    loginList: PropTypes.arrayOf(Object).isRequired
};

export default UserDetailComponent;
