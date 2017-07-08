function resolvedOpenModal (message) {
    return {
        type: 'RESOLVED_OPEN_MODAL',
        data: message || 'Something went wrong'
    };
}
function resolvedOpenConfirmModal (onConfirm) {
    return {
        type: 'RESOLVED_OPEN_CONFIRM_MODAL',
        data: onConfirm
    };
}
function resolvedCloseModal () {
    return {
        type: 'RESOLVED_CLOSE_MODAL',
        data: ''
    };
}

export function openModal (message) {
    return (dispatch) => {
        dispatch(resolvedOpenModal(message));
    };
}
export function openConfirmModal (config) {
    return (dispatch) => {
        dispatch(resolvedOpenModal(config.message));
        dispatch(resolvedOpenConfirmModal(config.onConfirm));
    };
}
export function closeModal () {
    return (dispatch) => {
        dispatch(resolvedCloseModal());
    };
}
