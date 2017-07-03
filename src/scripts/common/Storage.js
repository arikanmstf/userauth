class Storage {
    static set (key, value) {
        window.sessionStorage.setItem(key, value); // eslint-disable-line no-undef
    }
    static get (key) {
        return window.sessionStorage.getItem(key); // eslint-disable-line no-undef
    }
    static delete (key) {
        window.sessionStorage.removeItem(key); // eslint-disable-line no-undef
    }
}
export default Storage;
