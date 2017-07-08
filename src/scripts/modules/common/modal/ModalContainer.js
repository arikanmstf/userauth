import { connect } from 'react-redux';
import ModalComponent from './ModalComponent';
import { openModal, closeModal, openConfirmModal } from './ModalActions';

const mapDispatchToProps = (dispatch) => {
    return {
        openModal: (text) => {
            dispatch(openModal(text));
        },
        confirmModal: (text) => {
            dispatch(openConfirmModal(text));
        },
        closeModal: () => {
            dispatch(closeModal());
        }
    };
};
const mapStateToProps = (state) => {
    return {
        message: state.modalMessage,
        onConfirm: state.onConfirm
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);
