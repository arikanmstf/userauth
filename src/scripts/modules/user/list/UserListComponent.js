import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class UserListComponent extends Component {

    componentDidMount () {
        this.props.getAllUsers();
    }
    removeUser (username) {
        this.props.openConfirmModal({
            message: 'Are you sure you want to remove this user ?',
            onConfirm: () => {
                this.props.removeUser(username);
            }
        });
    }
    renderUserList () {
        const userlist = this.props.userList;
        return userlist.map((user) => {
            return (
            <tr key={user.email}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.isvalid ?
                  <span className="alert alert-success">Valid</span> :
                  <span className="alert alert-danger">Invalid</span>
                }
              </td>
              <td>
                <Link className="btn btn-info" to={`/user/detail/${user.username}`}>
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
          <div className="table-responsive">
            <table className="table table-hover user-list-table">
              <thead>
                <tr>
                  <td>User Name</td>
                  <td>User Email</td>
                  <td>Is valid?</td>
                  <td>Options</td>
                </tr>
              </thead>
              <tbody>
                { this.renderUserList() }
              </tbody>
            </table>
          </div>
          <Link to={'/user/add'} className="btn btn-info">{'Add new user'}</Link>
        </div>
        );
    }
}
UserListComponent.propTypes = {
    getAllUsers: PropTypes.func.isRequired,
    userList: PropTypes.arrayOf(Object).isRequired
};

export default UserListComponent;
