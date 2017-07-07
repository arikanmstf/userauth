import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class UserListComponent extends Component {

    constructor (props) {
        super(props);
        this.state = props.search;
    }
    componentDidMount () {
        this.props.getAllUsers();
    }
    removeUser (username) {
        this.props.removeUser(username);
    }
    renderUserList () {
        const userlist = this.props.userList;

        return userlist.map((user) => {
            return (
            <tr key={user.email}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <Link to={`/user/detail/${user.username}`}>
                  <i className="glyphicon glyphicon-search" />
                </Link>
                <button className="btn-danger" onClick={() => this.removeUser(user.username)}>
                  <i className="glyphicon glyphicon-remove" />
                </button>
              </td>
            </tr>
            );
        });
    }

    render () {
        return (
        <div className="user-list-component">
          <h1>User List:</h1>
          <table className="table table-hover table-responsive user-list-table">
            <thead>
              <tr>
                <td>User Name</td>
                <td>User Email</td>
                <td>Options</td>
              </tr>
            </thead>
            <tbody>
              { this.renderUserList() }
            </tbody>
          </table>
        </div>
        );
    }
}
UserListComponent.propTypes = {
    getAllUsers: PropTypes.func.isRequired,
    userList: PropTypes.arrayOf(Object).isRequired
};

export default UserListComponent;
