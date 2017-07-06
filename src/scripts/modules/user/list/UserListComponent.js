import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserListComponent extends Component {

    constructor (props) {
        super(props);
        this.state = props.search;
    }
    componentDidMount () {
        this.props.getAllUsers(this.state);
    }
    renderUserList () {
        const userlist = this.props.userList;

        return userlist.map((user) => {
            return (
            <tr key={user}>
              <td>username</td>
              <td>usermail</td>
              <td>
                <Link to={`/user/detail/${user}`}>
                  <i className="glyphicon glyphicon-search" />
                </Link>
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

export default UserListComponent;
