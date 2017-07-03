import { connect } from 'react-redux';
import LoginComponent from './LoginComponent';

const mapStateToProps = (state) => {
    return {
        someParam: state.someParam
    };
};

export default connect(mapStateToProps)(LoginComponent);
