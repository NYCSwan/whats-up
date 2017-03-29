import keyMirror from 'key-mirror';

const defaultActionTypes = keyMirror({
	setMainView: null,
	processProfile: null,
	setModalKey: null,
	closeModal: null
});

export {defaultActionTypes};