import { connect } from 'react-redux';
import ModalComponent from './ModalComponent';
import { openModal, closeModal } from './ModalActions';

const mapDispatchToProps = (dispatch) => {
    return {
        openModal: (text) => {
            dispatch(openModal(text));
        },
        closeModal: () => {
            dispatch(closeModal());
        }
    };
};
const mapStateToProps = (state) => {
    return {
        message: state.modalMessage
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);
