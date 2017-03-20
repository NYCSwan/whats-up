import keyMirror from 'key-mirror';

const defaultActionTypes = keyMirror({
	setMainView: null,
	setModalView: null,
	closeModal: null
});

export {defaultActionTypes};