import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RECORDS_PER_PAGE } from '../../../common/Config';

/* eslint-disable quotes */
export default class PaginationComponent extends Component {

    constructor (props) {
        super(props);
        this.state = props;
    }

    nextPage () {
        const totalPage = parseInt(this.props.total / RECORDS_PER_PAGE, 10) + 1;
        const pageNo = parseInt(this.props.pageNo, 10);

        if (totalPage !== pageNo) {
            return (<Link to={`/${this.props.linkTo}/${pageNo + 1}`} onClick={this.props.onLiClick}>{`>`}</Link>);
        }
        return null;
    }
    lastPage () {
        const totalPage = parseInt(this.props.total / RECORDS_PER_PAGE, 10) + 1;
        const pageNo = parseInt(this.props.pageNo, 10);

        if (totalPage !== pageNo) {
            return (<Link to={`/${this.props.linkTo}/${totalPage}`} onClick={this.props.onLiClick}>{`>>`}</Link>);
        }
        return null;
    }
    prevPage () {
        const pageNo = parseInt(this.props.pageNo, 10);
        if (pageNo > 1) {
            return (<Link to={`/${this.props.linkTo}/${pageNo - 1}`} onClick={this.props.onLiClick}>{`<`}</Link>);
        }
        return null;
    }
    firstPage () {
        const pageNo = parseInt(this.props.pageNo, 10);
        if (pageNo > 1) {
            return (<Link to={`/${this.props.linkTo}/1`} onClick={this.props.onLiClick}>{`<<`}</Link>);
        }
        return null;
    }
    renderLi (index) {
        const pageNo = parseInt(this.props.pageNo, 10);
        const i = index + 1;
        let className;
        if (i === pageNo) className = 'active';
        return (<Link to={`/${this.props.linkTo}/${i}`} className={className} key={i} onClick={this.props.onLiClick}>{i}</Link>);
    }
    render () {
        const totalPage = parseInt(this.props.total / RECORDS_PER_PAGE, 10) + 1;
        const pageNo = parseInt(this.props.pageNo, 10);
        const result = [];
        if (totalPage > 10) {
            for (let i = pageNo - 3; (i >= pageNo - 3) && (i < pageNo + 2); i += 1) {
                if (i > -1 && i < totalPage) result.push(this.renderLi(i));
            }
        }
        else {
            for (let i = 0; i < totalPage; i += 1) {
                result.push(this.renderLi(i));
            }
        }
        return (
          <ul className='pagination-list'>
            <div className='pagination-list-container'>
              {this.firstPage()}
              {this.prevPage()}
              {result}
              {this.nextPage()}
              {this.lastPage()}
            </div>
          </ul>
        );
    }
}
/* eslint-enable quotes */

PaginationComponent.propTypes = {
    total: PropTypes.number,
    onLiClick: PropTypes.func,
    linkTo: PropTypes.string
};

PaginationComponent.defaultProps = {
    pageNo: 0,
    total: 0,
    linkTo: ''
};
