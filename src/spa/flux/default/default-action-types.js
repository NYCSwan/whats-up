import keyMirror from 'key-mirror';

const defaultActionTypes = keyMirror({
	setMainView: null,
	processProfile: null,
	setModalView: null,
	closeModal: null
});

export {defaultActionTypes};