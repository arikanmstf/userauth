export function resolvedOpenModal (message) {
    return {
        type: 'RESOLVED_OPEN_MODAL',
        data: message || 'Something went wrong'
    };
}
export function resolvedCloseModal () {
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
export function closeModal () {
    return (dispatch) => {
        dispatch(resolvedCloseModal());
    };
}
